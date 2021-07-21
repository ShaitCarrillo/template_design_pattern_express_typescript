import {Controller, ServiceController} from "../common/controller"
import {Request, Response} from "express"
import { HTTP_METHODS } from "../catalog/catalog"
import { query , queryConnection, getConnection} from "../database/connection"
import { DatabaseResult } from "../common/interfaces"
import { PoolConnection } from "mysql"

export class ClientController extends ServiceController implements Controller{

    private getClients(req : Request,res : Response){
        res.status(200).json({ msg : "getting all clients"})
    }

    private updateClient(req : Request, res : Response){
        res.status(200).json({msg : "client updated"})
    }

    private getHour(req : Request, res : Response){
        var data : Array<any> = []
        query("SELECT NOW() AS `DATE`").then( (result : DatabaseResult) => {
            data.push(result)
            return query("SELECT ? AS `NAME`", ["SHAIT EDUARDO"])
        }).then((result : DatabaseResult) => {
            
            data.push(result)

            res.status(200).json({
                msg : "success",
                data : data
            })
        }).catch( error => {
            res.send(500).json({msg : "internal error"})
        });
    }

    private getAllData(req : Request, res : Response){
        getConnection().then( (connection : PoolConnection) => {
            var data : Array<DatabaseResult> = []
            queryConnection(connection,"SELECT NOW() AS `DATE`").then( ( result : DatabaseResult) => {
                data.push(result)
                return queryConnection(connection,"SELECT ? AS `NAME`", ["SHAIT EDUARDO"])
            }).then( (result : DatabaseResult) => {
                data.push(result)

                connection.release()

                res.status(200).json({
                    msg : "success",
                    data : data
                })
            })
        })
    }

    exportEndpoints(){
        this.endpoints.push(
            {
              path : "/",
              httpMethod : HTTP_METHODS.GET,
              handler : this.getClients
            },        
            {
              path : "/update",
              httpMethod : HTTP_METHODS.PUT,
              handler : this.updateClient
            },
            {
              path : "/hour",
              httpMethod : HTTP_METHODS.GET,
              handler : this.getHour
            },
            {
              path : "/data",
              httpMethod : HTTP_METHODS.GET,
              handler : this.getAllData
            },

        )
        return this.endpoints
    }

}