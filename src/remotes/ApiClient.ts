export interface ApiClient {
  get: <T>(path: string) => Promise<T>;
  post: <T>(
    path: string,
    options: { body: Record<string | number | symbol, any> }
  ) => Promise<T>;
  put: <T>(
    path: string,
    options: { body: Record<string | number | symbol, any> }
  ) => Promise<T>;
  delete: <T>(path: string) => Promise<T>;
}
