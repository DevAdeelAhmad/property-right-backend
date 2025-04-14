import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the property' })
  id: number;

  @Column({ name: 'property_name', nullable: false })
  @ApiProperty({ description: 'The name of the property' })
  propertyName: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  @ApiProperty({ description: 'The creation timestamp of the property' })
  createdAt: Date;
} 