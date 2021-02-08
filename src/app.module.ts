import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { State } from './state/entities/state.entity';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { City } from './city/entities/city.entity';

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
    CityModule,
    StateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
