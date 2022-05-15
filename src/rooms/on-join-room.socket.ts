import { Server, Socket } from "socket.io";
import { SuccessResponse } from "../common/dto/response.dto";
import { ValidatorUtil } from "../common/utils/validator.util";
import { OnJoinRoomDto } from "./dto/on-join-room.dto";

export function onJoinRoomSocket(io: Server, socket: Socket) {
    return async (onJoinRoomDto: OnJoinRoomDto) => {        
        
        const result = await ValidatorUtil.validate(OnJoinRoomDto, onJoinRoomDto)
        if(result !== true) {
            return socket.emit('join-room', result)
        }

        socket.join(onJoinRoomDto.room_id)

        socket.broadcast.to(onJoinRoomDto.room_id).emit('join-room', new SuccessResponse({
            data: 'new member'
        }))
    }
}