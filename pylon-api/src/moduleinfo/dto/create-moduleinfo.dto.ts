import { IsNotEmpty } from 'class-validator';

export class CreateModuleinfoDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly phase: string;

  @IsNotEmpty()
  readonly gitUrl: string;

  @IsNotEmpty()
  readonly jenkinsUrl: string;
}
