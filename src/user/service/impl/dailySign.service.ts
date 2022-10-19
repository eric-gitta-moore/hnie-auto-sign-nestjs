import { Injectable, Logger } from '@nestjs/common';
import 'crypto-js/md5';
import dayjs from 'dayjs';
import { DailySignApiEnum } from '../../constant/dailySignApiEnum';
import { SignService } from '../sign.service';
import { HttpService } from '../../../http/service/impl/http.service';
import { DailySignApiService } from '../../api/dailySignApi.service';
import { SignApiService } from '../../api/signApi.service';
import {
  DailySignSubmitRequest,
  getDailySignRequestParam,
} from '../../dto/dailySignSubmit.dto';

@Injectable()
export class DailySignService extends SignService {
  private readonly logger = new Logger(DailySignService.name);

  protected indexPageUrl: string = DailySignApiEnum.indexPageUrl;
  protected loginApi: string = DailySignApiEnum.loginApi;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly signApiService: SignApiService,
    private readonly dailySignApiService: DailySignApiService,
  ) {
    super(httpService, signApiService);
  }

  /**
   * 日常打卡
   * @param param
   */
  async doSign(param: Partial<DailySignSubmitRequest>) {
    const htmlData = await this.dailySignApiService.getSignPage();
    const regex = /zzdk_token['"]\s*?value=["']([\w\d]+)["']/i;
    if (!regex.test(htmlData))
      return {
        result: false,
      };
    const token = regex.exec(htmlData)[1];
    const submitParam = getDailySignRequestParam(param);
    const result = await this.dailySignApiService.submitSign(
      submitParam,
      token,
    );
    return {
      result: result.result,
      message: result.errorInfoList?.[0]?.message,
    };
  }

  /**
   * 今天是否已经签到过了
   */
  async isSign() {
    const result = await this.dailySignApiService.getSignLog();
    const today = result.aaData[0]?.DKRQ;
    return dayjs(today).isSame(dayjs(), 'day');
  }
}
