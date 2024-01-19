"use client"

import { ImagePlus } from "lucide-react";
import { Button } from "./button";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import Image from "next/image";

interface IimageUploadProps{
    disabled:boolean;
    onChange : () => void;
    onRemove : () => void;
    value : string[]
}

const ImageUpload:React.FC<IimageUploadProps> = ({
    disabled,
    onChange, 
    onRemove,
    value ,
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect ( () => {
        setIsMounted(true);
    },[]);
    
    const onUpload = ( result:any) => {
        console.log(result.info.secure_url);
    }

    if(!isMounted) return null;


return(
    <>
        <main>
            <section>
                {
                    value?.map( (url ) => (
                        <figure className="w-[200px] h-[200px]">
                            <Image src={url}
                                alt="uploadedImage"
                                fill
                            />
                        </figure>
                    ))
                }
            </section>

            <CldUploadWidget onUpload={onUpload} uploadPreset="uymoffmb">
                {({ open}) => {
                    const onClick = () => {
                        open();
                    }
                    return(
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClick}
                            className="flex gap-3"
                        >
                            <ImagePlus/>
                            Upload an image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </main>

    </>
    )
}
export default ImageUpload