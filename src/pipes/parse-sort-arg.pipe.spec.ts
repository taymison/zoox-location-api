import { BadRequestException } from '@nestjs/common';
import { ParseSortArgPipe } from './parse-sort-arg.pipe';

describe('ParseSortArgPipe', () => {
  it('should be defined', () => {
    expect(new ParseSortArgPipe()).toBeDefined();
  });

  it('should to transform asc in ASC', () => {
    expect(new ParseSortArgPipe().transform('asc')).toEqual('ASC')
  });

  it('should to transform asc in ASC', () => {
    expect(new ParseSortArgPipe().transform('desc')).toEqual('DESC')
  });

  it('should throw a exception when receives an invalid argument', () => {
    try {
      new ParseSortArgPipe().transform('xpto');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
