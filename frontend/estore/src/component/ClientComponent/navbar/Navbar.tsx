'use client';

import React, { useRef } from 'react'

import navbarRef from '@/src/utils/navRef/Navref';

export default function Navbar() {

  return (
    <div ref={navbarRef} className='test-navbar' >
            <ul className='flex gap-4' >
                <li><a href="/">Home</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">login</a></li>
            </ul>
    </div>
  )
}
