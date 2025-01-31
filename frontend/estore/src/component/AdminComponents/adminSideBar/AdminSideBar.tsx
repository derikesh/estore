'use client'

import React, { useState, memo } from 'react';
import { FaHome, FaBox, FaPlus, FaEye, FaChevronDown, FaChevronUp, FaStore, FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, href }) => (
  <li className="flex items-center space-x-2">
    {icon}
    <Link href={href} className="hover:text-gray-400 transition duration-200">{label}</Link>
  </li>
);

interface SubMenuProps {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({ icon, label, isOpen, toggle, children }) => (
  <li className="flex flex-col space-y-2">
    <div className="flex items-center space-x-2 cursor-pointer" onClick={toggle}>
      {icon}
      <span className="hover:text-gray-400 transition duration-200">{label}</span>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </div>
    {isOpen && <ul className="ml-6 space-y-2">{children}</ul>}
  </li>
);

const AdminSidebar: React.FC = memo(() => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isStoreMenuOpen, setIsStoreMenuOpen] = useState(false);

  const toggleProductMenu = () => setIsProductMenuOpen(!isProductMenuOpen);
  const toggleCategoryMenu = () => setIsCategoryMenuOpen(!isCategoryMenuOpen);
  const toggleStoreMenu = () => setIsStoreMenuOpen(!isStoreMenuOpen);

  console.log("menu rerendered")

  return (
    <aside className="admin-sidebar bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
        <ul className="space-y-4">
          <MenuItem icon={<FaHome />} label="Dashboard" href="/admin/dashboard" />
          <MenuItem icon={<FaHome />} label="Test2" href="/admin/dashboard/test2" />

          <SubMenu
            icon={<FaStore />}
            label="Store"
            isOpen={isStoreMenuOpen}
            toggle={toggleStoreMenu}
          >
            <MenuItem icon={<FaQuestionCircle />} label="FAQ" href="/admin/dashboard/store/faq" />
          </SubMenu>

          <SubMenu
            icon={<FaBox />}
            label="Product"
            isOpen={isProductMenuOpen}
            toggle={toggleProductMenu}
          >
            <MenuItem icon={<FaPlus />} label="Add" href="/admin/dashboard/product/add" />
            <MenuItem icon={<FaEye />} label="View" href="/admin/dashboard/product/" />
          </SubMenu>

          <SubMenu
            icon={<FaBox />}
            label="Category"
            isOpen={isCategoryMenuOpen}
            toggle={toggleCategoryMenu}
          >
            <MenuItem icon={<FaPlus />} label="Add" href="/admin/dashboard/category/add" />
            <MenuItem icon={<FaEye />} label="View" href="/admin/dashboard/category" />
          </SubMenu>

         
        </ul>
      </div>
    </aside>
  );
});

export default React.memo(AdminSidebar);