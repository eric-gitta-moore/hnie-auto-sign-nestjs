import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "./http.service";

@Injectable()
export class UtilService {
  private readonly logger = new Logger(UtilService.name);

  constructor(private readonly httpService: HttpService) {}

  async getServiceIp(isEchoLog = false) {
    try {
      const res = await this.httpService
        .getInstance()
        .get<string>("http://test.ipw.cn/");
      const ipReg =
        /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/i;
      const ip = ipReg.exec(res.data)[0];
      if (isEchoLog) {
        this.logger.log(`当前服务器IP：${ip}`);
      }
      return ip;
    } catch (e) {
      this.logger.log("获取服务器IP失败");
    }
    return null;
  }
}
