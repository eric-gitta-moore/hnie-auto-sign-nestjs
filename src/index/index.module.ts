import { Module } from '@nestjs/common';
import { IndexController } from './controller/index.controller';
import { IndexService } from './service/impl/index.service';
import { UserModule } from '../user/user.module';
import { HttpModule } from '../http/http.module';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService],
})
export class IndexModule {}
