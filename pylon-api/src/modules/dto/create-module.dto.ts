export class CreateModuleDto {
    readonly name: string; // $phase-$appname
    readonly gitUrl: string;
    readonly jenkinsUrl: string;
}