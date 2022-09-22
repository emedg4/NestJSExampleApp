import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { isEmpty, isNumber } from 'class-validator';

@Injectable()
export class OrdenPipe implements PipeTransform <number>{
  transform(value: number, metadata: ArgumentMetadata): number {
    var val = value;

    if(isEmpty(value.toString().trim()) || isNaN(val) || (value.toString().length != 8 && value.toString().length != 18)) {
        throw new BadRequestException('Validation failed (numeric string is expected)');
      }

    return val;
  }

}
