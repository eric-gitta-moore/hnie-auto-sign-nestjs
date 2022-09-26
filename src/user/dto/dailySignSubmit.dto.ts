export type DailySignSubmitResponse = {
  errorInfoList: { code: any; message: string }[];
  result: boolean;
  msg?: any;
};

export type DailySignSubmitRequest = {
  dkdz: string;
  dkdzZb: string;
  dkly: string;
  zzdk_token: string;
  dkd: string;
  jzdValue: string;
  'jzdSheng.dm': string;
  'jzdShi.dm': string;
  'jzdXian.dm': string;
  jzdDz: string;
  jzdDz2: string;
  lxdh: string;
  sfzx: string;
  sfzx1: string;
  'twM.dm': string;
  tw1: string;
  'tw1M.dm': string;
  tw11: string;
  'tw2M.dm': string;
  tw12: string;
  'tw3M.dm': string;
  tw13: string;
  'yczk.dm': string;
  yczk1: string;
  fbrq: string;
  jzInd: string;
  jzYy: string;
  zdjg: string;
  fxrq: string;
  'brStzk.dm': string;
  brStzk1: string;
  'brJccry.dm': string;
  brJccry1: string;
  'jrStzk.dm': string;
  jrStzk1: string;
  'jrJccry.dm': string;
  jrJccry1: string;
  jkm: string;
  jkm1: string;
  xcm: string;
  xcm1: string;
  xgym: string;
  xgym1: string;
  hsjc: string;
  hsjc1: string;
  bz: string;
  operationType: string;
  dm: string;
};

export function getDailySignRequestParam(
  obj: Partial<DailySignSubmitRequest>,
): Omit<DailySignSubmitRequest, 'zzdk_token'> {
  return Object.assign(
    {
      /**
       * 打卡位置
       */
      dkdz: '湖南省 湘潭市 岳塘区 至善路 154号 靠近明德公寓1栋学生公寓 ',
      dkdzZb: '112.934325,27.84791',
      /**
       * 打卡依赖
       */
      dkly: 'yiban',
      /**
       * 打卡地
       */
      dkd: '湖南省 湘潭市',
      jzdValue: '430000,430300,430304',
      'jzdSheng.dm': '430000',
      'jzdShi.dm': '430300',
      'jzdXian.dm': '430304',
      jzdDz: '湖南省湘潭市岳塘区福星中路88号 湖南工程学院',
      jzdDz2: '湖南省湘潭市岳塘区福星中路88号 湖南工程学院',
      /**
       * 联系电话
       */
      lxdh: '15911111111',
      sfzx: '1',
      sfzx1: '在校',
      'twM.dm': '01',
      tw1: '',
      'tw1M.dm': '01',
      tw11: '[35.0~37.2]正常',
      'tw2M.dm': '01',
      tw12: '[35.0~37.2]正常',
      'tw3M.dm': '01',
      tw13: '',
      'yczk.dm': '01',
      yczk1: '无症状',
      fbrq: '',
      jzInd: '0',
      jzYy: '',
      zdjg: '',
      fxrq: '',
      'brStzk.dm': '01',
      brStzk1: '身体健康、无异常',
      'brJccry.dm': '01',
      brJccry1: '未接触传染源',
      'jrStzk.dm': '01',
      jrStzk1: '身体健康、无异常',
      'jrJccry.dm': '01',
      jrJccry1: '未接触传染源',
      jkm: '1',
      jkm1: '绿色',
      xcm: '1',
      xcm1: '绿色',
      xgym: '2',
      xgym1: '',
      hsjc: '1',
      hsjc1: '是',
      bz: '',
      operationType: 'Create',
      dm: '',
    },
    obj,
  );
}

export type SignLogRequest = {
  bSortable_0: false;
  bSortable_1: true;
  iSortingCols: 1;
  iDisplayStart: 0;
  iDisplayLength: 12;
  iSortCol_0: 1;
  sSortDir_0: 'desc';
  _t_s_: number;
};

export type SignLogResponse = {
  sEcho: number;
  iDisplayStart: number;
  iDisplayLength: number;
  iSortColList: number[];
  sSortDirList: string[];
  iTotalRecords: number;
  iTotalDisplayRecords: number;
  aaData: RootObjectAaData[];
};
type RootObjectAaData = {
  REDFLAG: string;
  TW: string;
  DKRQ: string;
  DQZT: string;
  DKCS: number;
  DM: string;
  UPDATE_TIME: string;
  DKD: string;
  DONE_IND: string;
};
