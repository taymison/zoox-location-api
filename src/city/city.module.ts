import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { StateModule } from 'src/state/state.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    forwardRef(() => StateModule),
    AuthModule,
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/city');
  }
}
