import { expressServer } from "./services/server"
import { ClientController } from "./services/client/clientController"

const server = new expressServer("8080")
const client = new ClientController("/clients")

server.setup(client)
server.start( () => console.log('Service Ready!'))