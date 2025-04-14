import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Property } from '../src/properties/entities/property.entity';

describe('PropertiesController (e2e)', () => {
  let app: INestApplication;
  
  const mockPropertiesRepository = {
    create: jest.fn().mockImplementation(dto => ({
      id: Date.now(),
      ...dto,
      createdAt: new Date(),
    })),
    save: jest.fn().mockImplementation(property => Promise.resolve(property)),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Property))
      .useValue(mockPropertiesRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/properties (POST) - should create a property with valid input', () => {
    return request(app.getHttpServer())
      .post('/api/properties')
      .send({ propertyName: 'Test Property' })
      .expect(201)
      .expect(res => {
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.propertyName).toBe('Test Property');
      });
  });

  it('/api/properties (POST) - should return validation error for short property name', () => {
    return request(app.getHttpServer())
      .post('/api/properties')
      .send({ propertyName: 'T' }) // Less than 2 characters
      .expect(400)
      .expect(res => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBeDefined();
      });
  });
}); 