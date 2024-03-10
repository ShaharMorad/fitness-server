import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }

  isAlive(): boolean {
    return true;
  }

  isDBConnected(): boolean {
    return null;
  }
}
