import { Request, Response } from "express";
import { FieldInfo } from "mysql";

export interface DatabaseResult{
    result : Array<any>,
    fields : Array<FieldInfo>
}

export interface EnvParam{
    key : string
    value : string 
}

export type Middleware = (req: Request, res: Response, next: () => void) => void

export type EndpointHandler = (req: Request, res: Response) => void