import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
     
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(["intern", "admin"],{
        message: 'role must be selected'
    })
    role: "intern" | "admin";
}