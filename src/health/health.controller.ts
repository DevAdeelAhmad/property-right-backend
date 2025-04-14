import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check the API health' })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
    type: ApiResponseDto,
  })
  healthCheck(): ApiResponseDto<{ status: string }> {
    return ApiResponseDto.success({ status: 'healthy' });
  }
} 