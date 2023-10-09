import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserInput } from 'src/graphql';
import { PasswordUtils } from 'src/utils/password.utils';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordUtils: PasswordUtils,
  ) {}

  async create(createUserInput: Prisma.UserCreateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          ...createUserInput,
          activationTokenExp: tomorrow,
          password: await this.passwordUtils.hash(createUserInput.password),
          permissions: ['user', 'kine'],
        },
      });
      return createdUser;
    } catch (error) {
      // Handle the error here, for example:
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // This error is specific to Prisma and might contain more information
        // You can log it or handle it as needed
        console.error('Prisma error:', error.message);
        throw new Error('An error occurred while creating the user.');
      } else {
        // Handle other types of errors (e.g., database connection errors)
        console.error('Unknown error:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
      });
      return user;
    } catch (error) {
      throw error; // Re-throw the original error
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: {
          username: username,
          permissions: { has: 'user' },
        },
      });
    } catch (error) {
      throw error; // Re-throw the original error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    updateUserInput: Prisma.UserUpdateInput,
  ) {
    return `This action updates a  user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  isAdmin(permissions: string[]): boolean {
    return permissions.includes('admin');
  }
}
