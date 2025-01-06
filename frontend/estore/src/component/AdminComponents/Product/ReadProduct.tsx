import React, { useEffect, useMemo, useState } from 'react';
import { useReadallProductQuery } from '@/src/store/rtkQuery';
import { ColumnDef } from '@tanstack/react-table';
import BasicTable from '../../ReactTable/ReactTable';

import { useDeleteManyProductMutation } from '@/src/store/rtkQuery';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ImageInterFace {
    imageUrl:string,
    publicKey:string
}

export interface SINGLE_PRODUCT {
    _id?:number,
    name: string;
    price: number;
    category: string;
    description?: string;
    images?: ImageInterFace;
    sizes?:string[];
    color?:string[];
}

interface PRODUCT_INTERFACE {
    message: string,
    data: SINGLE_PRODUCT[]
}

export default function ReadProduct() {

    const { data: productData, isLoading, isSuccess:productSuccess, isError:productIsError, error:productError , refetch } = useReadallProductQuery({});

    const [data, setData] = useState<SINGLE_PRODUCT[] | null>(null);


    const router = useRouter();
    
    const [deleteSelected,{isSuccess,isError,error}] = useDeleteManyProductMutation();

    useEffect( ()=>{
        if(productSuccess){
            setData(productData.data);
        }
    } ,[productData]);


    useEffect( ()=>{
        refetch();
    } ,[]);

    const handleEditDirection = (e:any,id:any)=>{

        e.stopPropagation();
        router.push(`/admin/dashboard/product/${id}`)
    }


    const columns:ColumnDef<SINGLE_PRODUCT>[] = useMemo( ()=>[ 
        {
            id:"select",
            header: ( {table} )=>(
                <input
                type='checkbox'
                checked={ table.getIsAllRowsSelected() }
                onChange={ table.getToggleAllRowsSelectedHandler() }
                />
            ),
            cell:({row})=>(
                <input
                type='checkbox'
                checked={ row.getIsSelected() }
                onChange={ row.getToggleSelectedHandler() }
                />
            )
        } , 

        {
            accessorKey:'images.imageUrl',
            header:'Image',
            cell:(info)=><img src={info.getValue() as string } alt="Product" style={{ width: '50px', height: '50px' }} />,
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
            cell: (info) => info.getValue(),
        },
        {
            id: "action",
            header:'Action',
            cell: ({row}) => {
              return <Link href={`/admin/dashboard/product/${row.original._id}`} className={`bg-gray-500 w-[50%] px-2 py-1 text-sm rounded-[20x] text-white ${row.getIsSelected() ? 'opacity-100' : 'opacity-0'}`} >Edit</Link>
            },
            maxSize: 100,
            minSize: 50
        },
     ],[data] )

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (productIsError) {
        return <div>Error: {JSON.stringify(productError)}</div>;
    }

    return (
        <div>
            {data ? (
                <div className='product_table_wrap' >
                    <BasicTable
                    columns={columns}
                    data={data || []}
                    deleteSelected={deleteSelected}
                    isSuccess={isSuccess}
                    error={error}
                    isError={isError}
                    refetch={refetch}
                    />
                </div>
            ) : (
                <div>No products found.</div>
            )}

        </div>
    );
}