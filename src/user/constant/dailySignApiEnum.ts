export enum DailySignApiEnum {
  indexPageUrl = 'http://xggl.hnie.edu.cn/wap/main/welcome',
  loginApi = 'http://xggl.hnie.edu.cn/website/login',
  signLogApi = 'http://xggl.hnie.edu.cn/content/tabledata/student/temp/zzdk',
  signPageApi = 'http://xggl.hnie.edu.cn/wap/menu/student/temp/zzdk/_child_/edit',
  patchSignApi = 'http://xggl.hnie.edu.cn/content/student/temp/zzdk',
}

export enum ApartmentSignApiEnum {
  indexPageUrl = 'http://ssgl.hnie.edu.cn/wap/main/welcome',
  loginApi = 'http://ssgl.hnie.edu.cn/website/login',
  /**
   * 获取签到范围
   */
  getTaskScope = 'http://ssgl.hnie.edu.cn/content/gygl/sign/stu/task/scopes',
  /**
   * 提交签到
   */
  submitSign = 'http://ssgl.hnie.edu.cn/content/gygl/sign/stu/sign',
  signLogApi = 'http://xggl.hnie.edu.cn/content/tabledata/student/temp/zzdk',
  signPageApi = 'http://xggl.hnie.edu.cn/wap/menu/student/temp/zzdk/_child_/edit',
}
