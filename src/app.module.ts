import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProfileModule} from './profile/profile.module';
import {AuthModule} from './auth/auth.module';
import {ProductModule} from './products/product.module';
import {OrderModule} from './order/order.module';
import {DBModule} from './DB/db.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [ProfileModule, AuthModule, ProductModule, OrderModule, DBModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// get products
// add product ? maybe

// ProductController =>  get product (maybe with type query parameter), does not depend on auth

// OrderController

// AuthController
// ProfileController  => get all orders
