import { Test, TestingModule } from '@nestjs/testing';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { StateController } from './state.controller';
import { StateService } from './state.service';

describe('StateController', () => {
  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [StateService],
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
