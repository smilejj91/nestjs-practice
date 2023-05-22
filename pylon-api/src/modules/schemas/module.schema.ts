import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModuleInfoDocument = Document<ModuleInfo>;

const options: SchemaOptions = {
    timestamps: true,
    collection: 'modules',
    _id: true
  };

@Schema(options)
export class ModuleInfo {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  gitUrl: string;

  @Prop({ required: true })
  jenkinsUrl: string;
}

export const ModuleInfoSchema = SchemaFactory.createForClass(ModuleInfo);