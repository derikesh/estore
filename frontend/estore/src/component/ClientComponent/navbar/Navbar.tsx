"use client"

import * as React from "react"
import Link from "next/link"
import { LuMenu, LuSearch, LuShoppingCart, LuX } from 'react-icons/lu';
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Apparel", href: "/apparel" },
  { name: "Accessories", href: "/accessories" },
  { name: "About", href: "/about" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const { theme, setTheme } = useTheme()

  return (
    <nav className="dark:bg-white shadow bg-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          <div className="flex ">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Store
              </Link>
              <button onClick={ ()=>setTheme( theme === 'dark' ? 'light' : 'dark' ) } >
            SWITCH DARA
          </button>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

         

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" size="icon">
              <LuSearch className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <LuShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
          
          <div className="flex items-center sm:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <LuX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <LuMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="mt-5">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <LuSearch className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <LuShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Shopping cart</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

