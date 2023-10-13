import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  IsUUID,
} from 'class-validator';
import { InsuredExists } from '../../decorators/insured-exists.decorator';

export class CreatePatientInput {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstname: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastname: string;

  @IsOptional()
  assured?: boolean;

  @ValidateIf((object, value) => object.assured === true) // Validate only if assured is true
  @IsUUID(4, { message: 'Insured ID must be a valid UUIDv4 format' }) // Check for UUID format
  @IsNotEmpty({ message: 'Insured Id is required' })
  @InsuredExists()
  insuredId: string;

  @ValidateIf((object, value) => object.assured === true) // Validate only if assured is true
  @IsNotEmpty({ message: 'Quality is required' })
  quality: Quality;
}

export enum Quality {
  HIMSELF,
  SPOUSE,
  SON,
  MOTHER,
  FATHER,
}
