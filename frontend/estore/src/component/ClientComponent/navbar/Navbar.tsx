"use client"

import * as React from "react"
import Link from "next/link"
import { LuMenu, LuSearch, LuShoppingCart, LuX } from 'react-icons/lu'
import { useEffect,useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import ThemeSwitch from "../themeSwitch/ThemeSwitch"
import { StoreCart } from "../Cart/StoreCart"

const navigation = [
  { name: "All item", href: "/all" },
 
]


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSticky, setsetIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setsetIsSticky(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className="text-inherit">
      <div className="container-cus">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-baseline">
            <Link href="/" className="text-2xl font-bold mr-8">
              Store
            </Link>
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm dark:text-white text-gray-600 font-medium hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="hidden sm:block flex-1 max-w-md mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 rounded-[10px] text-gray-500"
              />
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Cart and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeSwitch />
            <StoreCart icon={true} product={null} />
            {/* <Button variant="ghost" size="icon" className="hidden sm:flex">
              <LuShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Button> */}

            {/* Mobile Menu */}
            <div className="flex sm:hidden">
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
                        className="block px-3 py-2 rounded-md text-base dark:text-white text-gray-600 font-medium hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-4 space-y-4">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 rounded-[10px] text-gray-500"
                      />
                      <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
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
      </div>
    </nav>
  )
}

