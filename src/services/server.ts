import  express  from "express"
import { Express } from "express"
import { Controller, ServiceController } from "./common/controller"
import { HTTP_METHODS } from "./catalog/catalog"

export class expressServer {
    app : Express
    port : string
    ready : boolean

    constructor(port : string){
        this.ready = false
        this.port = port
        this.app = express()
        this.app.use(express.urlencoded({extended : false}) , express.json({limit : "10mb"}))
    }

    setup(...controllers :  Array<ServiceController & Controller>){
        for(const controller of controllers){
            let service_controller = express.Router()
        
            for(let service of controller.exportEndpoints()){
                switch(service.httpMethod.toUpperCase()){
                    case HTTP_METHODS.POST: service_controller.post(service.path, service.handler) 
                        break
                    case HTTP_METHODS.GET: service_controller.get(service.path, service.handler) 
                        break
                    case HTTP_METHODS.PUT: service_controller.put(service.path, service.handler) 
                        break
                    case HTTP_METHODS.DELETE: service_controller.delete(service.path, service.handler) 
                        break
                }
            }
            this.app.use(controller.prefix, service_controller)
        }

        this.ready = true
    }

    start( callback : () => void ) : boolean{
        if(!this.ready)
            throw "app doesn't have controllers"

        this.app.listen( this.port, callback)

        return true
    }

}