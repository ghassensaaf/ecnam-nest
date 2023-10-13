import { Test, TestingModule } from '@nestjs/testing';
import { InsuredsService } from './insureds.service';

describe('InsuredsService', () => {
  let service: InsuredsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuredsService],
    }).compile();

    service = module.get<InsuredsService>(InsuredsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
