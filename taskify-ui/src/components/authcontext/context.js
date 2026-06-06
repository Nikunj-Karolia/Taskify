import { createContext, useState } from "react";

export const AuthContext = createContext();

export default AuthContextProvider = ({children})=>{
    const [expires,setExpires] = useState();
    function handleRefeshToken(){

    }

    function handleLogout(){

    }

    function handleLogin(){

    }

    function handleSignup(){

    }

    return ();

}