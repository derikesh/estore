'use client'

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import ReadProduct from '@/src/component/AdminComponents/Product/ReadProduct';
import { useReadallProductQuery, useReadCategoriesQuery } from '@/src/store/rtkQuery';

export interface IMAGE_INTERFACE {
  imageUrl:string,
  publicKey:string
}

export interface FEATURES_INTERFACE {
  _id:string,
  name:string,
  x:number,
  y:number
}

export interface PRODUCT_INTERFACE {
  _id?:string,
  name:string,
  price?:number,
  category?:string,
  description?:string,
  images:IMAGE_INTERFACE,
  productImages?:IMAGE_INTERFACE[],
  sizes?:String[],
  color?:String[],
  features?:FEATURES_INTERFACE[]
}

export default function Page() {
  const { data: productData, isLoading, isSuccess: productSuccess, isError: productIsError, error: productError, refetch } = useReadallProductQuery({});
  // const { data: categoryData, isSuccess: categorySuccess,isError,error:catError } = useReadCategoriesQuery({});
  

  useEffect(() => {
    if (productIsError) {
      toast.error(`Error fetching products: ${productError}`);
    }
  }, [ productIsError, productError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     { productData  && ( 
       <ReadProduct data={productData?.data}  refetch={refetch} />
     ) }
    </div>
  );
}