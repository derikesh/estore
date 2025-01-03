import React, { useEffect, useState } from 'react';
import { useReadCategoriesQuery } from '@/src/store/rtkQuery';

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

export default function ReadCategory() {
    const { data: categoryData, isLoading, isSuccess, isError, error } = useReadCategoriesQuery({});
    const [data, setData] = useState<PRODUCT_INTERFACE>();

    // Update state when categoryData changes
    useEffect(() => {
        if (isSuccess && categoryData) {
            setData(categoryData);
        }
    }, [categoryData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {JSON.stringify(error)}</div>;
    }

    console.log("all products",data);

    return (
        <div>
            {data ? (
                <div>
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Product List</h2>
                    <ul>
                        {data?.data?.map((product: any,index) => (
                            <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p>Price: {product.slug}</p>
                                <p>Category: {product.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
}