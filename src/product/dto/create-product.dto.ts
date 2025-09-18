import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Auth } from "src/auth/schemas/user.schema";


export class CreateProductDto {


    @IsNotEmpty()
    @IsNumber()
    readonly productId: number

    @IsNotEmpty()
    @IsString()
    readonly productName: String

    @IsNotEmpty()
    @IsString()
    readonly brandName: String

    @IsNotEmpty()
    @IsString()
    readonly imagePath: String

    @IsNotEmpty()
    @IsNumber()
    readonly orignalPrice: number

    @IsNotEmpty()
    @IsNumber()
    readonly discountPrice: number


    @IsNotEmpty()
    @IsString()
    readonly category: string

    @IsEmpty({ message: "You can't pass user id" })
    readonly user: Auth
}