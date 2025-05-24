import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useLoaderStore } from "../stores/loader";


export default abstract class BaseApiService<BaseResponseType = any> {
  client: AxiosInstance;
  constructor(
    protected readonly baseUrl: string,
    authHeaders: Record<string, string>
  ) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      params: authHeaders,
    });
  }

  request<T = BaseResponseType>(
    config: AxiosRequestConfig,
    loadingMessage = "Loading..."
  ): Promise<T> {
    const loaderStore = useLoaderStore();
    loaderStore.addLoader(loadingMessage);
    return this.client
      .request<T>(config)
      .then((res) => res.data)
      .catch((err) => {
        // TODO: Handle error and show toast
        console.error(err);
        return Promise.reject(err);
      })
      .finally(() => {
        loaderStore.removeLoader(loadingMessage);
      });
  }

  get<T = BaseResponseType>(
    url: string,
    loadingMessage = "Getting data..."
  ): Promise<T> {
    return this.request<T>(
      {
        url,
        method: "GET",
      },
      loadingMessage
    );
  }

  post<T = BaseResponseType>(
    url: string,
    data: any,
    loadingMessage = "Creating request..."
  ): Promise<T> {
    return this.request<T>(
      {
        url,
        method: "POST",
        data,
      },
      loadingMessage
    );
  }

  put<T = BaseResponseType>(
    url: string,
    data: any,
    loadingMessage = "Updating request..."
  ): Promise<T> {
    return this.request<T>(
      {
        url,
        method: "PUT",
        data,
      },
      loadingMessage
    );
  }

  patch<T = BaseResponseType>(
    url: string,
    data: any,
    loadingMessage = "Updating request..."
  ): Promise<T> {
    return this.request<T>(
      {
        url,
        method: "PATCH",
        data,
      },
      loadingMessage
    );
  }

  delete<T = BaseResponseType>(
    url: string,
    loadingMessage = "Deleting request..."
  ): Promise<T> {
    return this.request<T>(
      {
        url,
        method: "DELETE",
      },
      loadingMessage
    );
  }
}
