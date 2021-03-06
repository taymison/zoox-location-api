import { BadRequestException } from '@nestjs/common/exceptions';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from './parse-object-id.pipe';

describe('ParseObjectIdPipe', () => {
  it('should to transform a string in an ObjectID', () => {
    expect(new ParseObjectIdPipe().transform('601c7744279fa9f90eea3bb8')).toBeInstanceOf(ObjectID);
  });

  it('should throw a exception after an invalid ObjectID received', () => {
    try {
      new ParseObjectIdPipe().transform('621c7744279fa9f92eea3bb*')
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
