import {Controller, Post, Body, Get, Delete, Param, BadRequestException} from '@nestjs/common';
import {ProductService} from './product.service';
import {Product} from './product.entity';
import {CreateProductDto, DeleteProductParams} from './product.DTO';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const {name, description, image, priceEUR, type} = createProductDto;
    const product = new Product(type, name, description, image, priceEUR);
    return await this.productService.createProduct(product);
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Delete(':id')
  async deleteProduct(@Param() params: DeleteProductParams): Promise<string> {
    const deleteResult = await this.productService.deleteProduct(params.id);
    if (deleteResult.affected === 0) {
      throw new BadRequestException('Product not found');
    } else {
      return 'Product was successfully deleted!';
    }
  }
}
