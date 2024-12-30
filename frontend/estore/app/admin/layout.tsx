'use client'

import store from '@/src/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import ProtectedRoute from '@/src/utils/ProtectedRoutes/ProtectedRoute';

export default function AdminLayout({ children }:{ children:ReactNode }) {
  return (
      <div className="admin-panel">
        admin layout
        <Provider store={store} >
           <main className="admin-content">{children}</main>
        </Provider>
      </div>
  );
}


