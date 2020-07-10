import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import {CreateProductDto} from '../products/product.tDTO';
import {ProductType} from '../products/product.entity';

export class ProductDTO {
  @IsNumber()
  id!: number;

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

export class OrderItemDTO {
  @ValidateNested()
  product!: ProductDTO;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity!: number;
}
export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(0, 100)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  address!: string;

  @Length(0, 100)
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ValidateNested({
    each: true,
  })
  items!: OrderItemDTO[];

  @IsString()
  @Length(0, 100)
  customerName!: string;
}
