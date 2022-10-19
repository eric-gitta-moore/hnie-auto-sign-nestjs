import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../../http/service/impl/http.service';
import { DailySignApiEnum } from '../constant/dailySignApiEnum';
import * as formurlencoded from 'form-urlencoded';
import {
  DailySignSubmitRequest,
  DailySignSubmitResponse,
  SignLogRequest,
  SignLogResponse,
} from '../dto/dailySignSubmit.dto';

@Injectable()
export class DailySignApiService {
  private readonly logger = new Logger();

  constructor(private readonly httpService: HttpService) {}

  async getSignPage() {
    const res = await this.httpService
      .getInstance()
      .get(DailySignApiEnum.signPageApi, {
        params: {
          _t_s_: Date.now(),
        },
        headers: {
          Referer: `http://xggl.hnie.edu.cn/wap/menu/student/temp/zzdk?_t_s_=${
            Date.now() - 3
          }`,
        },
      });
    return res.data;
  }

  async submitSign(
    param: Omit<DailySignSubmitRequest, 'zzdk_token'>,
    token: string,
  ) {
    const res = await this.httpService
      .getInstance()
      .post<DailySignSubmitResponse>(
        DailySignApiEnum.patchSignApi,
        formurlencoded({
          ...param,
          zzdk_token: token,
        } as DailySignSubmitRequest),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        },
      );
    return res.data;
  }

  async getSignLog() {
    const result = await this.httpService
      .getInstance()
      .get<SignLogResponse>(DailySignApiEnum.signLogApi, {
        params: {
          bSortable_0: false,
          bSortable_1: true,
          iSortingCols: 1,
          iDisplayStart: 0,
          iDisplayLength: 12,
          iSortCol_0: 1,
          sSortDir_0: 'desc',
          _t_s_: Date.now(),
        } as SignLogRequest,
      });
    return result.data;
  }
}
