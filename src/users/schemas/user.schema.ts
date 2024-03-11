import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {

    @Prop()
    _id: UUID;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    weight: number;

    @Prop()
    height: number;
    
    @Prop()
    username: string;

    @Prop()
    notifications: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
