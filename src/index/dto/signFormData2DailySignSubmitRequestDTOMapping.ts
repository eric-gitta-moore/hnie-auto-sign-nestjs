import { DailySignSubmitRequest } from '../../user/dto/dailySignSubmit.dto';
import { signFormData } from './signConfigDTO';

type signFormDataKey = keyof signFormData;
type DailySignSubmitRequestKey = keyof DailySignSubmitRequest;
export type SignConfig2DailySignSubmitRequestDTOMappingType = {
  [k in signFormDataKey]: DailySignSubmitRequestKey;
};

export const SignFormData2DailySignSubmitRequestDTOMapping: SignConfig2DailySignSubmitRequestDTOMappingType =
  {
    address: 'dkdz',
    position: 'dkdzZb',
    signAddress: 'dkd',
    provinceZipCode: 'jzdSheng.dm',
    cityZipCode: 'jzdShi.dm',
    countyZipCode: 'jzdXian.dm',
    habitationDetailDesc: 'jzdDz',
    usualResidenceDetailDesc: 'jzdDz2',
    phone: 'lxdh',
  };

export function signForm2DailySignSubmitRequestDTOMapping(
  config: signFormData,
) {
  const res: Partial<DailySignSubmitRequest> = {};
  for (const configKey in config) {
    res[SignFormData2DailySignSubmitRequestDTOMapping[configKey]] =
      config[configKey];
  }
  return res;
}
