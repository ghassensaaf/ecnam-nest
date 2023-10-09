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

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.usersService.findOne(id);
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

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.usersService.remove(id);
  }
}
