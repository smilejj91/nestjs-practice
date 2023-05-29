import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDeployinfoDto {
  module_id: Types.ObjectId; // TODO: use intercept to change request

  readonly username: string;

  readonly started: string;

  readonly ended: string;

  readonly file_tag: string;

  @IsNotEmpty()
  readonly awx_job_id: string;

  readonly status: string;
}
