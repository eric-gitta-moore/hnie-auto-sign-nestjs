export const dailySignApiPrefix = 'http://xggl.hnie.edu.cn';
export class DailySignApiEnum {
  static indexPageUrl = `${dailySignApiPrefix}/wap/main/welcome`;
  static loginApi = `${dailySignApiPrefix}/website/login`;
  static signLogApi = `${dailySignApiPrefix}/content/tabledata/student/temp/zzdk`;
  static signPageApi = `${dailySignApiPrefix}/wap/menu/student/temp/zzdk/_child_/edit`;
  static patchSignApi = `${dailySignApiPrefix}/content/student/temp/zzdk`;
}

export const apartmentSignApiPrefix = `http://ssgl.hnie.edu.cn`;
export class ApartmentSignApiEnum {
  static indexPageUrl = `${apartmentSignApiPrefix}/wap/main/welcome`;
  static loginApi = `${apartmentSignApiPrefix}/website/login`;
  /**
   * 获取签到范围
   */
  static getTaskScope = `${apartmentSignApiPrefix}/content/gygl/sign/stu/task/scopes`;
  /**
   * 提交签到
   */
  static submitSign = `${apartmentSignApiPrefix}/content/gygl/sign/stu/sign`;
  static signList = `${apartmentSignApiPrefix}/content/tabledata/gygl/sign/stu/sign`;
}
