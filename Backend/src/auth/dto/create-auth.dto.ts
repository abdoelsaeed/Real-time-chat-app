/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {

    IsEmail,
    IsString,
    MaxLength,
    MinLength,

} from 'class-validator';
export class CreateAuthDto {
    @IsString({ message: 'name must be a string' })
    @MinLength(3, { message: 'min length of name is 3' })
    @MaxLength(30, { message: 'max length of name is 30' })
    name: string;

    @IsString({ message: 'password must be a string' })
    @MinLength(3, { message: 'min length of password is 3' })
    @MaxLength(30, { message: 'max length of password is 30' })
    password: string;

    @IsString({ message: 'email must be a string' })
    @IsEmail({}, { message: 'email must be a valid email' })
    @MinLength(0, { message: 'email is required' })
    email: string;
}
