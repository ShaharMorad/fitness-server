import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../app.module';

export const database = process.env.MONGO_URI_TEST;

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('UsersController', () => {
  let usersController: UsersController;
  const aUser = { email: 's@s.s', password: '', lastName: 'm', firstName: 's' };
  let uid;


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(database), AppModule],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('get all users', () => {
    it('should return an empty array', async () => {
      expect(await usersController.getAll()).toHaveLength(0);
    });

    it('should return an array with the created user', async () => {
      uid = (await usersController.create(aUser))._id;
      const users = await usersController.getAll();
      const { email, firstName, lastName, password, _id } = users[0];

      expect(users).toHaveLength(1);
      expect({ email, firstName, lastName, password, _id }).toEqual({ ...aUser, _id: uid });
    });
  });

  describe('update user', () => {
    it('should update only the fields', async () => {
      // @ts-ignore
      const { email, firstName, lastName, password, _id, weight, height } = await usersController.update(uid, {
        weight: 500,
        height: 10,
      })
      expect({ email, firstName, lastName, password, _id, weight, height }).toStrictEqual({ ...aUser, _id: uid, weight: 500, height: 10, });
    });
  });

  describe('remove user', () => {
    it('should remove only the specified user', async () => {
      const { _id: idToRemove } = await usersController.create({ ...aUser, firstName: 'to remove' });

      expect(await usersController.getAll()).toHaveLength(2);
      usersController.remove(idToRemove);
      const allUsers = await usersController.getAll();
      expect(allUsers).toHaveLength(1);
      expect(allUsers[0].firstName).not.toBe('to remove');
    });
  });
});