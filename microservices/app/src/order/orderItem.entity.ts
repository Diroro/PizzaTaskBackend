import {Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from '../products/product.entity';
import {Order} from './order.entity';

@Entity()
export class OrderItem {
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Product, {nullable: false})
  product: Product;

  @Column('int')
  quantity: number;

  @ManyToOne(
    (type) => Order,
    (order) => order.items,
  )
  order!: Order;
}
