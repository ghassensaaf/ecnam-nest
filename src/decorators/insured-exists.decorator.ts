import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from 'prisma/prisma.service';

@ValidatorConstraint({ name: 'InsuredExists', async: true })
@Injectable()
export class InsuredExistsRule {
  constructor(private prisma: PrismaService) {}

  async validate(insuredId: string) {
    const exists = await this.prisma.insured.findUnique({
      where: { id: insuredId },
    });

    return !!exists;
  }
  defaultMessage(args: ValidationArguments) {
    return `Insured doesn't exist`;
  }
}

export function InsuredExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'InsuredExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: InsuredExistsRule,
    });
  };
}
