import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IUserOptions } from 'src/types/interface';
import { DailySignService } from '../../../user/service/impl/dailySign.service';
import { ConfigService } from '@nestjs/config';
import * as JSON5 from 'json5';
import * as CryptoJS from 'crypto-js/core';
import 'crypto-js/enc-base64';
import { ApartmentSignService } from '../../../user/service/impl/apartmentSign.service';
import { SignConfig, signFormData } from 'src/index/dto/signConfigDTO';
import { SignService } from '../../../user/service/sign.service';
import { DailySignSubmitRequest } from '../../../user/dto/dailySignSubmit.dto';
import { signForm2DailySignSubmitRequestDTOMapping } from '../../dto/signFormData2DailySignSubmitRequestDTOMapping';
import { UtilService } from '../../../http/service/impl/util.service';

@Injectable()
export class IndexService {
  private readonly logger = new Logger(IndexService.name);

  private readonly signConfig: SignConfig = [];

  private accountData: IUserOptions;

  constructor(
    private readonly dailySignService: DailySignService,
    private readonly apartmentSignService: ApartmentSignService,
    private readonly configService: ConfigService,
    private readonly utilService: UtilService,
  ) {
    this.signConfig = this.getSignConfig();
  }

  private getSignConfig(): SignConfig {
    try {
      if (this.configService.get('SIGN_CONFIG_BASE64')) {
        return JSON5.parse(
          CryptoJS.enc.Base64.parse(
            this.configService.get<string>('SIGN_CONFIG_BASE64'),
          ).toString(CryptoJS.enc.Utf8),
        );
      }
    } catch (e) {
      this.logger.error('SIGN_CONFIG_BASE64配置解析错误: ' + e.toString());
    }
    try {
      const config = this.configService.get<string>('SIGN_CONFIG');
      return JSON5.parse(config);
    } catch (e) {
      this.logger.error('SIGN_CONFIG配置解析错误: ' + e.toString());
    }
    return [];
  }

  protected async commonSign(
    loadUserGenerator: Generator,
    signService: SignService,
    loggerName: string,
  ) {
    this.utilService.getServiceIp(true);
    const it = loadUserGenerator;
    let param = it.next();
    while (!param.done && param.value) {
      signService.setUser(this.accountData);
      const loginStatus = await signService.doLogin();
      const currentUserSummary = this.accountData.account.substring(
        this.accountData.account.length - 4,
      );
      if (loginStatus !== true) {
        this.logger.warn(
          `[${currentUserSummary}]登录失败: ${loginStatus?.msg}`,
        );
        param = it.next();
        continue;
      }
      const res = await signService.doSign(param.value);
      this.logger.log(
        `[${currentUserSummary}] [${loggerName}]: ${
          res.result ? '成功' : '失败'
        } 返回消息: ${res?.message}`,
      );
      param = it.next();
    }
  }

  /**
   * 日常打卡
   */
  @Cron('0 1 6 * * *')
  async dailySign() {
    this.logger.log('===========日常打卡开始');
    const it = this.loadUser(
      'dailySignFormData',
      signForm2DailySignSubmitRequestDTOMapping,
    );
    await this.commonSign(it, this.dailySignService, '日常打卡');
    this.logger.log('===========日常打卡结束');
  }

  /**
   * 晚归签到
   */
  @Cron('0 2 22 * * *')
  async apartmentSign() {
    this.logger.log('===========晚归签到开始');
    const it = this.loadUser('apartmentSignFormData');
    await this.commonSign(it, this.apartmentSignService, '晚归打卡');
    this.logger.log('===========晚归签到结束');
  }

  private *loadUser<T extends keyof SignConfig[number]>(
    key: T,
    translateFn?: (formData: SignConfig[number][T]) => unknown,
  ) {
    for (const signConfigElement of this.signConfig) {
      this.accountData = signConfigElement.account;
      if (translateFn) yield translateFn(signConfigElement[key]);
      else yield signConfigElement[key];
    }
  }
}
