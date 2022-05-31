import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BasicStrategy } from 'src/utils/strategies/basic/basic.strategy';
import { AtStrategy } from 'src/utils/strategies/jwt/at.strategy';
import { RtStrategy } from 'src/utils/strategies/jwt/rt.strategy';

import { DatabaseModule } from './database/database.module';
import { ClientsModule } from './routes/clients/clients.module';
import { ProductsModule } from './routes/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    { ...JwtModule.register({}), global: true },
    DatabaseModule,
    ClientsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasicStrategy, AtStrategy, RtStrategy],
})
export class AppModule {}
