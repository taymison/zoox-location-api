import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ObjectID } from 'mongodb';
import { ParseSortArgPipe } from 'src/pipes/parse-sort-arg.pipe';
import { City } from './entities/city.entity';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiResponse({
    status: 201,
    description: 'Creates a city'
  })
  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return await this.cityService.create(createCityDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieves cities ordered ascending by name by default. They can be ordered descending as well and can be filtered by name.'
  })
  @ApiQuery({ name: 'sort', enum: ['ASC', 'DESC'], allowEmptyValue: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  async findAll(
    @Query('sort', ParseSortArgPipe) sort: 'ASC'|'DESC' = 'ASC',
    @Query('search') search?: string
  ): Promise<City[]> {
    return await this.cityService.findAll(sort, search);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieves a city by id. The state of the city can be attached to the response',
  })
  @ApiParam({ name: 'id', type: 'string', example: '602184bed8fe93e3cce9aeae', allowEmptyValue: false })
  @ApiQuery({ name: 'withState', type: 'boolean', allowEmptyValue: false, enum: ['true', 'false'] })
  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: ObjectID,
    @Query('withState', ParseBoolPipe) withState: boolean
  ): Promise<City> {
    return await this.cityService.findOne(id, withState);
  }

  @ApiResponse({
    status: 200,
    description: 'Updates a city'
  })
  @ApiParam({ name: 'id', type: 'string', example: '602184bed8fe93e3cce9aeae', allowEmptyValue: false })
  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: ObjectID, 
    @Body() updateCityDto: UpdateCityDto
  ): Promise<City> {
    return await this.cityService.update(id, updateCityDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Deletes a city'
  })
  @ApiParam({ name: 'id', type: 'string', example: '602184bed8fe93e3cce9aeae', allowEmptyValue: false })
  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<void> {
    return await this.cityService.remove(id);
  }
}
