'use client';

import React, { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

const FormProduct = dynamic(() => import('@/src/component/AdminComponents/Product/PostPorduct'), {
  ssr: false, 
  loading: () => <div>Loading...</div>,
});


export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FormProduct />
      </Suspense>
    </div>
  );
}
