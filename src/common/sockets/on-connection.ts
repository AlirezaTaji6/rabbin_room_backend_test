import { Server, Socket } from 'socket.io'
import { onJoinRoomSocket } from '../../rooms/on-join-room.socket';
import { onSwitchFilePageSocket } from '../../switch-file-page/on-switch-file-page.socket';

export function onConnection(io: Server) {
    return async (socket: Socket) => {
        socket.on('switch-file-page', onSwitchFilePageSocket(io, socket))
        socket.on('join-room', onJoinRoomSocket(io, socket))
    }
}