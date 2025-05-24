export interface ApiResponseWrapper<T> {
  data: T;
  message: string;
  status: boolean;
}
