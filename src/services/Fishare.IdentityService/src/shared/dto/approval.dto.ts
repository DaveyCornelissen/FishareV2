import { IsEmail, MinLength, IsString } from "class-validator";

export class ApprovalDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    @IsString()
    password: string
}