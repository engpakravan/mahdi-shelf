import {User} from "../constants/global";

export const STORAGE_PREFIX = `__mahdi_manager__`
export const STORAGE_AUTH_TOKEN = `${STORAGE_PREFIX}TOKEN`

export const handleUserResponse = ({user} : any) : User["displayName"] => {
    window.localStorage.setItem(STORAGE_AUTH_TOKEN, user.token)
    return "Mahdipakravan"
}
export const auth = {
    handleUserResponse : ({user} : any) => window.localStorage.setItem(STORAGE_AUTH_TOKEN , user.token) ,
    login : (payload : User) : Promise<User["displayName"]> => new Promise(resolve => {
        setTimeout(() => {resolve(handleUserResponse({user : {token : "123456"}}))} , 3000)
    }),
    register : (payload : User) : Promise<User["displayName"]> => new Promise(resolve => {
        setTimeout(() => {resolve(handleUserResponse({user : {token : "123456"}}))} , 3000)
    }) ,
    logout : () => window.localStorage.removeItem(STORAGE_AUTH_TOKEN) ,
    getToken : () :string|undefined => window.localStorage.getItem(STORAGE_AUTH_TOKEN) as string
}
