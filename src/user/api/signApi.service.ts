import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../../http/http.service';
import { LoginResponse } from '../dto/sign.dto';

@Injectable()
export class SignApiService {
  private readonly logger = new Logger();

  constructor(private readonly httpService: HttpService) {}

  /**
   * 预请求，先访问一次登录页面
   * @private
   */
  preRequest(indexPageUrl) {
    return this.httpService.getInstance().get(indexPageUrl);
  }

  async login(account: string, password: string, loginApi: string) {
    const param = new URLSearchParams();
    param.append('uname', account);
    param.append('pd_mm', password);
    const result = await this.httpService
      .getInstance()
      .post<LoginResponse>(loginApi, param, {
        headers: {
          Origin: 'http://ssgl.hnie.edu.cn',
          Referer: 'http://ssgl.hnie.edu.cn/index',
        },
      });
    return result.data;
  }
}
