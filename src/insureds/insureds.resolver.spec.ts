import { Test, TestingModule } from '@nestjs/testing';
import { InsuredsResolver } from './insureds.resolver';
import { InsuredsService } from './insureds.service';

describe('InsuredsResolver', () => {
  let resolver: InsuredsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuredsResolver, InsuredsService],
    }).compile();

    resolver = module.get<InsuredsResolver>(InsuredsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
