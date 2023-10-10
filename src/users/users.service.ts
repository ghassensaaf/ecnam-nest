import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UpdatePasswordInput } from 'src/graphql';
import { PasswordUtils } from 'src/utils/password.utils';
import { v4 as uuid } from 'uuid';

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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          error.code === 'P2002' &&
          typeof error.meta.target === 'string' &&
          error.meta.target.includes('email')
        ) {
          // This error code 'P2002' indicates a unique constraint violation.
          throw new Error(
            'Email is already in use. Please choose a different email.',
          );
        } else {
          // Handle other Prisma-specific errors here if needed.
          console.error('Prisma error:', error.message);
          throw new Error('An error occurred while creating the user.');
        }
      } else {
        // Handle other types of errors (e.g., database connection errors)
        console.error('Unknown error:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  }

  findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    try {
      return this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      throw new Error(error.message);
    }
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

  async update(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    updateUserInput: Prisma.UserUpdateInput,
  ) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: userWhereUniqueInput,
        data: updateUserInput,
      });
      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error:', error.message);
        throw new Error('An error occurred while creating the user.');
      } else {
        console.error('Unknown error:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  }

  isAdmin(permissions: string[]): boolean {
    return permissions.includes('admin');
  }

  async forgotPassword(email: string): Promise<User | undefined> {
    const user = await this.findOneByEmail(email);

    if (!user) throw new Error('user not found');

    const token = uuid();
    const tokenExp = new Date();
    tokenExp.setHours(new Date().getHours() + 1);

    const nUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordReset: token,
        passwordResetExp: tokenExp,
        updatedAt: new Date(),
      },
    });

    return nUser;
  }

  async activate(
    uniqueUser: Prisma.UserWhereUniqueInput,
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: uniqueUser,
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isActive) {
      throw new Error('User is already activated');
    }

    const now = new Date();

    if (now > user.activationTokenExp) {
      // Regenerate token and send a new email here
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          activationToken: uuid(),
          activationTokenExp: tomorrow,
        },
      });

      throw new Error(
        'Activation token expired. A new one has been generated and sent to your email. Please check your inbox.',
      );
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async resetPassword(
    token: string,
    password: string,
  ): Promise<User | undefined> {
    const now = new Date();
    const user = await this.prisma.user.findFirst({
      where: {
        passwordReset: token,
      },
    });

    if (!user) throw new Error('invalid token');
    if (user.passwordResetExp < now) throw new Error('token expired');

    return this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordReset: null,
        passwordResetExp: null,
        password: await this.passwordUtils.hash(password),
      },
    });
  }

  async updatePassword(
    userId: string,
    updatePasswordInput: UpdatePasswordInput,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      const confirmPW = await this.passwordUtils.compare(
        updatePasswordInput.oldPassword,
        user.password,
      );
      if (confirmPW) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            password: await this.passwordUtils.hash(
              updatePasswordInput.password,
            ),
          },
        });
        return 'success';
      } else return 'old password mismatch';
    } else return 'user not found';
  }
}
