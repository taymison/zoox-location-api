import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoManager, MongoEntityManager, Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { ObjectID } from 'mongodb';
import { State } from 'src/state/entities/state.entity';
import { StateService } from 'src/state/state.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @Inject(forwardRef(() => StateService))
    private readonly stateService: StateService
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const state: State = await this.stateService.findOne(createCityDto.stateId);

    if (state) {
      const city: City = new City();

      city.name = createCityDto.name;
      city.stateId = createCityDto.stateId;
      city.state = state;

      return await this.cityRepository.save(city);
    }
      
    throw new BadRequestException('"state" resource does not exist at the database');
  }

  async findAll(sort: 'ASC'|'DESC' = 'ASC', search?: string): Promise<City[]> {
    const mongoManager: MongoEntityManager = getMongoManager();

    return await mongoManager.find(City, {
      order: { name: sort },
      where: search ? { name: { $regex: `(?i)${search}` } } : {}
    });
  }

  async findOne(id: ObjectID, withState: boolean = false): Promise<City> {
    const city: City = await this.cityRepository.findOne(id);

    if (city && withState) {
      city.state = await this.stateService.findOne(city.stateId);
    }

    return city;
  }

  async findByStateId(stateId: ObjectID): Promise<City[]> {
    return await this.cityRepository.find({
      where: { "state.id": stateId }
    });
  }

  async update(id: ObjectID, updateCityDto: UpdateCityDto): Promise<City> {
    const city: City = await this.findOne(id);

    if (city) {
      city.name = updateCityDto.name;
      city.stateId = updateCityDto.stateId;
      city.state = await this.stateService.findOne(updateCityDto.stateId);

      return await this.cityRepository.save(city);
    }

    return null
  }

  async remove(id: ObjectID): Promise<void> {
    await this.cityRepository.delete(id);
  }

  async removeByStateId(stateId: ObjectID): Promise<void> {
    const cities: City[] = await this.findByStateId(stateId);

    await this.cityRepository.remove(cities);
  }
}
