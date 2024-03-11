import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppDal {
  constructor(@InjectConnection() private readonly connection: Connection) { }

  isDBConnected() {
    return this.connection.readyState === 1;
  }
}
