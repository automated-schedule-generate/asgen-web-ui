export interface IResponseRequest<DATA_TYPE> {
  success: boolean;
  data: DATA_TYPE;
  statusCode: number;
  message: string;
}

interface IPaginatedData<DATA_TYPE> {
  items: DATA_TYPE[];
  total: number;
  page: {
    current: number;
    total: number;
  };
}

export type IResponseRequestPaginated<DATA_TYPE> = IResponseRequest<
  IPaginatedData<DATA_TYPE>
>;
