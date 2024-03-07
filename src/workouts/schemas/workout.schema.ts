import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type WorkoutDocument = HydratedDocument<Workout>;

@Schema()
export class Workout {

  @Prop()
  _id: UUID;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // userId: User;

  @Prop()
  userId: UUID;

  @Prop()
  date: Date;

  @Prop([raw({ name: { type: String } })])
  exercises: { name: string }[];

}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
