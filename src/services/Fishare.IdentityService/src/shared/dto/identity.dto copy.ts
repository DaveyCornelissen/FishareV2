import { IsEmail, MinLength, IsString, IsInt } from "class-validator";

export class RemovalDto {
    @IsInt()
    id: Number
    
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string;

}
