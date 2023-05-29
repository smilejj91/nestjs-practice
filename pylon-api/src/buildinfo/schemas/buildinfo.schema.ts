import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BuildInfoDocument = HydratedDocument<BuildInfo>;

const options: SchemaOptions = {
  timestamps: true,
  collection: 'buildinfo',
  _id: true,
};

@Schema(options)
export class BuildInfo {
  @Prop({ required: true })
  module_id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  started: string;

  @Prop({ required: true })
  ended: string;

  @Prop({ required: true })
  vroom_workflow_id: string;

  @Prop({ required: true })
  pylon_version: string;

  @Prop({ required: true })
  pylon_commit: string;

  @Prop({ required: true })
  jenkins_jobname: string;

  @Prop({ required: true })
  jenkins_buildnumber: string;

  @Prop({ required: true })
  jenkins_console_output_url: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  error_code: string;
}

export const BuildInfoSchema = SchemaFactory.createForClass(BuildInfo);
