import React, { useEffect, useState } from 'react';
import { useReadallProductQuery } from '@/src/store/rtkQuery';


interface SINGLE_PRODUCT {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    size: string;
    color: string;
}

interface PRODUCT_INTERFACE {
    message:string,
    data:SINGLE_PRODUCT[]
}

export default function ReadProductContainer() {
    const { data: productData, isLoading, isSuccess, isError, error } = useReadallProductQuery({});
    const [data, setData] = useState<PRODUCT_INTERFACE>();

    // Update state when productData changes
    useEffect(() => {
        if (isSuccess && productData) {
            setData(productData);
        }
    }, [isSuccess, productData]);

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
                        {data?.data?.map((product: any) => (
                            <li key={product.id} className="mb-4 p-4 border rounded-lg shadow-sm">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                                <p>Price: {product.price}</p>
                                <p>Category: {product.category}</p>
                                <p>Description: {product.description}</p>
                                <p>Size: {product.size}</p>
                                <p>Color: {product.color}</p>
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