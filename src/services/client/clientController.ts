import {Controller, ServiceController} from "../common/controller"
import {Request, Response} from "express"
import { HTTP_METHODS } from "../catalog/catalog"

export class ClientController extends ServiceController implements Controller{

    private getClients(req : Request,res : Response){
        res.status(200).json({ msg : "getting all clients"})
    }

    private updateClient(req : Request, res : Response){
        res.status(200).json({msg : "client updated"})
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
            }

        )
        return this.endpoints
    }

}