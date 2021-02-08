import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseSortArgPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valueTrimmedUppercased: string = value?.trim()?.toUpperCase();

    if (valueTrimmedUppercased && valueTrimmedUppercased !== 'ASC' && valueTrimmedUppercased !== 'DESC') {
      throw new BadRequestException('Validation failed (ASC or DESC is expected)');
    }

    return valueTrimmedUppercased;
  }
}
