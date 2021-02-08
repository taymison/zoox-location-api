import { forwardRef, Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]), 
    forwardRef(() => StateModule)
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule {}
