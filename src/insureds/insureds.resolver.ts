import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InsuredsService } from './insureds.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateInsuredInput } from './dto/create-insured.input';
import { UpdateInsuredInput } from './dto/update-insured.input';
import { Insured } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Resolver('Insured')
export class InsuredsResolver {
  constructor(
    private readonly insuredsService: InsuredsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('createInsured')
  @UseGuards(JwtAuthGuard)
  create(
    @Context() context: any,
    @Args('createInsuredInput') createInsuredInput: CreateInsuredInput,
  ) {
    const { req: request } = context;
    const userId: string = request.user.id;
    return this.insuredsService.create(userId, createInsuredInput);
  }

  @Mutation('updateInsured')
  update(@Args('updateInsuredInput') updateInsuredInput: UpdateInsuredInput) {
    return this.insuredsService.update(
      updateInsuredInput.id,
      updateInsuredInput,
    );
  }

  @Mutation('removeInsured')
  remove(@Args('id') id: string) {
    return this.insuredsService.remove(id);
  }

  @ResolveField('user')
  async user(@Parent() insured: Insured) {
    if (insured.userId)
      return this.prisma.user.findUnique({
        where: { id: insured.userId },
      });
  }

  @ResolveField('patients')
  async patients(@Parent() insured: Insured) {
    return this.prisma.patient.findMany({
      where: { insuredId: insured.id },
    });
  }
}
