import { IsEmail, MinLength, IsString } from "class-validator";
import { Identity } from "src/identity/identity.interface";

export class IdentityDto {

    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string

    constructor(email: string, password: string) {
        this.email = email,
        this.password = password
    }
}