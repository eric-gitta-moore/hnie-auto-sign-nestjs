export type apartmentSignListRequest = {
  bSortable_0: boolean;
  bSortable_1: boolean;
  iSortingCols: number;
  iDisplayStart: number;
  iDisplayLength: number;
  iSortCol_0: number;
  sSortDir_0: 'desc' | 'asc';
  _t_s_: string;
};

export function getApartmentSignListRequest(
  obj?: Partial<apartmentSignListRequest>,
): apartmentSignListRequest {
  return Object.assign(
    {
      bSortable_0: false,
      bSortable_1: true,
      iSortingCols: 1,
      iDisplayStart: 0,
      iDisplayLength: 12,
      iSortCol_0: 3,
      sSortDir_0: 'desc',
      _t_s_: Date.now().toString(),
    },
    obj,
  );
}

export type apartmentSignListResponse = {
  sEcho: number;
  iDisplayStart: number;
  iDisplayLength: number;
  iSortColList: number[];
  sSortDirList: string[];
  iTotalRecords: number;
  iTotalDisplayRecords: number;
  aaData: apartmentSignListResponseAaData[];
};
export type apartmentSignListResponseAaData = {
  JSSJ: string;
  QDFS: string;
  SJDM: string;
  /**
   * 是否可用:'1'=可用,'0'=不可用
   */
  VALID: string;
  DM: string;
  JLDM?: any;
  QDWZ_DZ?: any;
  BQ_IND?: any;
  /**
   * 签到时间
   * 如果是 null 则为未签到
   */
  QDSJ?: null | string;
  FBR: string;
  SUBJECT: string;
  BQSJ?: any;
  WG_IND?: any;
  KSSJ: string;
  ISFZR: string;
};
