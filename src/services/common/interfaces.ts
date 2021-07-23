import { FieldInfo, PoolConnection } from "mysql";

export interface DatabaseResult{
    result : Array<any>,
    fields : Array<FieldInfo>
}

export interface EnvParam{
    key : string
    value : string 
}