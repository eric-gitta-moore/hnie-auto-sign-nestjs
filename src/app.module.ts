import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { IndexModule } from './index/index.module';
import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import Ajv from 'ajv';
import * as JSON5 from 'json5';
import * as CryptoJS from 'crypto-js/core';
import 'crypto-js/enc-base64';

const configSchemaText = {
  type: 'array',
  items: {
    type: 'object',
    required: [],
    properties: {
      account: {
        type: 'object',
        required: [],
        properties: {
          account: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      signFormData: {
        type: 'object',
        required: [],
        properties: {
          address: {
            type: 'string',
          },
          position: {
            type: 'string',
          },
          signAddress: {
            type: 'string',
          },
          provinceZipCode: {
            type: 'string',
          },
          cityZipCode: {
            type: 'string',
          },
          countyZipCode: {
            type: 'string',
          },
          habitationDetailDesc: {
            type: 'string',
          },
          usualResidenceDetailDesc: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
        },
      },
    },
  },
};
const ajv = new Ajv();
const validator = ajv.compile(configSchemaText);
function envValidator(config) {
  if (config['SIGN_CONFIG_BASE64']) {
    let signConfig = null;
    try {
      signConfig = JSON5.parse(
        CryptoJS.enc.Base64.parse(config['SIGN_CONFIG_BASE64']).toString(
          CryptoJS.enc.Utf8,
        ),
      );
    } catch (e) {}
    if (signConfig) {
      const isValid = validator(signConfig);
      if (!isValid) {
        throw new Error(
          `[SIGN_CONFIG_BASE64] 环境变量验证失败` +
            JSON.stringify(validator.errors),
        );
      } else return config;
    }
  }

  if (config['SIGN_CONFIG']) {
    let signConfig = null;
    try {
      signConfig = JSON5.parse(config['SIGN_CONFIG']);
    } catch (e) {
      throw new Error('[SIGN_CONFIG] 环境变量解析错误');
    }
    const isValid = validator(signConfig);
    if (!isValid) {
      throw new Error(
        `[SIGN_CONFIG] 环境变量验证失败` + JSON.stringify(validator.errors),
      );
    }
  }
  return config;
}

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      validate: envValidator,
    }),
    HttpModule,
    IndexModule,
  ],
})
export class AppModule {}
