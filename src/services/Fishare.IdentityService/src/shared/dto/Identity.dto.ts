import { IsEmail, MinLength, IsString } from "class-validator";

export class IdentityDto {
    
    id?: Number
    
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    @MinLength(8)
    @IsString()
    confirmPassword: string;
}
