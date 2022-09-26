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
  mc: string;
  position: string;
};

export type TaskScopeRequest = {
  task: '';
  sslRadius: any;
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
