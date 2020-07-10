/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import {Product} from '../products/product.entity';
import {User} from '../user/user.entity';
import {OrderItem} from './orderItem.entity';

@Entity()
export class Order implements IOrder {
  constructor(
    email: string,
    address: string,
    phoneNumber: string,
    customerName: string,
    items: OrderItem[],
    totalPriceEUR: number,
    date: Date,
    user?: User,
  ) {
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.items = items;
    this.customerName = customerName;
    this.totalPriceEUR = totalPriceEUR;
    this.user = user;
    this.orderDate = date;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(
    (type) => OrderItem,
    (orderItem) => orderItem.order,
  )
  items!: OrderItem[];

  @ManyToOne((type) => User, {nullable: true})
  user?: User;

  @Column('varchar', {length: 100})
  email: string;

  @Column('varchar', {length: 100})
  customerName: string;

  @Column('varchar', {length: 255})
  address: string;

  @Column('varchar', {length: 100})
  phoneNumber: string;

  @Column('float')
  totalPriceEUR: number;

  @Column('datetime')
  orderDate: Date;
}

interface IOrder {
  items: OrderItem[];
  totalPriceEUR: number;
  user?: User;
  email: string;
  address: string;
  customerName: string;
  phoneNumber: string;
}
