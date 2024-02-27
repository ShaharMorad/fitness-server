import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [UsersModule, WorkoutsModule],
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