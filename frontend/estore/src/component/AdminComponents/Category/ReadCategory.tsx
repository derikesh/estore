import React, { useCallback, useMemo } from 'react';
import { useDeleteCategoryMutation } from '@/src/store/rtkQuery';
import { ColumnDef } from '@tanstack/react-table';
import BasicTable from '../../ReactTable/ReactTable';
import Link from 'next/link';
import { useDispatch, UseDispatch } from 'react-redux';
import { api } from '@/src/store/rtkQuery';
import { CATEGORY_INTERFACE, getCategoryName } from '@/src/utils/CategoryName/CategoryName';

interface ReadCategoryInterface {
    categoryData?: any,
    refetch: () => void
}

export default function ReadCategory({ categoryData, refetch }: ReadCategoryInterface) {

    const dispatch = useDispatch<any>();

    const handleClick = useCallback((e: React.MouseEvent, id: string) => {
        e.preventDefault(); 
        e.stopPropagation();
        dispatch(api.util.prefetch('readSingleCategories', id, { force: true }));
    }, [dispatch]);

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
            accessorKey: 'image.imageUrl',
            header: 'Category Image',
            cell: (info) => <img src={info.getValue() as string} alt="Product" style={{ width: '50px', height: '50px' }} />
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
            header: "Parent Category",
           cell: (info) => getCategoryName(info.getValue() as string, categoryData), // Map category ID to name
        },

        {
            id: "action",
            header: 'Action',
            cell: ({ row }) => {
                const cat_id = row.original._id
                return <div onClick={(e: any) => handleClick(e,cat_id)}><Link href={`/admin/dashboard/category/${row.original._id}`} className={`bg-gray-500 w-[50%] px-2 py-1 text-sm rounded-[20x] text-white ${row.getIsSelected() ? 'opacity-100' : 'opacity-0'}`}>Edit</Link></div>
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