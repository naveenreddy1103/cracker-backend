import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";



export class SuperAdminSignupDto{
    @IsString()
    @IsNotEmpty()
    adminName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    // @IsStrongPassword()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    superAdminKey:string
}