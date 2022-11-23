export const LOADING="LOADING";
export const SUCCESS="SUCCESS";
export const ERROR="ERROR";

export const get_loading =()=>({
    type:LOADING
})

export const get_suceess =(data)=>({
    type:SUCCESS,
    payload:data
})

export const get_error=()=>({
    type:ERROR  
})



