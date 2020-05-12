import { IsEmail, MinLength, IsString, IsLowercase } from "class-validator";
import { Identity } from "src/identity/identity.interface";

export class IdentityDto {

    @IsEmail()
    @IsLowercase()
    email: string;

    @MinLength(8)
    @IsString()
    password: string

    constructor(email: string, password: string) {
        this.email = email,
        this.password = password
    }
}