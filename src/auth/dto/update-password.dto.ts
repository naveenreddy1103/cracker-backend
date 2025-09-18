import { IsNotEmpty, IsString } from "class-validator";


export class UpdatePasswordDto{
    @IsString()
    @IsNotEmpty()
    readonly oldPassword:string

    @IsString()
    @IsNotEmpty()
    readonly newPassword:string

    @IsNotEmpty()
    @IsString()
    readonly confirmPassword:string

}