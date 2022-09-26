import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from 'src/http/http.service';
import { ApartmentSignApiEnum } from '../constant/dailySignApiEnum';
import { getTaskScopeRequest, TaskScopeResponse } from '../dto/taskScope.dto';
import {
  getSubmitSignRequest,
  SubmitSignRequest,
  SubmitSignResponse,
} from '../dto/apartmentSignSubmit.dto';

@Injectable()
export class ApartmentSignApiService {
  private readonly logger = new Logger(ApartmentSignApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async getTaskScope() {
    const res = await this.httpService
      .getInstance()
      .get<TaskScopeResponse>(ApartmentSignApiEnum.getTaskScope, {
        params: getTaskScopeRequest(),
      });
    return res.data;
  }

  async submitSign(param: SubmitSignRequest) {
    const res = await this.httpService
      .getInstance()
      .get<SubmitSignResponse>(ApartmentSignApiEnum.submitSign, {
        params: param,
      });
    return !!res.data.result;
  }
}
