import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertiesService } from './properties.service';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';

const mockProperty = {
  id: 1,
  propertyName: 'Test Property',
  createdAt: new Date(),
};

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: Repository<Property>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            create: jest.fn().mockReturnValue(mockProperty),
            save: jest.fn().mockResolvedValue(mockProperty),
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    repository = module.get<Repository<Property>>(getRepositoryToken(Property));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        propertyName: 'Test Property',
      };

      const result = await service.create(createPropertyDto);

      expect(repository.create).toHaveBeenCalledWith({
        propertyName: 'Test Property',
      });
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(mockProperty);
    });
  });
}); 