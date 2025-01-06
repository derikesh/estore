'use client'

import React, { useEffect, useState } from 'react';
import { useReadCategoriesQuery } from '@/src/store/rtkQuery';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from 'next/link';
import { useDeleteCategoryMutation } from '@/src/store/rtkQuery';
import ModalBox from '../../DeletePopOver/ModalBox';
import { toast } from 'react-toastify';
import BasicTable from '../../ReactTable/ReactTable';

interface Single_Category {
    id: string;
    name: string;
    slug: string,
    description?: string
}

interface PRODUCT_INTERFACE {
    message: string,
    data: Single_Category[]
}

export default function ReadCategory() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState<any | null>(null);


    const { data: categoryData, isLoading, isSuccess, isError, error, refetch } = useReadCategoriesQuery({});

    const [deleteCategory, { isSuccess: deleteSucess, isError: deleteIsError, error: deleteError }] = useDeleteCategoryMutation();

    useEffect( ()=>{

        if(deleteSucess){
            toast.success('sucessfull deleted category');
        }else if(deleteIsError){
            toast.error(`error:${deleteError}`)
        }

    } ,[ deleteSucess,deleteError ]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {JSON.stringify(error)}</div>;
    }

    const openModel = (deleteID: string) => {
        setIsModalOpen(true);
    }

    const handleDelete = async () => {
        await deleteCategory(deleteItem?._id)
        setIsModalOpen(false);
        refetch();

    };

    const data = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 },
      ];
    
      const columns = [
        { header: 'ID', field: 'id' },
        { header: 'Name', field: 'name' },
        { header: 'Age', field: 'age' },
      ];
    return (
        <div>
            <ModalBox isOpen={isModalOpen} onClose={handleDelete} title={`Delete ${deleteItem?.name}`}>
                <p>total items: 12</p>
                <div className="mt-4">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        DELETE
                    </button>
                </div>
            </ModalBox>

            {categoryData ? (
                <div>

                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Category List</h2>
                    <ul>
                        {categoryData?.data?.map((category: any, index: number) => {

                            let deleteID = category?._id;

                            return (
                                <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm flex justify-between">
                                    <div className='single_category_content' >
                                        <h3 className="text-xl font-bold">{category?.name}</h3>
                                        <p>slug: {category?.slug}</p>
                                        <p>{category?.description}</p>
                                    </div>

                                    <div className='button_group flex gap-2' >
                                        <Link href={`/admin/dashboard/category/${category?._id}`} >
                                            <FaRegEdit />
                                        </Link>
                                        <MdDelete className='hover:cursor-pointer' onClick={() => {
                                            setDeleteItem(category)
                                            openModel(category)
                                        }} />
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
}