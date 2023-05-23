import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModuleInfoDocument = HydratedDocument<ModuleInfo>;

const options: SchemaOptions = {
    timestamps: true,
    collection: 'modules',
    _id: true
  };

@Schema(options)
export class ModuleInfo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phase: string;

  @Prop({ required: true })
  gitUrl: string;

  @Prop({ required: true })
  jenkinsUrl: string;
}

export const ModuleInfoSchema = SchemaFactory.createForClass(ModuleInfo);