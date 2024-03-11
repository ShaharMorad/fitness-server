import { Injectable } from '@nestjs/common';
import { AppDal } from './app.dal';

@Injectable()
export class AppService {
  constructor(private appDal: AppDal) { }

  getHello(): string {
    return 'Hello World!';
  }

  isAlive(): boolean {
    return true;
  }

  isDBConnected(): boolean {
    return this.appDal.isDBConnected();
  }
}
