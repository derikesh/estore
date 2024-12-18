import LoginContainer from '@/src/component/ClientSideComponent/Containers/loginContainer/LoginContainer'
import React from 'react'
import { Provider } from 'react-redux'
import store from '@/src/store/store'

export default function page() {
  return (
    <Provider store={store} >
    <LoginContainer/>
    </Provider>
  )
}
