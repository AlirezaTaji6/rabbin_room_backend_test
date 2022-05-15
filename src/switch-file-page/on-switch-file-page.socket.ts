import { Server, Socket } from "socket.io";
import { SuccessResponse } from "../common/dto/response.dto";
import { ValidatorUtil } from "../common/utils/validator.util";
import { OnSwitchFilePageDto } from "./dto/on-switch-file-page.dto";

export function onSwitchFilePageSocket(io: Server, socket: Socket) {
    return async (onSwitchFilePageDto: OnSwitchFilePageDto) => {        
        
        const result = await ValidatorUtil.validate(OnSwitchFilePageDto, onSwitchFilePageDto)
        if(result !== true) {
            return socket.emit('switch-file-page', result)
        }

        socket.broadcast.to(onSwitchFilePageDto.room_id).emit('switch-file-page', new SuccessResponse({
            data: {
                fillpath: onSwitchFilePageDto.filepath,
                page_number: onSwitchFilePageDto.page_number
            }
        }))
    }
}