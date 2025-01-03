// response from server 
export interface SINGLE_DATA{
    message:string | null | object ,
    data:any
}

export interface RESPOINSE_INTERFACE {
    status:number,
    data:SINGLE_DATA
}

