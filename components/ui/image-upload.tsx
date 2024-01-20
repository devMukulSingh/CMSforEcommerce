"use client"

import { ImagePlus } from "lucide-react";
import { Button } from "./button";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import Image from "next/image";

interface IimageUploadProps{
    disabled:boolean;
    onChange : (value: string) => void;
    onRemove : (value: string) => void;
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
        onChange(result.info.secure_url);
    }

    if(!isMounted) return null;
    console.log(value);
    


return(
    <>
        <main>
            <section>
                {
                    value.map( (url ) => (
                        <figure className="w-[200px] h-[200px] relative overflow-hidden ">
                            <Image src={url}
                                alt="uploadedImage"
                                fill
                                className="object-contain"
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
                            disabled={disabled}
                            type="button"
                            variant="secondary"
                            onClick={onClick}
                            className="flex gap-3"
                        >
                            <ImagePlus />
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