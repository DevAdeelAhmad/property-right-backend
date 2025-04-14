import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { Property } from './entities/property.entity';

@ApiTags('properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({
    status: 201,
    description: 'The property has been successfully created',
    type: ApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
    type: ApiResponseDto,
  })
  async create(@Body() createPropertyDto: CreatePropertyDto): Promise<ApiResponseDto<Property | null>> {
    try {
      const property = await this.propertiesService.create(createPropertyDto);
      return ApiResponseDto.success(property);
    } catch (error) {
      return ApiResponseDto.error('Failed to create property', [error.message]);
    }
  }
} 