import { IsNotEmpty } from 'class-validator';

export class CreateModuleDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly phase: string;

    @IsNotEmpty()
    readonly gitUrl: string;

    @IsNotEmpty()
    readonly jenkinsUrl: string;
}