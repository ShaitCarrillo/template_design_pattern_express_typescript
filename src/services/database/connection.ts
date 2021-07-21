import mysql, { PoolConnection } from "mysql"
import { DatabaseResult } from "../common/interfaces"

var pool = mysql.createPool({
    connectionLimit : 20,
    host : "127.0.0.1",
    user : "root",
    password : "9616",
    database : "template_pattern_test"
})

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
})

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
})

export function query(query : string, params : Array<any> = []) : Promise<DatabaseResult> {
    return new Promise( (resolve, reject) => {
        pool.query(query, params, (error, result, fields = []) => {
            if(error) reject(error)
            resolve({
                result,
                fields,                
            })
        })
    })
}

export function getConnection() : Promise<PoolConnection>{
    return new Promise( (resolve,reject) => {
        pool.getConnection( (error, connection) => {
            if(error) reject(error)            
            resolve(connection)
        })
    })
}

export function queryConnection(connection : PoolConnection, query : string, params : Array<any> = []) : Promise<DatabaseResult>{
    return new Promise( (resolve, reject) => {
        connection.query(query,params, (error,result,fields = []) => {
            if(error) reject(error)
            resolve({
                result,
                fields,                
            })
        })
    })
}