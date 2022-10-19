import { Global, Module } from '@nestjs/common';
import { HttpService } from './service/impl/http.service';
import { UtilService } from './service/impl/util.service';

@Global()
@Module({
  providers: [HttpService, UtilService],
  exports: [HttpService, UtilService],
})
export class HttpModule {}
