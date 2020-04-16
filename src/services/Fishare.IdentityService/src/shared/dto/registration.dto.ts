import { IsEmail, MinLength, IsString } from "class-validator";

export class RegistrationDto {
    
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

    @MinLength(8)
    @IsString()
    confirmPassword: string;
}
