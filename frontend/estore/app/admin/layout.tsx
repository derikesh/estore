'use client'

import ReduxProvider from '@/src/component/ClientSideComponent/ClientComponet'; // Handles Redux store
import { ReactNode } from 'react';

export default function AdminLayout({ children }:{ children:ReactNode }) {
  return (
    <ReduxProvider>
      <div className="admin-panel">
        <main className="admin-content">{children}</main>
      </div>
    </ReduxProvider>
  );
}
