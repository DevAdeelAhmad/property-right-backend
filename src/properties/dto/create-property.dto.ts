import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'The name of the property',
    example: 'Oceanview Villa',
    minLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Property name must be at least 2 characters long' })
  propertyName: string;
} 