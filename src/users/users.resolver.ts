import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'prisma/prisma.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation('signup')
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation('updateUser')
  @UseGuards(JwtAuthGuard)
  update(
    @Context() context: any,
    @Args('updateUserInput') updateUserInput: Prisma.UserUpdateInput,
  ) {
    const { req: request } = context;
    const id: string = request.user.id;
    return this.usersService.update({ id }, updateUserInput);
  }

  @Mutation('activateUserAccount')
  activateUserAccount(@Args('activationToken') activationToken: string) {
    return this.usersService.activate({ activationToken });
  }

  @Mutation('forgotPassword')
  forgotPassword(@Args('email') email: string) {
    return this.usersService.forgotPassword(email);
  }

  @Mutation('resetPassword')
  resetPassword(
    @Args('token') token: string,
    @Args('password') password: string,
  ) {
    return this.usersService.resetPassword(token, password);
  }

  @Query('findByUsername')
  findByUsername(@Args('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @Query('me')
  @UseGuards(JwtAuthGuard)
  async me(@Context() context: any) {
    const { req: request } = context;
    const id: string = request.user.id;
    return await this.usersService.findOne({ id });
  }

  @ResolveField('patients')
  async patients(@Parent() user: User) {
    return this.prisma.patient.findMany({
      where: { userId: user.id },
    });
  }
}
