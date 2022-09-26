export type SubmitSignResponse = {
  result: boolean;
};

export type SubmitSignRequest = {
  dm: string;
  sjdm: string;
  /**
   * 经纬度
   * @example "112.944,27.8296"
   */
  zb: string;
  wz: string;
  ly: string;
  qdwzZt: string;
  /**
   * 距离
   */
  fwwDistance: string;
  operationType: string;
};

export function getSubmitSignRequest(
  obj: Partial<SubmitSignRequest>,
): SubmitSignRequest {
  return Object.assign(
    {
      dm: '',
      sjdm: '',
      zb: '112.944,27.8296',
      wz: '',
      ly: 'baidu',
      qdwzZt: '0',
      fwwDistance: '2241.8999999999996',
      operationType: 'Create',
    },
    obj,
  );
}
