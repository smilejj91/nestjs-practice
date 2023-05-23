import { IsNotEmpty } from 'class-validator';

export class QueryModuleDto {
    readonly name: string;
    readonly phase: string;
}