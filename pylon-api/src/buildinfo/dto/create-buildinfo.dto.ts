import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBuildinfoDto {
  module_id: Types.ObjectId; // TODO: use intercept to change request

  readonly username: string;

  readonly started: string;

  readonly ended: string;

  readonly vroom_workflow_id: string; // vroom_workflow_id can be null when sandbox build

  readonly pylon_version: string;

  readonly pylon_commit: string;

  @IsNotEmpty()
  readonly jenkins_jobname: string;

  @IsNotEmpty()
  readonly jenkins_buildnumber: string;

  readonly jenkins_console_output_url: string;

  readonly status: string; // success, failed, canceld, running

  readonly error_code: string;
}
