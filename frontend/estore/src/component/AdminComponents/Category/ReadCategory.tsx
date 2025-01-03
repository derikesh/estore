'use client'

import React, { useEffect, useState } from 'react';
import { useReadCategoriesQuery  } from '@/src/store/rtkQuery';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
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

export default function ReadCategory( ) {

    const { data: categoryData, isLoading, isSuccess, isError, error , refetch} = useReadCategoriesQuery({});

    const [data, setData] = useState<PRODUCT_INTERFACE>();


    

    // Update state when categoryData changes
    useEffect(() => {
        if (isSuccess && categoryData) {
            setData(categoryData);
        }
    }, [categoryData]);

    useEffect( ()=>{
        refetch();
    } ,[])

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
                   
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Category List</h2>
                    <ul>
                        {data?.data?.map((category: any,index) => (
                            <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm flex justify-between">
                               <div className='single_category_content' >
                               <h3 className="text-xl font-bold">{category?.name}</h3>
                                <p>slug: {category?.slug}</p>
                                <p>{category?.description}</p>
                               </div>

                                <div className='button_group flex gap-2' >
                                <Link href={`/admin/dashboard/category/${category?._id}`} >
                                <FaRegEdit/>
                                </Link>
                                <MdDelete/>
                                </div>

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