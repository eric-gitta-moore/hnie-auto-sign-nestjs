import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IUserOptions } from 'src/types/interface';
import { DailySignService } from '../../../user/service/impl/dailySign.service';
import { ConfigService } from '@nestjs/config';
import * as JSON5 from 'json5';
import CryptoJS from 'crypto-js/core';
import 'crypto-js/enc-base64';
import { ApartmentSignService } from '../../../user/service/impl/apartmentSign.service';
import { signConfig2DailySignSubmitRequestDTOMapping } from '../../dto/signConfig2DailySignSubmitRequestDTOMapping';
import { SignConfig } from 'src/index/dto/signConfigDTO';

@Injectable()
export class IndexService {
  private readonly logger = new Logger(IndexService.name);

  private readonly signConfig: SignConfig = [];

  private accountData: IUserOptions;

  constructor(
    private readonly dailySignService: DailySignService,
    private readonly apartmentSignService: ApartmentSignService,
    private readonly configService: ConfigService,
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

  /**
   * 日常打卡
   */
  @Cron('0 1 6 * * *')
  async dailySign() {
    this.logger.log('===========日常打卡开始');
    const it = this.loadUser();
    let param = it.next();
    while (!param.done && param.value) {
      this.dailySignService.setUser(this.accountData);
      const loginStatus = await this.dailySignService.doLogin();
      const currentUserSummary = this.accountData.account.substring(
        this.accountData.account.length - 4,
      );
      if (loginStatus !== true) {
        this.logger.error(
          `[${currentUserSummary}]登录失败: ${loginStatus?.msg}`,
        );
        continue;
      }
      const result = await this.dailySignService.doSign(param.value);
      this.logger.log(
        `[${currentUserSummary}]签到结果: ${
          !result ? '失败' : result.result ? '成功' : '失败'
        } 返回消息: ${!result || result.message}`,
      );
      param = it.next();
    }
    this.logger.log('===========日常打卡结束');
  }

  /**
   * 晚归签到
   */
  @Cron('0 2 22 * * *')
  async apartmentSign() {
    this.logger.log('===========晚归签到开始');
    const it = this.loadUser();
    let param = it.next();
    while (!param.done && param.value) {
      this.apartmentSignService.setUser(this.accountData);
      const loginStatus = await this.apartmentSignService.doLogin();
      const currentUserSummary = this.accountData.account.substring(
        this.accountData.account.length - 4,
      );
      if (loginStatus !== true) {
        this.logger.error(
          `[${currentUserSummary}]登录失败: ${loginStatus?.msg}`,
        );
        continue;
      }
      // TODO: 这里参数不知道是啥
      const res = await this.apartmentSignService.doSign(param.value);
      param = it.next();
    }
    this.logger.log('===========晚归签到结束');
  }

  private *loadUser() {
    for (const signConfigElement of this.signConfig) {
      this.accountData = signConfigElement.account;
      yield signConfig2DailySignSubmitRequestDTOMapping(
        signConfigElement.signFormData,
      );
    }
  }
}
