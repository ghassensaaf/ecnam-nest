import { Injectable } from '@nestjs/common';
import { CreateInsuredInput } from './dto/create-insured.input';
import { UpdateInsuredInput } from './dto/update-insured.input';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InsuredsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, createInsuredInput: CreateInsuredInput) {
    try {
      const createdInsured = await this.prisma.insured.create({
        data: { ...createInsuredInput, userId },
      });
      return createdInsured;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // findOne(insuredUniqueInput: Prisma.InsuredWhereUniqueInput) {
  //   try {
  //     return this.prisma.insured.findUnique({
  //       where: insuredUniqueInput,
  //     });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  update(id: string, updateInsuredInput: UpdateInsuredInput) {
    return `This action updates a #${id} insured`;
  }

  remove(id: string) {
    return `This action removes a #${id} insured`;
  }
}
