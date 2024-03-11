import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { createExerciseDto, createSetDto, createUserDto, createWorkoutDto } from './constant';
import { UUID } from 'crypto';

export const database = process.env.MONGO_URI_TEST;

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('General good (e2e)', () => {
  let app: INestApplication;
  let uid: UUID;
  let wid: UUID;
  let eid: UUID;
  let sid: UUID;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(database), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST) - create', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201)
    uid = createUserResponse.body._id;
    expect(uid).toBeDefined();
  });

  it('/users (GET) - exist user', async () => {
    const getUserResponse = await request(app.getHttpServer())
      .get('/users/' + uid)
      .expect(200);
    expect(getUserResponse.body._id).toBe(uid);
  });

  it('/users/workouts (POST) - create', async () => {
    const createWorkoutResponse = await request(app.getHttpServer())
      .post(`/users/${uid}/workouts`)
      .send(createWorkoutDto)
      .expect(201)
    wid = createWorkoutResponse.body[0]._id;
    expect(wid).toBeDefined();
  });

  it('/users/workouts (GET) - exist workout', async () => {
    const getWorkoutResponse = await request(app.getHttpServer())
      .get(`/users/${uid}/workouts/${wid}`)
      .expect(200);
    expect(getWorkoutResponse.body._id).toBe(wid);
  });

  it('/users/workouts/exercises (POST) - create', async () => {
    const createExerciseResponse = await request(app.getHttpServer())
      .post(`/users/${uid}/workouts/${wid}/exercises`)
      .send(createExerciseDto)
      .expect(201);

    eid = createExerciseResponse.body.exercises[0]._id;
    expect(eid).toBeDefined();
  });

  it('/users/workouts/exercises (GET) - exist exercise', async () => {
    const getExerciseResponse = await request(app.getHttpServer())
      .get(`/users/${uid}/workouts/${wid}/exercises/${eid}`)
    expect(getExerciseResponse.body.exercises[0]._id).toBe(eid);
  });

  it('/users/workouts/exercises/sets (POST) - create', async () => {
    const createSetResponse = await request(app.getHttpServer())
      .post(`/users/${uid}/workouts/${wid}/exercises/${eid}/sets`)
      .send(createSetDto)
      .expect(201);

    sid = createSetResponse.body._id;
    expect(sid).toBeDefined();

    await request(app.getHttpServer())
      .post(`/users/${uid}/workouts/${wid}/exercises/${eid}/sets`)
      .send({ ...createSetDto, order: 3 })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/users/${uid}/workouts/${wid}/exercises/${eid}/sets`)
      .send({ ...createSetDto, order: 2 })
      .expect(201);
  });

  it('/users/workouts/exercises/sets (GET) - exist set', async () => {
    const getSetResponse = await request(app.getHttpServer())
      .get(`/users/${uid}/workouts/${wid}/exercises/${eid}/sets/${sid}`)
      .expect(200);
    expect(getSetResponse.body._id).toBe(sid);
  });

  it('/users/workouts/full (GET)', async () => {
    const allWorkoutRespons = (await request(app.getHttpServer())
      .get(`/users/${uid}/workouts/${wid}/full`)
      .expect(200)).body
    const sets = allWorkoutRespons.exercises[0].sets;

    expect(allWorkoutRespons).toBeDefined();
    expect(new Date(allWorkoutRespons.date)).toEqual(createWorkoutDto.date);
    expect(allWorkoutRespons.exercises).toHaveLength(1);
    expect(sets).toHaveLength(3);
    expect(allWorkoutRespons.exercises[0].name).toEqual(createExerciseDto.name);
    expect([sets[0].order, sets[1].order, sets[2].order]).toEqual([1, 2, 3]);
    expect(sets[0].repetition).toEqual(createSetDto.repetition);
  });
});
