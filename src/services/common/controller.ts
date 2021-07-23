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
    middleware : ((req: Request, res: Response, next: () => void) => void) | undefined
    
    constructor(prefix : string, middleware? : ((req: Request, res: Response, next: () => void) => void)){
        this.prefix = prefix
        this.endpoints = new Array()

        if(middleware != undefined){
            this.middleware = middleware            
        }
    }

}
