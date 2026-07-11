export interface IServerActionsReturning<T> {
  success: boolean;
  data?: T;
  error?: unknown;
}
