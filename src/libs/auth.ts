import {restHandler} from "./rest";
import {AUTH_ENDPOINT} from "../constants/endpoint";
import {User} from "../constants/global";

export const STORAGE_PREFIX = `__mahdi_manager__`
export const STORAGE_AUTH_TOKEN = `${STORAGE_PREFIX}TOKEN`

export const handleUserResponse = ({user} : any) => window.localStorage.setItem(STORAGE_AUTH_TOKEN , user.token)
export const login = (payload : User) : Promise<any> => restHandler(`${AUTH_ENDPOINT}/login` , {} , payload).then(handleUserResponse);
export const register = (payload : User) : Promise<any> => restHandler(`${AUTH_ENDPOINT}/register` , {} , payload).then(handleUserResponse);
export const logout = () => window.localStorage.removeItem(STORAGE_AUTH_TOKEN);

