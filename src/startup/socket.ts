import { Server, Socket } from 'socket.io'
import * as http from 'http';
import { onConnection } from '../common/sockets/on-connection';

export function socketServer(server: http.Server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        },
    });

    io.on('connection', onConnection(io));

    return io
}