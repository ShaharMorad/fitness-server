import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  const aUser = { email: 's@s.s', password: '', lastName: 'm', firstName: 's' };


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('get all users', () => {
    it('should return an empty array', async () => {
      expect(await usersController.getAll()).toHaveLength(0);
    });

    it('should return an array with one user', async () => {
      usersController.create(aUser);
      expect(await usersController.getAll()).toHaveLength(1);
    });

    it('should return an array with the created user', async () => {
      const { id } = usersController.create(aUser);
      const createdUser = usersController.getAll()[0]

      expect(createdUser).toStrictEqual({ ...aUser, id });
    });
  });

  describe('update user', () => {
    it('should update only the fields', async () => {
      const { id } = usersController.create(aUser);
      // @ts-ignore
      const updatedUser = usersController.update(id, {
        weight: 500,
        height: 10,
      })
      expect(updatedUser).toStrictEqual({ ...aUser, id, weight: 500, height: 10, });
    });
  });

  describe('remove user', () => {
    it('should remove only the specified user', async () => {
      const { id } = usersController.create(aUser);
      const { id: idToRemove } = usersController.create({ ...aUser, firstName: 'to remove' });

      expect(await usersController.getAll()).toHaveLength(2);
      usersController.remove(idToRemove);
      const allUsers = await usersController.getAll();
      expect(allUsers).toHaveLength(1);
      expect(allUsers[0].firstName).not.toBe('to remove');
    });
  });
});