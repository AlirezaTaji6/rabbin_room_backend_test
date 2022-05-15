import { Server, Socket } from 'socket.io'
import { onSwitchFilePageSocket } from '../../switch-file-page/on-switch-file-page.socket';

export function onConnection(io: Server) {
    return async (socket: Socket) => {
        socket.on('switch-file-page', onSwitchFilePageSocket(io, socket))
    }
}