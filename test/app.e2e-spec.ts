import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });


  it('full cycle', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: "shahar",
        lastName: "morad",
        password: "123456",
        email: "shah@gmail.com"
      })
      .expect(201)
    const userId = createUserResponse.body.id;
    expect(userId).toBeDefined();

    const getUserResponse = await request(app.getHttpServer())
      .get('/users/' + userId)
      .expect(200);
    expect(getUserResponse.body.id).toBe(userId);

    const updateUserResponse = await request(app.getHttpServer())
      .patch('/users/' + userId)
      .send({
        email: "new@gmail.com"
      })
      .expect(200);
    expect(updateUserResponse.body.email).toBe("new@gmail.com");

    await request(app.getHttpServer())
      .delete('/users/' + userId)
      .expect(200);

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });
});
