import { Injectable, Redirect } from '@nestjs/common';

@Injectable()
export class AppService {
  @Redirect('/api')


  getHello(): string {
    return 'Hello World!';
  }
}
