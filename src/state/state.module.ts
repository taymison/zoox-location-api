import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { CityModule } from 'src/city/city.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([State]),
    forwardRef(() => CityModule),
    AuthModule,
  ],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService]
})
export class StateModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/state');
  }
}
