import {Request, Response} from "express"

export interface endpoint {
    path : string
    httpMethod : string
    handler : (req : Request, res : Response) => void
}

export interface controller{
    exportEndpoints() : Array<endpoint>
}

export class serviceController
{
    endpoints : Array<endpoint>
    prefix : string
    
    constructor(prefix : string){
        this.prefix = prefix
        this.endpoints = new Array()
    }

}
