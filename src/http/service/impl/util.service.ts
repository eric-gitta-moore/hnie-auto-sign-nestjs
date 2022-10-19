import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from './http.service';

@Injectable()
export class UtilService {
  private readonly logger = new Logger(UtilService.name);

  constructor(private readonly httpService: HttpService) {}

  async getServiceIp(isEchoLog = false) {
    type ipData = {
      rs: number;
      code: number;
      address: string;
      ip: string;
      isDomain: number;
    };
    const res = await this.httpService
      .getInstance()
      .get<ipData>('https://ip.cn/api/index?ip=&type=0');
    if (res.data?.address && res.data?.ip && isEchoLog) {
      this.logger.log(`当前服务器IP：[${res.data.address}]${res.data?.ip}`);
    }
    return res.data?.ip;
  }
}
