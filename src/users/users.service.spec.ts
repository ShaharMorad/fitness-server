import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const aUser = { email: 's@s.s', password: '', lastName: 'm', firstName: 's' };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get all', () => {
    it('should return empty users array', async () => {
      expect(service.getAll()).toHaveLength(0);
    })


    it('should return 2 different users array', async () => {
      const { id: id1 } = service.create(aUser);
      const { id: id2 } = service.create(aUser);
      const ids = service.getAll().map(({ id }) => (id));
      expect(ids).toHaveLength(2);
      expect(ids).toContain(id1);
      expect(ids).toContain(id2);
      expect(id1).not.toEqual(id2);

    })
  })
  // service.create()
  // service.getAll()
  // service.getById()
  // service.remove()
  // service.update()
});
