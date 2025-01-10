'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { useReadallProductQuery, useReadCategoriesQuery } from '@/src/store/rtkQuery';
import { ColumnDef } from '@tanstack/react-table';
import BasicTable from '../../ReactTable/ReactTable';
import { useDeleteManyProductMutation } from '@/src/store/rtkQuery';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { getCategoryName } from '@/src/utils/CategoryName/CategoryName'; 

interface ImageInterFace {
    imageUrl: string,
    publicKey: string
}

export interface SINGLE_PRODUCT {
    _id?: number,
    name: string;
    price: number;
    category: string; // Store category as ID
    description?: string;
    images?: ImageInterFace;
    sizes?: string[];
    color?: string[];
}


interface CATEGORY_INTERFACE {
    _id: string;
    name: string;
}

interface PRODUCT_PROPS{
    data:SINGLE_PRODUCT[],
    refetch:()=>void,
    categoryData:CATEGORY_INTERFACE[]
}
    
// another one 
export default function ReadProduct({data, refetch,categoryData}:PRODUCT_PROPS) {
    const router = useRouter();
    const [deleteSelected, { isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorData }] = useDeleteManyProductMutation();

    console.log("this is cateogy data",categoryData);

    useEffect(() => {
        if (deleteSuccess) {
            refetch();
        }
    }, [deleteSuccess, refetch]);

    //  const getCategoryName = (categoryId: string) => {
    //     const category = categories?.find(cat => cat._id === categoryId);
    //     return category ? category.name : 'Unknown';
    // };

    const columns: ColumnDef<SINGLE_PRODUCT>[] = useMemo(() => [
        {
            id: "select",
            header: ({ table }) => (
                <input
                    type='checkbox'
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <input
                    type='checkbox'
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            )
        },
        {
            accessorKey: 'images.imageUrl',
            header: 'Image',
            cell: (info) => <img src={info.getValue() as string} alt="Product" style={{ width: '50px', height: '50px' }} />,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: (info) => `$${info.getValue()}`,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: (info) => getCategoryName(info.getValue() as string, categoryData), // Map category ID to name
        },
        {
            id: "action",
            header: 'Action',
            cell: ({ row }) => {
                return <div onClick={(e: any) => e.stopPropagation()}><Link href={`/admin/dashboard/product/${row.original._id}`} className={`bg-gray-500 w-[50%] px-2 py-1 text-sm rounded-[20x] text-white ${row.getIsSelected() ? 'opacity-100' : 'opacity-0'}`}>Edit</Link></div>
            },
            maxSize: 100,
            minSize: 50
        },
    ], [data]);


    return (
        <div>
            {data ? (
                <div className='product_table_wrap'>
                    <BasicTable
                        columns={columns}
                        data={data || []}
                        deleteSelected={deleteSelected}
                        isSuccess={deleteSuccess}
                        error={deleteError}
                        isError={deleteError}
                        refetch={refetch}
                    />
                </div>
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
}