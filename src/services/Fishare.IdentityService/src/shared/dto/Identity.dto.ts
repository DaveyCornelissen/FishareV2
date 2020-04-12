import { IsEmail, IsNotEmpty, MinLength, Contains, IsUppercase, IsString } from "class-validator";

export class IdentityDto {
    
    UserID?: Number
    
    @IsEmail()
    email: String;

    @MinLength(8)
    @IsString()
    password: String;

    @MinLength(8)
    @IsString()
    confirmPassword: String;
}
