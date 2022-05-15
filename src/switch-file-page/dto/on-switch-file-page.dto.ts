import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class OnSwitchFilePageDto {
    @IsString()
    @IsNotEmpty()
    filepath!: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    page_number: number = 1;

    @IsString()
    @IsNotEmpty()
    room_id!: string

}