'use client'

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import ReadCategory from '@/src/component/AdminComponents/Category/ReadCategory';
import { useReadCategoriesQuery } from '@/src/store/rtkQuery';

export  interface CATEGORY_INTERFACE {
  _id:string,
  name:string,
  slug:string,
  image:{
    imageUrl:string,
    publicKey:string
  },
  parent:string,
  description?:string
}

export default function Page() {
  const { data: categoryData, isLoading, isSuccess, isError, error, refetch } = useReadCategoriesQuery({});

  useEffect(() => {
    if (isError) {
      toast.error(`Error fetching categories: ${JSON.stringify(error)}`);
    }
  }, [isError, error]);

  if(isLoading){
    return <p>Loading.....</p>
  }

  console.log("category data",categoryData)

  return (
    <div>
      <ReadCategory categoryData={categoryData?.data} refetch={refetch} />
    </div>
  );
}