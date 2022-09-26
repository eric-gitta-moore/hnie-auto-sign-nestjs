import { Module } from '@nestjs/common';
import { DailySignService } from './service/impl/dailySign.service';
import { HttpModule } from '../http/http.module';
import { ApartmentSignService } from './service/impl/apartmentSign.service';
import { SignApiService } from './api/signApi.service';
import { ApartmentSignApiService } from './api/apartmentSignApi.service';
import { DailySignApiService } from './api/dailySignApi.service';

@Module({
  imports: [HttpModule],
  providers: [
    SignApiService,
    DailySignApiService,
    ApartmentSignApiService,
    DailySignService,
    ApartmentSignService,
  ],
  exports: [DailySignService, ApartmentSignService],
})
export class UserModule {}
