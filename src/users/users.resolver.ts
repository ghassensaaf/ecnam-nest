import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('signup')
  signup(@Args('createUserInput') createUserInput: Prisma.UserCreateInput) {
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
}
