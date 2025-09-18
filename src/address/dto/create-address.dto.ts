import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsEmpty,
} from 'class-validator';
import { User } from 'src/user/schemas/create-user.schema';

export class CreateAddressDto {
  @IsNotEmpty()
  @MinLength(3, { message: "Minimum 3 characters" })
  @MaxLength(20, { message: "Maximum 20 characters" })
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Phone number must be a number' })
  @Min(1000000000, { message: 'Phone number must be exactly 10 digits' })
  @Max(9999999999, { message: 'Phone number must be exactly 10 digits' })
  readonly phoneNumber: number;

  @IsNotEmpty()
  @MinLength(3, { message: "Minimum 3 characters" })
  @MaxLength(90, { message: "Maximum 90 characters" })
  @IsString()
  readonly deliveryAddress: string;

  @IsNotEmpty()
  @MinLength(3, { message: "Minimum 3 characters" })
  @MaxLength(10, { message: "Maximum 10 characters" })
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Pincode must be a number' })
  @Min(100000, { message: 'Pincode must be exactly 6 digits' })
  @Max(999999, { message: 'Pincode must be exactly 6 digits' })
  readonly pincode: number;

  @IsNotEmpty()
  @MinLength(3, { message: "Minimum 3 characters" })
  @MaxLength(20, { message: "Maximum 20 characters" })
  @IsString()
  readonly landmark: string;

  @IsEmpty({message:"we can't enter user id"})
  readonly user: User;
}
