import { IsEmail, MinLength, IsString } from "class-validator";

export class IdentityDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string
}