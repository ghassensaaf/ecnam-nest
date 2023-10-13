import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateInsuredInput {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstname: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastname: string;

  @IsString({ message: 'Insured Number must be a string' })
  @IsNotEmpty({ message: 'Insured Number is required' })
  @Matches(/^[0-9]{4,10}\/[0-9]{1,2}$/, {
    message:
      'Insured Number must be in the format "XXXXX/XX" where X is a digit',
  })
  insuredNumber: string;
}
