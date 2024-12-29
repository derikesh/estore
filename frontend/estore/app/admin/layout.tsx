'use client'

import ReduxProvider from '@/src/component/ClientSideComponent/ClientComponet'; // Handles Redux store
import store from '@/src/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function AdminLayout({ children }:{ children:ReactNode }) {
  return (
    <ReduxProvider>
      <div className="admin-panel">
        admin layout
        <Provider store={store} >
           <main className="admin-content">{children}</main>
        </Provider>
      </div>
    </ReduxProvider>
  );
}


