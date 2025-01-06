'use client'

import React, { useEffect, useState , memo} from 'react';
import Dropzone, { Accept } from 'react-dropzone';

import { useUploadImageMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';

import { useDeleteIMageMutation } from '@/src/store/rtkQuery';

interface DropBoxInterface {
    setFieldValue: (field: string, value: any) => void,
    name: string;
    values:any,
    type:string
}

interface ImageObject {
    imageUrl:string,
    publicKey:any
}

const DropBox = memo(({ setFieldValue = () => { }, name ,values,type}: DropBoxInterface) => {

    const [preview, setPreview] = useState<any | null>(null);
    const [uploadImage , {isSuccess,error,isError,data,isLoading}] = useUploadImageMutation();
    const [deleteImage,{ isSuccess:deleteSuccess,error:deleteERror,isError:isDeleteError,isLoading:loadingDelete }] = useDeleteIMageMutation();

    const handleDrop = (acceptedFiles: File[]) => {

        const file = acceptedFiles[0];
        const formUpload = new FormData();
        formUpload.append( "file",file );
        uploadImage(formUpload);
        setPreview(URL.createObjectURL(file));
       
    };

    const isEdit = type === 'edit';

    console.log("insdie the componet",isEdit);

    const handleDelete = () => {
        setPreview(null);
        deleteImage(data?.publicKey || values[name].publicKey); // Pass only publicKey to delete
        if (deleteSuccess) {
            toast.info("Image deleted", { autoClose: 1000 });
        }
    };

    useEffect( ()=>{
        
        if(isDeleteError){
            toast.error(`error : ${JSON.stringify(deleteERror)}`);
            console.log("error :",deleteERror);
            setPreview(data);
        } 

        if(isSuccess && data){
                console.log("Before setFieldValue:", values[name]);
                setFieldValue(name, data);
                console.log("After setFieldValue:", values[name]);
        }

    } ,[deleteSuccess,isDeleteError, isSuccess,data]);

    useEffect( ()=>{
    if(isError){
            toast.error(`error : ${JSON.stringify(error)}`);
            console.log("Error :",error);
            setPreview(null);
        }

    } ,[isSuccess,isError]);


    if(data){
        console.log("poster from drop box",data);
    }

    return (
        <>
            <div className="mb-4">
                <Dropzone
                    onDrop={(file) => handleDrop(file)}
                    accept={{ 'image/*': [] } as Accept}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            {...getRootProps()}
                            style={{
                                border: "2px dashed #ccc",
                                padding: "20px",
                                cursor: "pointer",
                            }}
                        >
                            <input name={name} {...getInputProps()} />
                            <p>Drag & drop an image here, or click to select one</p>
                        </div>
                    )}
                </Dropzone>
                { preview || values[name].imageUrl && (
                    <div className="mt-4 relative">
                        { isLoading && <h1>uploading image...</h1> }
                        {  isSuccess || values[name].imageUrl && <button className='bg-red-200 absolute top-0 right-0 hover:cursor-pointer' onClick={handleDelete} >x</button> }
                        {/* { isLoading && ( <p>uploading file to server...</p> ) } */}
                        <img
                            src={isEdit ? values[name].imageUrl : preview }
                            alt="Preview"
                            style={{ width: "200px", height: "auto" }}
                        />
                    </div>
                )}
            </div>

        </>




    );
}
)
export default DropBox;