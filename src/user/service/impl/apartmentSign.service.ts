import { Injectable, Logger } from '@nestjs/common';
import { SignService } from '../sign.service';
import { ApartmentSignApiEnum } from '../../constant/dailySignApiEnum';
import { ApartmentSignApiService } from '../../api/apartmentSignApi.service';
import { HttpService } from '../../../http/http.service';
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
   * 日常打卡
   * @param param
   */
  async doSign(param: Partial<SubmitSignRequest>) {
    const res = await this.apartmentSignApiService.getTaskScope();
    const pos = res[0].position;
    const result = await this.apartmentSignApiService.submitSign(
      getSubmitSignRequest({
        zb: pos,
        ...param,
      }),
    );
    return !!result;
  }
}
