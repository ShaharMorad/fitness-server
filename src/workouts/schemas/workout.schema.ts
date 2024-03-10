import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { Exercise } from '../../exercises/schemas/exercise.schema';
import { User } from '../../users/schemas/user.schema';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema({versionKey:false})
export class Workout {

  @Prop()
  _id: UUID;

  @Prop()
  userId: UUID;

  @Prop()
  date: Date;

  @Prop({ type: [Exercise] })
  exercises: Exercise[];

}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
