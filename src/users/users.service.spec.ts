import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../app.module';
import mongoose from 'mongoose';
import { UserNotFoundException } from './userNotFound.exception';

export const database = process.env.MONGO_URI_TEST;

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('UsersService', () => {
  let service: UsersService;
  const aUser = { email: 's@s.s', password: '', lastName: 'm', firstName: 's' };
  let uid1;
  let uid2;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(database), AppModule],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  describe('get all', () => {
    it('should return empty users array', async () => {
      expect(await service.getAll()).toHaveLength(0);
    })

    it('should create 2 different users', async () => {
      uid1 = (await service.create(aUser))._id;
      uid2 = (await service.create(aUser))._id;
      expect(uid1).not.toEqual(uid2);
    })

    it('should return array with 2 different users', async () => {
      const ids = (await service.getAll()).map(({ _id }) => (_id));
      expect(ids).toHaveLength(2);
      expect(ids).toContain(uid1);
      expect(ids).toContain(uid2);
    })
  })

  describe('update', () => {
    it('should update the specific user', async () => {
      // @ts-ignore
      await service.update(uid1, { password: 'newPassword', weight: 55 })
      const { weight, password } = await service.getById(uid1)
      expect({ weight, password }).toEqual({ password: 'newPassword', weight: 55 });

      const { weight: weight2, password: password2 } = await service.getById(uid2);
      expect(weight2).not.toBeDefined();
      expect(password2).toEqual(aUser.password)
    })
  })

  describe('delete', () => {
    it('should delete the specific user', async () => {
      await service.remove(uid1)
      expect(await service.getById(uid2)).toBeDefined();

      try {
        expect(await service.getById(uid1)).toThrow();
      }
      catch (err) {
        expect(err.name).toEqual(UserNotFoundException.name);
      }
    })
  })
});
