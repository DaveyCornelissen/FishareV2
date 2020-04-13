import { IsEmail, IsNotEmpty, MinLength, Contains, IsUppercase, IsString } from "class-validator";

export class IdentityDto {
    
    UserID?: Number
    
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    @MinLength(8)
    @IsString()
    confirmPassword: string;
}
