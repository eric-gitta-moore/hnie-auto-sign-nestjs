/**
 * @example
 * [
 *   {
 *     "operationType": "Unchange",
 *     "mc": "明德05",
 *     "position": "112.934321,27.84783"
 *   }
 * ]
 */
export type TaskScopeResponse = TaskScopeResponseChild[];

export type TaskScopeResponseChild = {
  operationType: string;
  /**
   * 位置名称
   * @example 明德05
   */
  mc: string;
  /**
   * 经纬度
   * @example 112.934321,27.84783
   */
  position: string;
  /**
   * 半径
   * @example 300
   */
  radius: string;
};

export type TaskScopeRequest = {
  task: string;
  sslRadius: number | null;
  _t_s_: string;
};

export function getTaskScopeRequest(
  obj?: Partial<TaskScopeRequest>,
): TaskScopeRequest {
  return Object.assign(
    {
      task: '',
      sslRadius: '',
      _t_s_: Date.now().toString(),
    },
    obj,
  );
}
