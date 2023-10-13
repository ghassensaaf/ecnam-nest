import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsResolver } from './patients.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { InsuredsModule } from 'src/insureds/insureds.module';
import { InsuredExistsRule } from '../decorators/insured-exists.decorator';

@Module({
  imports: [InsuredsModule],
  providers: [
    PatientsResolver,
    PatientsService,
    PrismaService,
    InsuredExistsRule,
  ],
})
export class PatientsModule {}
