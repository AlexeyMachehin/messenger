import { HTTPOptions, HTTPOptionsPost } from "./models/httpOptions";
import { METHODS } from "./models/httpMethod";
import { queryStringify } from "./queryStringify";

export default class HTTPTransport {
  get<T>(url: string, options?: HTTPOptionsPost) {
    if (options && options.data) {
      url = url + queryStringify(options.data);
    }
    return this.request<T>(process.env.YANDEXPRAKTIKUMAPI + url, {
      method: METHODS.GET,
    });
  }
  post<T>(url: string, options: HTTPOptionsPost): Promise<T> {
    return this.request(process.env.YANDEXPRAKTIKUMAPI + url, {
      ...options,
      method: METHODS.POST,
    });
  }
  put(url: string, options: HTTPOptions) {
    return this.request(process.env.YANDEXPRAKTIKUMAPI + url, {
      ...options,
      method: METHODS.PUT,
    });
  }
  patch(url: string, options: HTTPOptions) {
    return this.request(process.env.YANDEXPRAKTIKUMAPI + url, {
      ...options,
      method: METHODS.PATCH,
    });
  }
  delete(url: string, options: HTTPOptions) {
    return this.request(process.env.YANDEXPRAKTIKUMAPI + url, {
      ...options,
      method: METHODS.DELETE,
    });
  }

  request<F>(url: string, options: HTTPOptions): Promise<F> {
    const {
      method,
      data,
      headers = { "content-type": "application/json" },
      withCredentials = true,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'json';
      Object.entries(headers).forEach(([key, value]) => {
        return xhr.setRequestHeader(key, value);
      });

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      xhr.onload = () => resolve(xhr.response);
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log(`Ответ от сервера: ${xhr.status} | ${xhr.statusText}`);
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else {
      xhr.send(data);
      }
    });
  }
}
