/* eslint-disable prettier/prettier */
import { IsOptional } from "class-validator"

export class CreateStoryDto {
    @IsOptional()
    media_url: string

    @IsOptional()
    media_type: string
    
    @IsOptional()
    caption: string
}
