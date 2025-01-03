'use client'

import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaChartBar, FaBox, FaPlus, FaEdit, FaEye, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';

const AdminSidebar: React.FC = () => {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  return (
    <aside className="admin-sidebar bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <FaHome />
            <Link href="/admin/dashboard" className="hover:text-gray-400 transition duration-200">Dashboard</Link>
          </li>
          
          <li className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleProductMenu}>
              <FaBox />
              <span className="hover:text-gray-400 transition duration-200">Product</span>
              {isProductMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isProductMenuOpen && (
              <ul className="ml-6 space-y-2">
                <li className="flex items-center space-x-2">
                  <FaPlus />
                  <Link href="/admin/dashboard/product/add" className="hover:text-gray-400 transition duration-200">Add</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEdit />
                  <Link href="/admin/dashboard/product/update" className="hover:text-gray-400 transition duration-200">Update</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEye />
                  <Link href="/admin/dashboard/product/view" className="hover:text-gray-400 transition duration-200">View</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleCategoryMenu}>
              <FaBox />
              <span className="hover:text-gray-400 transition duration-200">Category</span>
              {isCategoryMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isCategoryMenuOpen && (
              <ul className="ml-6 space-y-2">
                <li className="flex items-center space-x-2">
                  <FaPlus />
                  <Link href="/admin/dashboard/category/add" className="hover:text-gray-400 transition duration-200">Add</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEdit />
                  <Link href="/admin/dashboard/category/update" className="hover:text-gray-400 transition duration-200">Update</Link>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEye />
                  <Link href="/admin/dashboard/category/view" className="hover:text-gray-400 transition duration-200">View</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;