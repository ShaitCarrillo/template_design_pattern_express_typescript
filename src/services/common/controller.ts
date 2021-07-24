import {Request, Response} from "express"
import {Middleware,  EndpointHandler} from "./interfaces"

export interface Endpoint {
    path : string
    httpMethod : string
    handler : EndpointHandler
}

export interface Controller{
    exportEndpoints() : Array<Endpoint>
}

export class ServiceController
{
    endpoints : Array<Endpoint>
    prefix : string
    middleware : Middleware | undefined
    
    constructor(prefix : string, middleware? : Middleware){
        this.prefix = prefix
        this.endpoints = new Array()

        if(middleware != undefined){
            this.middleware = middleware            
        }
    }

}
