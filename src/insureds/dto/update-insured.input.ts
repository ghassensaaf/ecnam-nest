import { CreateInsuredInput } from './create-insured.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInsuredInput extends PartialType(CreateInsuredInput) {
  id: string;
}
