import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {Repository, DeleteResult, In} from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }

  async getProductsByIds(ids: number[]): Promise<Product[]> {
    return this.productRepository.findBy({id: In(ids)});
  }
}
