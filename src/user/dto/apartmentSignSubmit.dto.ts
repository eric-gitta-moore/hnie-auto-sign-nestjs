export type SubmitSignResponse = {
  result: boolean;
  msg: string;
};
export type SubmitSignRequest = {
  pathFile: string;
  /**
   * 签到ID
   * @example 16632903199821049443
   */
  dm: string;
  /**
   * @example 16638588000501838964
   */
  sjdm: string;
  /**
   * 经纬度
   * @example "112.944,27.8296"
   */
  zb: string;
  /**
   * 位置，中文
   * @example 湖南省湘潭市岳塘区湘潭大道辅路
   */
  wz: string;
  /**
   * 位置来源
   * @example baidu
   */
  ly: string;
  /**
   * @example 0
   */
  qdwzZt: string;
  /**
   * 距离
   * @example 1941.8999999999996
   */
  fwwDistance: string;
  operationType: string;
};

export function getSubmitSignRequest(
  obj: Partial<SubmitSignRequest>,
): SubmitSignRequest {
  return Object.assign(
    {
      pathFile: '',
      dm: '',
      sjdm: '',
      zb: '112.944,27.8296',
      wz: '',
      ly: 'yiban',
      qdwzZt: '',
      fwwDistance: '',
      operationType: 'Update',
    },
    obj,
  );
}
