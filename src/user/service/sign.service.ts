import { HttpService } from '../../http/http.service';
import { IUserOptions } from '../../types/interface';
import { SignApiService } from '../api/signApi.service';
import * as CryptoJS from 'crypto-js/core';
import 'crypto-js/md5';

export abstract class SignService {
  protected account: string;
  protected password: string;

  protected abstract indexPageUrl: string;
  protected abstract loginApi: string;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly signApiService: SignApiService,
  ) {}

  getUser() {
    return {
      account: this.account,
      password: this.password,
    };
  }

  setUser(options: IUserOptions) {
    this.account = options.account;
    this.password = options.password;
  }

  protected static cryptoPassword(pwd_: string) {
    let pwd = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(pwd_)).toString();
    if (pwd.length > 5) {
      pwd = pwd.substring(0, 5) + 'a' + pwd.substring(5, pwd.length);
    }
    if (pwd.length > 10) {
      pwd = pwd.substring(0, 10) + 'b' + pwd.substring(10, pwd.length);
    }
    pwd = pwd.substring(0, pwd.length - 2);
    return pwd;
  }

  /**
   * 预请求，先访问一次登录页面
   * @private
   */
  protected preRequest() {
    return this.signApiService.preRequest(this.indexPageUrl);
  }

  async doLogin() {
    await this.preRequest();
    const result = await this.signApiService.login(
      this.account,
      SignService.cryptoPassword(this.password),
      this.loginApi,
    );
    if (!result.error && result.goto2) {
      return true;
    }
    return result;
  }

  public abstract doSign(...args: any):
    | {
        message?: string;
        result: boolean;
      }
    | Promise<{
        message?: string;
        result: boolean;
      }>;
}
