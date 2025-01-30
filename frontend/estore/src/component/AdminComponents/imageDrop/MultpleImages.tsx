'use client'

import React, { useEffect, useState, memo } from 'react';
import Dropzone, { Accept } from 'react-dropzone';
import { useUploadMultipleMutation, useDeleteIMageMutation } from '@/src/store/rtkQuery';
import { toast } from 'react-toastify';

interface DropBoxInterface {
    setFieldValue: (field: string, value: any) => void,
    name: string;
    values: any,
    type: string
}

const DropBox = memo(({ setFieldValue = () => { }, name, values, type }: DropBoxInterface) => {
    
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploadImages, { isSuccess, error, isError, data, isLoading }] = useUploadMultipleMutation();
    const [deleteImage, { isSuccess: deleteSuccess, error: deleteError, isError: isDeleteError, isLoading: loadingDelete }] = useDeleteIMageMutation();

    const handleDrop = async (acceptedFiles: File[]) => {
        const formUpload = new FormData();
        acceptedFiles.forEach(file => formUpload.append('files', file));
        uploadImages(formUpload);
        setPreviews(prev => [...prev, ...acceptedFiles.map(file => URL.createObjectURL(file))]);
    };

    useEffect(() => {
        if (type === 'edit' && values[name]) {
            const imageUrl = values[name].filter(Boolean).map((item: any) => item.imageUrl);
            setPreviews(imageUrl);
        }
    }, [values, name, type]);

    const handleDelete = (indexGot: number) => {
        const newPreviews = previews.filter((_, index) => index !== indexGot);
        setPreviews(newPreviews);
        setFieldValue(name, values[name].filter((_: any, index: number) => index !== indexGot));
        if (type === 'edit') {
            deleteImage(values[name][indexGot]);
        } else {
            deleteImage(data?.images[indexGot]);
        }
    };

    useEffect(() => {
        if (isDeleteError) {
            toast.error(`Error: ${JSON.stringify(deleteError)}`);
            console.log("Error:", deleteError);
        }

        if (isSuccess && data) {
            setFieldValue(name, [...data.images, ...(values[name] || [])]);
            toast.success('successfully uploaded all images');
        }
        if (deleteSuccess) {
            toast.info('image deleted');
        }
    }, [deleteSuccess, isDeleteError, isSuccess, data, setFieldValue, name]);

    useEffect(() => {
        if (isError) {
            toast.error(`Error: ${JSON.stringify(error)}`);
            console.log("Error:", error);
        }
    }, [isError, error]);

    return (
        <div className="mb-4">
            <Dropzone onDrop={handleDrop} accept={{ 'image/*': [] } as Accept}>
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
                        <p>Drag & drop images here, or click to select</p>
                    </div>
                )}
            </Dropzone>
            <div className="mt-4 grid grid-cols-2 gap-4">
                {previews.map((preview: any, index) => (
                    <div key={index} className="relative">
                        {isLoading && <h1>Uploading image...</h1>}
                        <button
                            className='bg-red-200 absolute top-0 right-0 hover:cursor-pointer'
                            onClick={() => handleDelete(index)}
                        >
                            x
                        </button>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ width: "200px", height: "auto" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default DropBox;