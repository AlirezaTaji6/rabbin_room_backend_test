import * as http from 'http';
import { api } from './startup/api'

const server = http.createServer(api);

const PORT = process.env.DOCKER_PORT || 8080;

server.listen(PORT, () => {
    console.info(`server is running on port ${PORT}...`);
});