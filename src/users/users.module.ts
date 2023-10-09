import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { PasswordUtils } from 'src/utils/password.utils';

@Module({
  providers: [PrismaService, PasswordUtils, UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
