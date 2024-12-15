import React from 'react'

export default function Navbar() {
  return (
    <div className='test-navbar' >
            <ul className='flex gap-4' >
                <li><a href="/">Home</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">login</a></li>
            </ul>
    </div>
  )
}
