/* eslint-disable prettier/prettier */
import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateConversationDto {
    @IsString({ message: "name must be a string" })
    name:string;
    @IsOptional()
    avatar?:string
    @IsArray()
    memberIds:string[]
}
