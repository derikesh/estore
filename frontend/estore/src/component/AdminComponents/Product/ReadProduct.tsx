import React, { useEffect, useState } from 'react';
import { useReadallProductQuery } from '@/src/store/rtkQuery';
import { ColumnDef } from '@tanstack/react-table';
import BasicTable from '../../ReactTable/ReactTable';


interface ImageInterFace {
    imageUrl:string,
    publicKey:string
}

export interface SINGLE_PRODUCT {
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

    const { data: productData, isLoading, isSuccess, isError, error } = useReadallProductQuery({});

    const [data, setData] = useState<SINGLE_PRODUCT[] | null>(null);
    
    useEffect( ()=>{
        if(isSuccess){
            setData(productData.data);
        }
    } ,[productData]);

    console.log( "product received",data );

    const columns:ColumnDef<SINGLE_PRODUCT>[] = [ 
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
              return row.getIsSelected() ? <button onClick={ (e)=>e.stopPropagation() } className='bg-red-500 w-[50%]' >just selected</button> : ''
            },
            maxSize: 100,
            minSize: 50
        },
     ]

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {JSON.stringify(error)}</div>;
    }

 

    return (
        <div>
            {data ? (
                <div className='product_table_wrap' >
                    <BasicTable
                    columns={columns}
                    data={data || []}
                    />
                </div>
            ) : (
                <div>No products found.</div>
            )}

        </div>
    );
}