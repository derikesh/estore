'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PostCategory = dynamic(() => import('@/src/component/AdminComponents/Category/PostCategory'), {
  ssr: false,
});

export default function Page() {
  return (
    <div className='admin_category_add'>
      <PostCategory />
    </div>
  );
}
