type restConfigType = {
    method ?: "GET"|"POST"|"DELETE"|"PATCH",
    body ?: any,
    headers ?: {[key : string] : any }
}
export const restHandler = <I,O>(endpoint : string , customConfig : restConfigType,  data ?: I) : Promise<O> => {
    const config : restConfigType = {
        method : data ? "POST" : "GET" ,
        body : JSON.stringify(data),
        headers : {'Content-Type': 'application/json'},
        ...customConfig
    }
    return window.fetch(endpoint , config).then(async (response : Response) => {
        const data = await response.json();
        if(response.ok) {
            return data;
        } else {
            return Promise.reject(data)
        }
    })
}
