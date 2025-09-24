import { IsArray, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Auth } from "src/auth/schemas/vendor.schema";


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

    @IsOptional() // Because it's "images?" (optional)
    @IsArray()
    images?: object[];

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
    readonly auth: Auth
}