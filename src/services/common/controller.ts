import {Request, Response} from "express"

export interface Endpoint {
    path : string
    httpMethod : string
    handler : (req : Request, res : Response) => void
}

export interface Controller{
    exportEndpoints() : Array<Endpoint>
}

export class ServiceController
{
    endpoints : Array<Endpoint>
    prefix : string
    
    constructor(prefix : string){
        this.prefix = prefix
        this.endpoints = new Array()
    }

}
