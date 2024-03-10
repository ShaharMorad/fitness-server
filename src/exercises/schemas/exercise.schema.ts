import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Exercise>;

@Schema({ versionKey: false })
export class Exercise {

  @Prop()
  _id: UUID;

  @Prop()
  name: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
