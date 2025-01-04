'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const LoginContainer = dynamic( ()=> import('../../src/container/loginContainer/LoginContainer') , {ssr:false});


export default function page() {
  return (
    // <Provider store={store} >
    <div className='admin_contaier_wrap'>
      <LoginContainer/>
    </div>
    // </Provider>
  )
}
