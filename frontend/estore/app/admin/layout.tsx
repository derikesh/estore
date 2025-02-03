'use client'

import store from '@/src/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function AdminLayout({ children }:{ children:ReactNode }) {

  return (
    <div className="admin-panel">
      <Provider store={store}>
        <main className="admin-content">{children}</main>
      </Provider>
    </div>
  );
}