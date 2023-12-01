import ky from "ky";
import { HTTPClient } from "@/external-interfaces/api/HTTPClient";

class KyHTTPClient implements HTTPClient {
  public get<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.get>[1]>, "body">,
  ) {
    return ky
      .get(path.replace("/", ""), {
        ...options,
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json<T>();
  }
  public post<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.post>[1]>, "body"> & {
      body: Record<any, any>;
    },
  ) {
    return ky
      .post(path.replace("/", ""), {
        ...options,
        body: JSON.stringify(options?.body),
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json<T>();
  }
  public put<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.put>[1]>, "body"> & {
      body: Record<any, any>;
    },
  ) {
    return ky
      .put(path.replace("/", ""), {
        ...options,
        body: JSON.stringify(options?.body),
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json<T>();
  }
  public delete<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.delete>[1]>, "body">,
  ) {
    return ky
      .delete(path.replace("/", ""), {
        ...options,
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json<T>();
  }
  public patch<T>(
    path: string,
    options?: Omit<NonNullable<Parameters<typeof ky.patch>[1]>, "body">,
  ) {
    return ky
      .patch(path.replace("/", ""), {
        ...options,
        headers: {
          ...options?.headers,
          "content-type": "application/json",
        },
        prefixUrl: getPrefixUrl(),
      })
      .json<T>();
  }
}

const instance = new KyHTTPClient();

export function getHTTPClientInstance() {
  return instance;
}

function getPrefixUrl() {
  return "/external-interface";
}
