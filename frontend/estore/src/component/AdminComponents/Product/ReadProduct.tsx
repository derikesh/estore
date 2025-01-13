'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useReadallProductQuery, useReadCategoriesQuery } from '@/src/store/rtkQuery';
import { ColumnDef } from '@tanstack/react-table';
import BasicTable from '../../ReactTable/ReactTable';
import { useDeleteManyProductMutation } from '@/src/store/rtkQuery';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, UseDispatch } from 'react-redux';
import { getCategoryName } from '@/src/utils/CategoryName/CategoryName';
import { api } from '@/src/store/rtkQuery';
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

interface PRODUCT_PROPS {
    data: SINGLE_PRODUCT[],
    refetch: () => void,
    categoryData: CATEGORY_INTERFACE[]
}

// another one 
export default function ReadProduct({ data, refetch, categoryData }: PRODUCT_PROPS) {
    const router = useRouter();

    const dispatch = useDispatch<any>();
    const [deleteSelected, { isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorData }] = useDeleteManyProductMutation();

    useEffect(() => {
        if (deleteSuccess) {
            refetch();
        }
    }, [deleteSuccess, refetch]);


    const handleClick = useCallback((e: React.MouseEvent, id: any) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(api.util.prefetch('readSingleProduct', id, { force: true }));
    }, [dispatch]);

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
            accessorKey: "category.name",
            header: "Category",
            cell: (info) => info.getValue(), 
        },
        {
            id: "action",
            header: 'Action',
            cell: ({ row }) => {
                const postID = row?.original?._id
                return <div onClick={(e: any) => handleClick(e, postID)}><Link href={`/admin/dashboard/product/${row.original._id}`} className={`bg-gray-500 w-[50%] px-2 py-1 text-sm rounded-[20x] text-white ${row.getIsSelected() ? 'opacity-100' : 'opacity-0'}`}>Edit</Link></div>
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