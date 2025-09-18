import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";


export class UserSignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly userName: string

    @IsNotEmpty()
    @IsString()
    readonly fullName: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1000000000, { message: 'Phone number must be exactly 10 digits' })
    @Max(9999999999, { message: 'Phone number must be exactly 10 digits' })
    readonly phoneNumber: number

    @IsNotEmpty()
    @IsString()
    readonly password: string
}