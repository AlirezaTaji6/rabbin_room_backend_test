import { Server, Socket } from 'socket.io'
import * as http from 'http';

export function socketServer(server: http.Server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        },
    });

    io.on('connection', () => {
        console.log('alsdkjflsd')
    });

    return io
}