import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {OrderService, DELIVERY_COST} from './order.service';
import {Order} from './order.entity';
import {JwtOptionalAuthGuard} from '../auth/jwt-optional-auth.guard';
import {IsNumberString} from 'class-validator';
import {User} from '../user/user.entity';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {CreateOrderDTO} from './order.DTO';

interface RequestWithUser {
  user: User;
}

// may be use one common dto for delete params
class DeleteParams {
  @IsNumberString()
  id!: number;
}

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtOptionalAuthGuard)
  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDTO,
    @Req() req: RequestWithUser,
  ): Promise<Order> {
    const user = req.user ? req.user : undefined;
    return this.orderService.createOrder({...createOrderDto, user});
  }

  // @TEMPORARY

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getUserOrders(@Req() req: RequestWithUser): Promise<Order[]> {
    const user = req.user;
    return this.orderService.getOrdersByUser(user.id);
  }

  // @TEMPORARY
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOrder(@Param() params: DeleteParams): Promise<string> {
    const deleteResult = await this.orderService.deleteOrder(params.id);
    if (deleteResult.affected === 0) {
      throw new BadRequestException('Order not found');
    } else {
      return 'Order was successfully deleted!';
    }
  }

  @Get('delivery-cost')
  async getDeliveryCost(): Promise<number> {
    return DELIVERY_COST;
  }
}
