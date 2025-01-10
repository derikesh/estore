import React, { useCallback, useMemo } from 'react';
import { useDeleteCategoryMutation } from '@/src/store/rtkQuery';
import { ColumnDef } from '@tanstack/react-table';
import { CATEGORY_INTERFACE } from './PostCategory';
import BasicTable from '../../ReactTable/ReactTable';
import Link from 'next/link';

interface ReadCategoryInterface {
    categoryData?: any,
    refetch: () => void
}

export default function ReadCategory({ categoryData, refetch }: ReadCategoryInterface) {


    const [deleteCategory, { isSuccess: deleteSucess, isError: deleteIsError, error: deleteError }] = useDeleteCategoryMutation();

    const columns: ColumnDef<CATEGORY_INTERFACE>[] = useMemo(() => [
        {
            id: 'actions',
            header: ({ table }) => {
                return <input
                    type='checkbox'
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()} />
            },
            cell: ({ row }) => (
                <input
                    type='checkbox'
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            )
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue()
        },
         {
            accessorKey: "slug",
            header: "Slug",
            cell: (info) => `${info.getValue()}`,
        },
        {
            accessorKey: "parent",
            header: "Category",
            cell: (info) => info.getValue(), // Map category ID to name
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
    ], [categoryData])

    return (
        <div>
            {categoryData ? (
                <div className='product_table_wrap'>
                    <BasicTable
                        columns={columns}
                        data={categoryData || []}
                        deleteSelected={deleteCategory}
                        isSuccess={deleteSucess}
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