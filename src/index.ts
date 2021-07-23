import { expressServer } from "./services/server"
import { ClientController } from "./services/client/clientController"
import { LoginController } from "./services/credentials/loginController"
import { EnvParam } from "./services/common/interfaces"
import { middlewares} from "./services/catalog/middleware"
const envParams : EnvParam = 
    {
        key : "JWT_SECRET",
        value : "mysecret"
    }



const server = new expressServer("8080", envParams)
const client = new ClientController("/clients", middlewares.jwt_verifier)
const login = new LoginController("/", undefined) 

server.setup(client,login)
server.start( () => console.log('Service Ready!'))