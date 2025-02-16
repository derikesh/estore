"use client"

import store from "@/src/store/store"
import { type ReactNode, useState } from "react"
import { Provider } from "react-redux"
import AdminSidebar from "@/src/component/AdminComponents/adminSideBar/AdminSideBar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HiBell, HiChevronDown, HiOutlineUser, HiOutlineLogout } from "react-icons/hi"
import { useLogoutMutation } from "@/src/store/rtkQuery"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [logout, { isSuccess, isError, error }] = useLogoutMutation()

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleLogout = async () => {
    try {
      await logout({})
      window.location.href = '/admin'  
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <div className="admin-panel flex h-screen">
      <div className="w-[12%]">
        <AdminSidebar />
      </div>
      <Provider store={store}>
        <div className="flex flex-col w-[88%]">
          <header className="bg-white border border-b-2 flex justify-end items-center p-4">
            <div className="flex items-center space-x-4">
              <HiBell className="h-5 w-5 text-gray-500" />
              <div className="relative">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                  <Avatar>
                    <AvatarImage className="bg-white p-1 object-contain" src="/images/user.png" alt="User avatar" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Estore</span>
                  <HiChevronDown className="h-4 w-4 text-gray-500" />
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <HiOutlineUser className="mr-2" />
                      About User
                    </a>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <HiOutlineLogout className="mr-2" />
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </header>
          <main className="admin-content p-4 flex-1 overflow-auto">{children}</main>
        </div>
      </Provider>
    </div>
  )
}
