import { FieldInfo, PoolConnection } from "mysql";

export interface DatabaseResult{
    result : Array<any>,
    fields : Array<FieldInfo>
}