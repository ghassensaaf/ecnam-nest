import { Module } from '@nestjs/common';
import { InsuredsService } from './insureds.service';
import { InsuredsResolver } from './insureds.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [InsuredsResolver, InsuredsService, PrismaService],
  exports: [InsuredsService],
})
export class InsuredsModule {}
