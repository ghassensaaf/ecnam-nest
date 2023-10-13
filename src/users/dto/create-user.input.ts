import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Matches,
} from 'class-validator';

export class CreateUserInput {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstname: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastname: string;

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        'Password must be between 8 and 20 characters and contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character',
    },
  )
  password: string;

  @IsString({ message: 'Phone must be a string' })
  @Matches(/^(\+\d{1,3}\s?)?(\d{8,10})$/, {
    message:
      'Invalid phone number format. Valid formats: +XX 1234567890 or 1234567890',
  })
  phone: string;

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  @Matches(/^[a-zA-Z0-9\s\-,.]+,\s[a-zA-Z\s]+\s\d{4},\s[a-zA-Z\s]+$/, {
    message:
      'Address must be in the format "street address, city zip, country"',
  })
  address: string;

  @IsString({ message: 'CNAM code must be a string' })
  @IsNotEmpty({ message: 'CNAM code is required' })
  @Matches(/^[0-9]{1,2}\/[0-9]{1,8}\/[0-9]{1,2}$/, {
    message: 'CNAM code must be in the format "XX/XXXX/XX" where X is a digit',
  })
  cnamCode: string;

  @IsString({ message: 'Bank must be a string' })
  @IsNotEmpty({ message: 'Bank is required' })
  bank: string;

  @IsString({ message: 'ID number must be a string' })
  @IsNotEmpty({ message: 'ID number is required' })
  @Matches(/^[0-9]{8}$/, {
    message: 'CIN must consist of 8 numeric digits',
  })
  idNumber: string;

  @IsNumber({}, { message: 'Prest code must be a number' })
  prestCode: number;

  @IsString({ message: 'Reference center must be a string' })
  refCenter: string;

  @IsString({ message: 'RIB must be a string' })
  @Matches(/^[0-9]{12,22}$/, {
    message: 'RIB must consist of 12 to 22 numeric digits',
  })
  rib: string;

  @IsString({ message: 'Tax ID must be a string' })
  taxId: string;
}
