import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePatientInput } from './dto/create-patient.input';
import { InsuredsService } from '../insureds/insureds.service';
@Injectable()
export class PatientsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly insuredsService: InsuredsService,
  ) {}

  async userPatients(userId: string) {
    try {
      const data = await this.prisma.patient.findMany({
        where: {
          userId,
        },
      });
      return data;
    } catch (error) {
      throw new error(error.message);
    }
  }

  async createPatient(userId: string, createPatientInput: CreatePatientInput) {
    try {
      // Map the GraphQL Quality enum to Prisma Quality type
      const qualityMapping = {
        HIMSELF: 'HIMSELF',
        SPOUSE: 'SPOUSE',
        SON: 'SON',
        MOTHER: 'MOTHER',
        FATHER: 'FATHER',
      };
      const prismaCreateInput = {
        ...createPatientInput,
        quality: qualityMapping[createPatientInput.quality],
        userId,
      };
      // if (prismaCreateInput.assured) {
      //   const insured = await this.insuredsService.findOne({
      //     id: prismaCreateInput.insuredId,
      //   });
      //   if (!insured) {
      //     return insured;
      //   }
      // }
      const createdPatient = await this.prisma.patient.create({
        data: prismaCreateInput,
      });
      return createdPatient;
    } catch (error) {
      throw new error(error.message);
    }
  }
}
