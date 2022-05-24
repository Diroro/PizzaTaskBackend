import {Module} from '@nestjs/common';
import {OrderService} from './order.service';
import {OrderController} from './order.controller';
import {Order} from './order.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductService} from '../products/product.service';
import {ProductModule} from '../products/product.module';
import {OrderItem} from './orderItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderItem]),
    ProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [TypeOrmModule, OrderService],
})
export class OrderModule {}
