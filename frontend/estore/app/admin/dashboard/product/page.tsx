'use client'

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import ReadProduct from '@/src/component/AdminComponents/Product/ReadProduct';
import { useReadallProductQuery, useReadCategoriesQuery } from '@/src/store/rtkQuery';

export default function Page() {
  const { data: productData, isLoading, isSuccess: productSuccess, isError: productIsError, error: productError, refetch } = useReadallProductQuery({});
  const { data: categoryData, isSuccess: categorySuccess,isError,error:catError } = useReadCategoriesQuery({});
  

  useEffect(() => {
   
    if(isError){
      toast.error(`error : ${catError}`)
    }

    if (productIsError) {
      toast.error(`Error fetching products: ${productError}`);
    }
  }, [ productIsError, productError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     { productData && categoryData && ( 
       <ReadProduct data={productData?.data} categoryData={categoryData?.data} refetch={refetch} />
     ) }
    </div>
  );
}