import { IsEmail, MinLength, IsString, MaxLength, IsLowercase } from "class-validator";
import { isString } from "util";

export class RegistrationDto {
    
    @IsEmail()
    @IsLowercase()
    email: string;

    @MinLength(5)
    @MaxLength(15)
    @IsString()
    username: string;

    @MinLength(8)
    @IsString()
    password: string;

    @MinLength(8)
    @IsString()
    confirmPassword: string;

    @IsString()
    country: string;

    constructor(email: string, username: string, password: string, confirmPassword: string, country: string) {
        this.email = email,
        this.username = username,
        this.password = password,
        this.confirmPassword = confirmPassword,
        this.country = country
    }

}
