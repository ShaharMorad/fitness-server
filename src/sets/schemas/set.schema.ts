import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';

export type SetDocument = HydratedDocument<Set>;

@Schema({ versionKey: false })
export class Set {

  @Prop()
  _id: UUID;

  @Prop()
  exerciseId: UUID;

  @Prop()
  order: number;

  @Prop()
  weight: number;
  
  @Prop()
  repetition: number;
  
  @Prop()
  effortDuration: number;
  
  @Prop()
  restDuration: number;
}


export const SetSchema = SchemaFactory.createForClass(Set);
