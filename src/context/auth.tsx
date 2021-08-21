import React from "react";
import {useAsync} from "../libs/hooks";
import {FullPageError, FullPageSpinner} from "../components";
import {auth} from "../libs/auth";
import {User} from "../constants/global";

export type AuthContextType = {login : typeof auth.login, register : typeof auth.register, logout : Function , user : Omit<User, "password" | "username">}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider : React.FC = (props) => {
    const {setData , run , data : user , isLoading , isError , error } = useAsync<User>();

    React.useEffect(() => {
        const token = auth.getToken();
        if(token) setData({displayName :"Mahdi"})
        else setData(null);
    } , [run])

    const login = React.useCallback(
        (form : User) => auth.login(form).then(user => setData(user)),
        [setData],
    )
    const register = React.useCallback(
        (form: User) => auth.register(form).then(user => setData(user)),
        [setData],
    )
    const logout = React.useCallback(() => {
        auth.logout()
        setData(null)
    }, [setData])

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (isError) {
        return <FullPageError error={error} />
    }

    return <AuthContext.Provider value={{
        login ,
        logout ,
        register ,
        user
    }}>{props.children}</AuthContext.Provider>
}

export const useAuth = () : AuthContextType => {
    const context = React.useContext(AuthContext)
    if(context === undefined) throw new Error("")
    return context
}
