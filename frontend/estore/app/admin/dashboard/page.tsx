'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// testing
import AddProductContainer from '@/src/container/adminContainer/product/AddProductContainer';
import ReadProductContainer from '@/src/container/adminContainer/product/ReadProductContainer';

const ProtectedRoute = dynamic( ()=>import('../../../src/utils/ProtectedRoutes/ProtectedRoute') )

export default function Dashboard() {
  return (
    <ProtectedRoute>
    {/* <AddProductContainer/> */}
    {/* <ReadProductContainer/> */}
    this is home dashboard with some graphs
    </ProtectedRoute>
  )
}
