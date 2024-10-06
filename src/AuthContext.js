import { createContext, useContext, useState } from "react";


export const AuthContext= createContext();

export const AuthProvider =({children})=>{

    const [token,setToken]=useState(localStorage.getItem('token'));
    const[userId, setUserId]=useState(null);
  

    const storetokenInLs=(accessToken,refreshToken,who,id,is_sp,is_su)=>{
        localStorage.setItem('token',accessToken);
        localStorage.setItem('access',accessToken)
        localStorage.setItem('refresh',refreshToken)
        setToken(accessToken);
        setUserId(id);
        return ;
    };


    let isLoggedIn =!!token;

    const loginuserid=(reg_id)=>{
        setUserId(reg_id);
    }

    //tacking the logout functionlity
    const LogoutUser=()=>{
        setToken("");
        localStorage.removeItem('token');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }
    return (<AuthContext.Provider value={{isLoggedIn,storetokenInLs,LogoutUser,setToken,loginuserid,userId}}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    const authContextValue=  useContext(AuthContext);
    if(!authContextValue)
    {
        throw new Error ("useAuth used outside of the provider");
    }

    return authContextValue;
}