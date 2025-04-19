import axios from 'axios';
import { toast } from 'sonner';

export const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpRequest.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

httpRequest.interceptors.response.use(
  (response) => response.data.responseData,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      toast.error('API Request Failed', {
        description: error.message,
      });
    }
    return Promise.reject(error);
  },
);

export const httpGet = <T>(url: string, params?: any): Promise<T> =>
  httpRequest.get<T, T>(url, { params });

export const httpPost = <T>(
  url: string,
  data?: any,
  postForm: boolean = false,
): Promise<T> =>
  postForm
    ? httpRequest.postForm<T, T>(url, data)
    : httpRequest.post<T, T>(url, data);

export const HttpPut = <T>(url: string, data?: any): Promise<T> =>
  httpRequest.put<T, T>(url, data);

export const HttpDelete = <T>(url: string): Promise<T> =>
  httpRequest.delete<T, T>(url);
