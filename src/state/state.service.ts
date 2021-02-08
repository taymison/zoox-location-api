import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, MongoEntityManager, Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';
import { ObjectID } from 'mongodb';
import { CityService } from 'src/city/city.service';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @Inject(forwardRef(() => CityService))
    private readonly cityService: CityService
  ) {}

  async create(createStateDto: CreateStateDto): Promise<State> {
    return await this.stateRepository.save(createStateDto);
  }

  async findAll(sort: 'ASC'|'DESC' = 'ASC', search?: string): Promise<State[]> {
    const mongoManager: MongoEntityManager = getMongoManager();

    return await mongoManager.find(State, { 
      order: { name : sort },
      where: search ? { name: { $regex: `(?i)${search}` } }: {}
    });
  }

  async findOne(id: ObjectID, withCities: boolean = false): Promise<State> {
    const state: State = await this.stateRepository.findOne(id);

    if (withCities && state) {
      state.cities = await this.cityService.findByStateId(id);
    }

    return state;
  }

  async update(id: ObjectID, updateStateDto: UpdateStateDto): Promise<State> {
    const state: State = await this.findOne(id);

    if (state) {
      state.name = updateStateDto.name;
      state.initials = updateStateDto.initials;

      return await this.stateRepository.save(state);
    }

    return null;
  }

  async remove(id: ObjectID): Promise<void> {
    await this.cityService.removeByStateId(id);
    await this.stateRepository.delete(id);
  }
}
