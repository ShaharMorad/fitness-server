import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { createUserDto } from './constant';
import { UUID } from 'crypto';

export const database = process.env.MONGO_URI_TEST;

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userId: UUID;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(database), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET) - empty', async () => {
    return await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });

  it('/users (GET) - not exist user', async () => {
    return await request(app.getHttpServer())
      .get('/users/2ff3652a-0000-40c9-9c4d-ca2b2da9afdf')
      .expect(500); // the fuck
  });

  it('/users (POST) - create', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
    userId = createUserResponse.body._id;
    expect(userId).toBeDefined();
  });

  it('/users (GET) - exist user', async () => {
    const getUserResponse = await request(app.getHttpServer())
      .get('/users/' + userId)
      .expect(200);
    expect(getUserResponse.body._id).toBe(userId);
  });

  it('/users (PATCH) - update user', async () => {
    const email = "new@gmail.com"
    const updateUserResponse = await request(app.getHttpServer())
      .patch('/users/' + userId)
      .send({ email })
      .expect(200);
    expect(updateUserResponse.body.email).toBe(email);
  });

  it('/users (DELETE) - delete user', async () => {
    await request(app.getHttpServer())
      .delete('/users/' + userId)
      .expect(200);
  });

  it('/users (GET) - user no longer exist', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });
});
