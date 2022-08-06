import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '' +
      '<div>Hello World!</div>' +
      '<h2><a href="/swagger">Swagger link</a></h2>';
  }
}
