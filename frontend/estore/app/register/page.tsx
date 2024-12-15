'use client';

import LoginPage from "@/src/component/ClientSideComponent/Containers/RegisterContainer/RegisterContainer"
import { Provider } from "react-redux";
import store from "@/src/store/store";

const register = ()=>{
    return (
        <>
        
        <Provider store={store}>
            <LoginPage/>
        </Provider>

        </>
    )
}

export default register;