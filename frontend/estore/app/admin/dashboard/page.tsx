'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const ProtectedRoute = dynamic( ()=>import('../../../src/utils/ProtectedRoutes/ProtectedRoute') )

export default function Dashboard() {
  return (
    <ProtectedRoute>
      Dashboard
    </ProtectedRoute>
  )
}
