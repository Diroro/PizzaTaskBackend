import {ProductType} from './product.entity';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  IsEnum,
  IsNumberString,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsEnum(ProductType)
  @IsNotEmpty()
  type!: ProductType;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  priceEUR!: number;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @Length(10, 255)
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Length(0, 100)
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class DeleteProductParams {
  @IsNumberString()
  id!: number;
}
