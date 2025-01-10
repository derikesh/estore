'use client';

import React from 'react';
import FormProduct from '@/src/component/AdminComponents/Product/PostPorduct';
import { useReadCategoriesQuery, useReadSingleProductQuery } from '@/src/store/rtkQuery';
import { useParams } from 'next/navigation';

export default function Page() {

  const {id} = useParams();

  const { data: categories} = useReadCategoriesQuery({});
  const { data: singleProduct, isSuccess: readSuccess, isError: readError, error: readErrorData } = useReadSingleProductQuery(id, {
        skip: !id
    });

  return (
    <div>
        <FormProduct type={id ? 'edit' : 'add'} singleProduct={singleProduct?.data} categories={categories?.data}/>
    </div>
  );
}