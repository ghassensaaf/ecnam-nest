import {
  Query,
  Context,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePatientInput } from './dto/create-patient.input';
import { Patient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Resolver('Patient')
export class PatientsResolver {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('createPatient')
  @UseGuards(JwtAuthGuard)
  async createPatient(
    @Args('createPatientInput')
    createPatientInput: CreatePatientInput,
    @Context() context: any,
  ) {
    const { req: request } = context;
    const userId: string = request.user.id;
    return this.patientsService.createPatient(userId, createPatientInput);
  }

  @Query('userPatients')
  @UseGuards(JwtAuthGuard)
  async userPatients(@Context() context: any) {
    const { req: request } = context;
    const id: string = request.user.id;
    return this.patientsService.userPatients(id);
  }

  @ResolveField('insured')
  async insured(@Parent() patient: Patient) {
    if (patient.insuredId)
      return this.prisma.insured.findUnique({
        where: { id: patient.insuredId },
      });
  }

  @ResolveField('user')
  async user(@Parent() patient: Patient) {
    if (patient.userId)
      return this.prisma.user.findUnique({
        where: { id: patient.userId },
      });
  }
}
