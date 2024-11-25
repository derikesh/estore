'use client'

import ReduxProvider from '@/src/component/ClientComponet'; // Handles Redux store

import '@/src/styles/admin.css'; // Custom admin styles
import { ReactNode } from 'react';

export default function AdminLayout({ children }:{ children:ReactNode }) {
  return (
    <ReduxProvider>
      <div className="admin-panel">
        {/* <AdminSidebar /> */}
        <main className="admin-content">{children}</main>
      </div>
    </ReduxProvider>
  );
}
