import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from 'src/http/service/impl/http.service';
import { ApartmentSignApiEnum } from '../constant/dailySignApiEnum';
import {
  getTaskScopeRequest,
  TaskScopeRequest,
  TaskScopeResponse,
} from '../dto/taskScope.dto';
import {
  SubmitSignRequest,
  SubmitSignResponse,
} from '../dto/apartmentSignSubmit.dto';
import {
  apartmentSignListResponse,
  getApartmentSignListRequest,
} from '../dto/apartmentSignList.dto';
import * as formurlencoded from 'form-urlencoded';

@Injectable()
export class ApartmentSignApiService {
  private readonly logger = new Logger(ApartmentSignApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async getTaskScope(taskId: string) {
    const res = await this.httpService
      .getInstance()
      .get<TaskScopeResponse>(ApartmentSignApiEnum.getTaskScope, {
        params: getTaskScopeRequest({
          task: taskId,
        }),
      });
    return res.data;
  }

  async submitSign(param: SubmitSignRequest) {
    const res = await this.httpService
      .getInstance()
      .post<SubmitSignResponse>(
        ApartmentSignApiEnum.submitSign,
        formurlencoded(param),
        {
          params: {
            _t_s_: Date.now().toString(),
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        },
      );
    return res.data;
  }

  async getSignList() {
    const res = await this.httpService
      .getInstance()
      .get<apartmentSignListResponse>(ApartmentSignApiEnum.signList, {
        params: getApartmentSignListRequest(),
      });
    return res.data;
  }

  async isAvailableSign() {
    const data = await this.getSignList();
    if (data.aaData.length === 0) return false;
    return !data.aaData[0].QDSJ;
  }
}
