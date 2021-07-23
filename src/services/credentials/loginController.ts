import {Controller, ServiceController} from "../common/controller"
import {Request, Response} from "express"
import { HTTP_METHODS } from "../catalog/catalog"
import { query , queryConnection, getConnection} from "../database/connection"
import { DatabaseResult } from "../common/interfaces"
import { PoolConnection } from "mysql"
import jwt from "jsonwebtoken"

export class LoginController extends ServiceController implements Controller{

    
    private login(req: Request, res: Response){

        const {email, pass} = req.body

        query("SELECT 1 FROM users WHERE email = ? and pass = sha2(? , 256)", [email,pass]).then( (result : DatabaseResult) => {
            if(result.result.length == 1){

                const payload = {
                    access_level : 1
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
                    expiresIn : "12h"
                })
                
                res.status(200).json({
                        msg : 'Auth Successful',
                        token : token
                    })
            }else{
                res.status(401).json({
                    msg : 'Invalid credentials',
                })
            }
        }).catch( error => {
            console.log(error)
            res.status(500).json({
                msg : 'internal error'
            })
        })
    }

    exportEndpoints(){
        this.endpoints.push(
            {
                path : '/login',
                httpMethod : 'POST',
                handler : this.login
                
            }
        )
        return this.endpoints
    }

}