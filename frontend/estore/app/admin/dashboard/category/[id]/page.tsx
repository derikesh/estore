'use client';

import React from 'react'
import PostCategory from '@/src/component/AdminComponents/Category/PostCategory';
export default function page() {
  
    return (
         <div className='admin_category_add' >
             <PostCategory type='edit' key={'edit'} />
          </div>    
  )
}
