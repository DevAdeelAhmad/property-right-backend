import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Indicates if the operation was successful' })
  success: boolean;

  @ApiProperty({
    description: 'Response data when operation is successful',
    required: false,
  })
  data?: T;

  @ApiProperty({
    description: 'Error message when operation fails',
    required: false,
  })
  message?: string;

  @ApiProperty({ description: 'Additional error details', required: false })
  errors?: any[];

  constructor(success: boolean, data?: T, message?: string, errors?: any[]) {
    this.success = success;

    if (success && data) {
      this.data = data;
    }

    if (!success) {
      this.message = message;
      if (errors) {
        this.errors = errors;
      }
    }
  }

  static success<T>(data: T): ApiResponseDto<T> {
    return new ApiResponseDto<T>(true, data);
  }

  static error(message: string, errors?: any[]): ApiResponseDto<null> {
    return new ApiResponseDto<null>(false, null, message, errors);
  }
}
