import {Injectable, Inject} from '@nestjs/common';
import {Order} from './order.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult} from 'typeorm';
import {User} from '../user/user.entity';
import {Product} from '../products/product.entity';
import {ProductService} from '../products/product.service';
import {OrderItem} from './orderItem.entity';

interface OrderData {
  email: string;
  address: string;
  phoneNumber: string;
  items: {product: Product; quantity: number}[];
  customerName: string;
  user?: User;
}

export const DELIVERY_COST = 2;

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(orderData: OrderData): Promise<Order> {
    const {email, address, phoneNumber, items, customerName, user} = orderData;
    const products = items.map((item) => item.product);

    const totalPriceEur = products.reduce<number>((prev, curr) => (prev += curr.priceEUR), 0);

    const orderItems = items.map((item) => new OrderItem(item.product, item.quantity));
    const createdItems = await this.orderItemRepository.save(orderItems);

    const now = new Date();
    const order = new Order(
      email,
      address,
      phoneNumber,
      customerName,
      createdItems,
      totalPriceEur + DELIVERY_COST,
      now,
      user,
    );

    const newOrder = await this.orderRepository.save(order);

    if (newOrder.user === undefined) {
      newOrder.user = undefined;
    }

    return newOrder;
  }

  async deleteOrder(id: number): Promise<DeleteResult> {
    return await this.orderRepository.delete(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['items', 'user', 'items.product'],
      where: {
        user:{id: userId}
      },
    });
  }

  async getAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
}
