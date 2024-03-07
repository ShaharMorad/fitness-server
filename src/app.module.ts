import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { WorkoutsModule } from './workouts/workouts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, WorkoutsModule, MongooseModule.forRoot('mongodb+srv://shahar13239:shahar13239@cluster0.durt1mv.mongodb.net/fitness')],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule /*implements NestModule*/ {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes('*');
  // }
}