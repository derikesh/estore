'use client'

import store from '@/src/store/store';
import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import navbarRef from '@/src/utils/navRef/Navref';
import AdminSidebar from '@/src/component/AdminComponents/adminSideBar/AdminSideBar';

export default function AdminLayout({ children }:{ children:ReactNode }) {

  // useEffect(() => {
  //   const removeNavbar = () => {
  //     if (navbarRef.current) {
  //       navbarRef.current.style.display = 'none';
  //     }
  //   };

  //   removeNavbar();

  //   return () => {
  //     if (navbarRef.current) {
  //       navbarRef.current.style.display = '';
  //     }
  //   };
  // }, []);

  return (
    <div className="admin-panel flex">
      <AdminSidebar />
      <Provider store={store}>
        <main className="admin-content p-4">{children}</main>
      </Provider>
    </div>
  );
}