import React, { useEffect, useState } from 'react';
import { useReadallProductQuery } from '@/src/store/rtkQuery';

interface SINGLE_PRODUCT {
    id: string;
    name: string;
   slug:string,
   description?:string
}

interface PRODUCT_INTERFACE {
    message:string,
    data:SINGLE_PRODUCT[]
}

export default function ReadProduct() {
    
    const { data: productData, isLoading, isSuccess, isError, error } = useReadallProductQuery({});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {JSON.stringify(error)}</div>;
    }
 
    return (
        <div>
            {productData ? (
                <div>
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Product List</h2>
                    <ul>
                        {productData?.data?.map((product: any,index:number) => (
                            <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p>Price: {product.prices}</p>
                                <p>Category: {product.category}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No products found.</div>
            )}

            this was fast maybe api is the problem
        </div>
    );
}