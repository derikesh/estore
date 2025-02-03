'use client'

import React from 'react';
import PostCategory from '@/src/component/AdminComponents/Category/PostCategory';
import { useReadCategoriesQuery, useReadSingleCategoriesQuery } from '@/src/store/rtkQuery';
import { useParams } from 'next/navigation';

export interface CATEGORY_INTERFACE {
  _id:string,
  name: string;
  slug: string;
  parent: number | string | any;
  description?: string;
}

export default function Page() {

    const {id} = useParams();
    const { data: readSingle, isSuccess: singleSuccess, isError: singleIsError, error: singleError } = useReadSingleCategoriesQuery(id, {skip: !id,});
    const { data: categories, isSuccess: categorySuccess, isLoading: categoryLoading, isError: iscategoryError, error: categoryError , refetch } = useReadCategoriesQuery({});

  return (
    <div className='post_product' >
      <PostCategory id={id} sinlgeCategory={readSingle?.data} category={categories?.data} type={ id ?'edit' : 'add' } categoryRefetch={refetch}/>
    </div>
  );
}
