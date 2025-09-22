import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class SuperAdminSignInDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}