import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
  private readonly axios: AxiosInstance;
  private readonly jar: InstanceType<typeof CookieJar>;

  constructor() {
    this.jar = new CookieJar();
    this.axios = wrapper(
      axios.create({
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36 Edg/104.0.5112.102',
          'X-Requested-With': 'XMLHttpRequest',
        },
        jar: this.jar,
        timeout: 30,
      }),
    );
  }

  getInstance() {
    return this.axios;
  }
}
