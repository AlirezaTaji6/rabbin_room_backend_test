import { IsNotEmpty, IsString } from "class-validator";

export class OnJoinRoomDto {
    @IsString()
    @IsNotEmpty()
    room_id!: string;
}