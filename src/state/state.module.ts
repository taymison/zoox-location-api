import { forwardRef, Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([State]),
    forwardRef(() => CityModule)
  ],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService]
})
export class StateModule {}
