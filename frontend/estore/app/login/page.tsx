'use client'

import React from 'react'
import { Provider } from 'react-redux'
import store from '@/src/store/store'
import LoginContainer from '@/src/component/ClientSideComponent/Containers/loginContainer/LoginContainer'

const login = () => {


  return (
   <Provider store={store} >
    <LoginContainer/>
    </Provider>
  )
}

export default login