import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {

  @Prop()
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  date: Date;

  @Prop([raw({ name: { type: String } })])
  exercises: { name: string }[];

}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
