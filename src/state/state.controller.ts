import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../pipes/parse-object-id.pipe';
import { State } from './entities/state.entity';
import { ParseSortArgPipe } from 'src/pipes/parse-sort-arg.pipe';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  async create(@Body() createStateDto: CreateStateDto): Promise<State> {
    return await this.stateService.create(createStateDto);
  }

  @Get()
  async findAll(
    @Query('sort', ParseSortArgPipe) sort: 'ASC'|'DESC' = 'ASC',
    @Query('search') search?: string
  ): Promise<State[]> {
    return await this.stateService.findAll(sort, search);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: ObjectID,
    @Query('withCities', ParseBoolPipe) withCities: boolean
  ): Promise<State> {
    return await this.stateService.findOne(id, withCities);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: ObjectID, 
    @Body() updateStateDto: UpdateStateDto
  ): Promise<State> {
    return await this.stateService.update(id, updateStateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<void> {
    return await this.stateService.remove(id);
  }
}
