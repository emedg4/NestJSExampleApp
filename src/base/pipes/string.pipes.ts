import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { isEmpty } from 'class-validator';

@Injectable()
export class StringPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    const val = value.trim();
    if(isEmpty(val)) {
      throw new BadRequestException('Validation failed (numeric string is expected)');
    }
    return val;
  }
}