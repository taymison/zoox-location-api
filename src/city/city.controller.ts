import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ObjectID } from 'mongodb';
import { ParseSortArgPipe } from 'src/pipes/parse-sort-arg.pipe';
import { City } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return await this.cityService.create(createCityDto);
  }

  @Get()
  async findAll(
    @Query('sort', ParseSortArgPipe) sort: 'ASC'|'DESC' = 'ASC',
    @Query('search') search?: string
  ): Promise<City[]> {
    return await this.cityService.findAll(sort, search);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: ObjectID,
    @Query('withState', ParseBoolPipe) withState: boolean
  ): Promise<City> {
    return await this.cityService.findOne(id, withState);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: ObjectID, 
    @Body() updateCityDto: UpdateCityDto
  ): Promise<City> {
    return await this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<void> {
    return await this.cityService.remove(id);
  }
}
