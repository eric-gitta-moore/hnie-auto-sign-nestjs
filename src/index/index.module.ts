import { Module } from '@nestjs/common';
import { IndexController } from './controller/index.controller';
import { IndexService } from './service/impl/index.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService],
})
export class IndexModule {}
