export interface IResponseRequest<DATA_TYPE> {
  success: boolean;
  data: DATA_TYPE;
  statusCode: number;
  message: string;
}
