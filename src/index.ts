import { expressServer } from "./services/server"
import { clientController } from "./services/client/clientController"

const server = new expressServer("8080")
const client = new clientController("/clients")

server.setup(client)
server.start( () => console.log('Service Ready!'))