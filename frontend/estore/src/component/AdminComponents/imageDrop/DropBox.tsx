'use client'

import React, { useEffect, useState, memo } from 'react';
import Dropzone, { Accept } from 'react-dropzone';
import { useUploadImageMutation, useDeleteIMageMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';

interface DropBoxInterface {
    setFieldValue: (field: string, value: any) => void,
    name: string;
    values: any,
    type: string
}

const DropBox = memo(({ setFieldValue = () => { }, name, values, type }: DropBoxInterface) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadImage, { isSuccess, error, isError, data, isLoading }] = useUploadImageMutation();
    const [deleteImage, { isSuccess: deleteSuccess, error: deleteError, isError: isDeleteError, isLoading: loadingDelete }] = useDeleteIMageMutation();

    const handleDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
         const formUpload =await new FormData();
        await formUpload.append("file", file);
        uploadImage(formUpload);
        setPreview(URL.createObjectURL(file));
    };


    useEffect( ()=>{
        if(type ==='edit'){
            setPreview(values[name].imageUrl);
        }
    } ,[type])
    

    const handleDelete = () => {
        setPreview(null);
        deleteImage(data); // Pass only publicKey to delete
      };

    useEffect(() => {
       
        if (isDeleteError) {
            toast.error(`Error: ${JSON.stringify(deleteError)}`);
            console.log("Error:", deleteError);
            setPreview(data);
        }

        if (isSuccess && data) {
            setFieldValue(name, data);
        }
        console.log("from the upload",data);
    }, [deleteSuccess, isDeleteError, isSuccess, data]);

    useEffect(() => {
        if (isError) {
            toast.error(`Error: ${JSON.stringify(error)}`);
            console.log("Error:", error);
            setPreview(null);
        }
    }, [isSuccess, isError]);

    

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
                {preview && (
                    <div className="mt-4 relative">
                        {isLoading && <h1>Uploading image...</h1>}
                        {isSuccess || preview && <button className='bg-red-200 absolute top-0 right-0 hover:cursor-pointer' onClick={handleDelete}>x</button>}
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ width: "200px", height: "auto" }}
                        />
                    </div>
                )}
            </div>
        </>
    );
});

export default DropBox;