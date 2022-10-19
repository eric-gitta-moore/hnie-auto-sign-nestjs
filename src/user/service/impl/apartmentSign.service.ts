import { Injectable, Logger } from '@nestjs/common';
import { SignService } from '../sign.service';
import { ApartmentSignApiEnum } from '../../constant/dailySignApiEnum';
import { ApartmentSignApiService } from '../../api/apartmentSignApi.service';
import { HttpService } from '../../../http/service/impl/http.service';
import { SignApiService } from '../../api/signApi.service';
import {
  getSubmitSignRequest,
  SubmitSignRequest,
} from '../../dto/apartmentSignSubmit.dto';

@Injectable()
export class ApartmentSignService extends SignService {
  private readonly logger = new Logger(ApartmentSignService.name);

  protected indexPageUrl = ApartmentSignApiEnum.indexPageUrl;
  protected loginApi = ApartmentSignApiEnum.loginApi;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly signApiService: SignApiService,
    protected readonly apartmentSignApiService: ApartmentSignApiService,
  ) {
    super(httpService, signApiService);
  }

  /**
   * 晚归打卡
   * @param param
   */
  async doSign(param: Partial<SubmitSignRequest>) {
    const isAvailable = await this.apartmentSignApiService.isAvailableSign();
    if (!isAvailable) {
      return { result: true, message: '已经打卡完成' };
    }
    const signList = await this.apartmentSignApiService.getSignList();
    if (signList.aaData.length === 0 || signList.aaData[0].VALID === '0') {
      return { result: true, message: '暂无可用的晚归打卡' };
    }
    const signConfig = signList.aaData.shift();
    const taskId = signConfig.DM;
    const sjdm = signConfig.SJDM;
    const res = await this.apartmentSignApiService.getTaskScope(taskId);
    const pos = res[0].position;
    const posText = res[0].mc;
    const result = await this.apartmentSignApiService.submitSign(
      getSubmitSignRequest({
        zb: pos,
        sjdm,
        dm: taskId,
        wz: posText,
        ...param,
      }),
    );
    return {
      result: result.result,
      message: result.msg,
    };
  }
}
