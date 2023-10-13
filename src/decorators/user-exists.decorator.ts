import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from 'prisma/prisma.service';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule {
  constructor(private prisma: PrismaService) {}

  async validate(user: string) {
    const exists = await this.prisma.user.findUnique({
      where: { id: user },
    });

    return !!exists;
  }
  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
}
