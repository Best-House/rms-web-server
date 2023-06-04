import ky from "ky";

class ApiClient {
  public get<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.get>[1]>, "body">
  ) {
    return ky
      .get(path, {
        ...options,
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json() as T;
  }
  public post<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.post>[1]>, "body"> & {
      body: Record<any, any>;
    }
  ) {
    return ky
      .post(path, {
        ...options,
        body: JSON.stringify(options?.body),
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json() as T;
  }
  public put<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.put>[1]>, "body"> & {
      body: Record<any, any>;
    }
  ) {
    return ky
      .put(path, {
        ...options,
        body: JSON.stringify(options?.body),
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json() as T;
  }
  public delete<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.delete>[1]>, "body">
  ) {
    return ky
      .delete(path, {
        ...options,
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json() as T;
  }
  public patch<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.patch>[1]>, "body">
  ) {
    return ky
      .patch(path, {
        ...options,
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json() as T;
  }
}

export const apiClient = new ApiClient();

function getPrefixUrl() {
  return "/api";
}
