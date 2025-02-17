'use client';

import React from 'react';
import DetailComponenet from '@/src/component/AdminComponents/DetailComponent/DetailComponenet';
import { useReadSingleProductQuery } from '@/src/store/rtkQuery';


export default function Page({params}:any) {

  const {id} = params;

const { data: singleProduct, isSuccess: readSuccess, isError: readError, error: readErrorData , refetch } = useReadSingleProductQuery(id, {
        skip: !id
    });

  return (
    <div>
        <DetailComponenet id={id} requireData={singleProduct?.data} refetch={refetch} />
    </div>
  );
}