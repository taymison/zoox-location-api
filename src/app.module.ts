import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { State } from './state/entities/state.entity';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { City } from './city/entities/city.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_STRING_CONN,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [State, City],
    }),
    CacheModule.register(),
    CityModule,
    StateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
