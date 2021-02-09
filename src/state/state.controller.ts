import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../pipes/parse-object-id.pipe';
import { State } from './entities/state.entity';
import { ParseSortArgPipe } from 'src/pipes/parse-sort-arg.pipe';
import { ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('State')
@ApiSecurity('X-Api-Key')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiResponse({
    status: 201,
    description: 'Creates a state'
  })
  @Post()
  async create(@Body() createStateDto: CreateStateDto): Promise<State> {
    return await this.stateService.create(createStateDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieves states ordered ascending by name by default. They can be ordered descending as well and can be filtered by name.'
  })
  @ApiQuery({ name: 'sort', enum: ['ASC', 'DESC'], allowEmptyValue: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  async findAll(
    @Query('sort', ParseSortArgPipe) sort: 'ASC'|'DESC' = 'ASC',
    @Query('search') search?: string
  ): Promise<State[]> {
    return await this.stateService.findAll(sort, search);
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieves a state by id. The cities of the state can be attached to the response',
  })
  @ApiParam({ name: 'id', type: 'string', example: '602170c600a7c0d316b3b873', allowEmptyValue: false })
  @ApiQuery({ name: 'withCities', type: 'boolean', allowEmptyValue: false, enum: ['true', 'false'] })
  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: ObjectID,
    @Query('withCities', ParseBoolPipe) withCities: boolean
  ): Promise<State> {
    return await this.stateService.findOne(id, withCities);
  }

  @ApiResponse({
    status: 200,
    description: 'Updates a state'
  })
  @ApiParam({ name: 'id', type: 'string', example: '602170c600a7c0d316b3b873', allowEmptyValue: false })
  @Put(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: ObjectID, 
    @Body() updateStateDto: UpdateStateDto
  ): Promise<State> {
    return await this.stateService.update(id, updateStateDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Deletes a state and it cities'
  })
  @ApiParam({ name: 'id', type: 'string', example: '602170c600a7c0d316b3b873', allowEmptyValue: false })
  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectID): Promise<void> {
    return await this.stateService.remove(id);
  }
}
