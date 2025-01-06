'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const FormProduct = dynamic(() => import('@/src/component/AdminComponents/Product/PostPorduct'), {
  ssr: false, 
  loading: () => <div>Loading...</div>,
});


export default function Page() {
  return (
    <div>
        <FormProduct type='edit' />
    </div>
  );
}
