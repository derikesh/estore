'use client';

import React from 'react';
import Link from 'next/link';
import navbarRef from '@/src/utils/navRef/Navref';

export default function Navbar() {
  return (
    <div ref={navbarRef} className='test-navbar'>
      <ul className='flex gap-4'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/test2">Test2</Link></li>
      </ul>
    </div>
  );
}