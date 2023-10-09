import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { PasswordUtils } from 'src/utils/password.utils';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: () => {
        const options: JwtModuleOptions = {
          secret: 'secret',
        };
        options.signOptions = {
          expiresIn: 1e22,
        };
        return options;
      },
    }),
    forwardRef(() => UsersModule),
    UsersModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    PrismaService,
    PasswordUtils,
  ],
  exports: [AuthService],
})
export class AuthModule {}
