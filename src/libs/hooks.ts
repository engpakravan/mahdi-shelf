import React from "react"

export type useAsyncType = {status: 'idle'|'pending'|'resolved'|'rejected' , data?: any, error?: string}
export type useAsyncReturnType = {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    isIdle : boolean

    setData : any,
    setError : any,
    error : string,
    status : useAsyncType["status"],
    data : any,
    run : (promise : Promise<any>) => {},
    reset : () => void,
}

function useSafeDispatch<T>(dispatch : T|any) : (args : T) => void {
    const mounted = React.useRef(false);
    // @ts-ignore
    React.useLayoutEffect(() => {
        mounted.current = true
        return () => (mounted.current = false)
    }, [])
    return React.useCallback(
        (...args) => (mounted.current ? dispatch(...args) : void 0),
        [dispatch],
    )
}

export const useAsync = <T>(initialState ?: useAsyncType) : useAsyncReturnType => {
    const initialRef = React.useRef<useAsyncType>(
        {
        status: 'idle',
        ...initialState,
    })

    const [{status , data , error} , setState] = React.useReducer(
        (prevState : useAsyncType , newState : useAsyncType) => ({...prevState , ...newState}) ,
        initialRef.current
    )

    const safeSetState = useSafeDispatch<useAsyncType>(setState);

    const setData = React.useCallback(
        (data : T) => safeSetState({data , status : "resolved"})
    , [safeSetState]);

    const setError = React.useCallback(
    error => safeSetState({error , status : "rejected"})
    , [safeSetState]);

    const reset = React.useCallback(
        () => safeSetState(initialRef.current)
    , [safeSetState]);

    const run = React.useCallback((promise : Promise<any>) => {
        if(!promise || !promise.then) {
            throw new Error(`The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,)
        }
        safeSetState({status : "pending"});
        return promise.then(
            data => {
                setData(data);
                return data;
            } ,
            error => {
                setError(error)
                return Promise.reject(error);
            }
        )
    } , [safeSetState,setData ,setError])

    return {
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',
        isIdle : status === "idle",

        setData,
        setError,
        error : error || "",
        status,
        data,
        run,
        reset,
    }
}
