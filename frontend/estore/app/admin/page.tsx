'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import { Provider } from 'react-redux'
import store from '@/src/store/store'

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
