import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DeployInfoDocument = HydratedDocument<DeployInfo>;

const options: SchemaOptions = {
  timestamps: true,
  collection: 'deployinfo',
  _id: true,
};

@Schema(options)
export class DeployInfo {
  @Prop({ required: true })
  module_id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  started: string;

  @Prop({ required: true })
  ended: string;

  @Prop({ required: true })
  file_tag: string;

  @Prop({ required: true })
  awx_job_id: string;

  @Prop({ required: true })
  status: string;
}

export const DeployInfoSchema = SchemaFactory.createForClass(DeployInfo);
