import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

const PaytmChecksum = require('./PaytmChecksum');
const https = require("https");


export async function POST(
    req:Request,
    {params} : { params : { storeId : string}}
){

     const { storeId } = params;
/*
* import checksum generation utility
* You can get this utility from https://developer.paytm.com/docs/checksum/
*/
    const { totalPrice, cartItems } = await req.json();

    const order = await prisma.order.create({
        data : {
            isPaid:false,
            orderItems : {
                createMany : {
                    data : [ ...cartItems.map( (item : Product) => item)]
                }
            },
            storeId
        }
    });


    var paytmParams = {};

    paytmParams.body = {
        "requestType"   : "Payment",
        "mid"           : process.env.NEXT_PUBLIC_PAYTM_MID,
        "websiteName"   : "YOUR_WEBSITE_NAME",
        "orderId"       : order.id,
        "callbackUrl"   : "https://localhost:3001/api/postcheckout",
        "txnAmount"     : {
            "value"     : totalPrice,
            "currency"  : "INR",
        },
        "userInfo"      : {
            "custId"    : "custId",
        },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "YOUR_MERCHANT_KEY").then(function(checksum){

        paytmParams.head = {
            "signature"    : checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${order.id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };

        var response = "";
        var post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });

            post_res.on('end', function(){
                console.log('Response: ', response);
            });
        });

        post_req.write(post_data);
        post_req.end();
});
}