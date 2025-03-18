import axios from "axios";
import qs from "query-string";
import { ClientConfig, Resource, Category } from "@/types";

export class ResourcesWP {
  private client: ReturnType<typeof axios.create>;

  //   /wp-json/wp-resources/v1
  constructor(config: ClientConfig = {}) {
    this.client = axios.create({
      baseURL: config.baseUrl || "/wp-json/wp-resources/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // this.initInterceptors();
  }

  // private initInterceptors() {
  //   // Request interceptor
  //   this.client.interceptors.request.use(
  //     (config: AxiosRequestConfig) => {
  //       // Modify request config here
  //       // For example, add authentication token
  //       // config.headers.Authorization = `Bearer ${getToken()}`;
  //       return config;
  //     },
  //     (error: AxiosError) => {
  //       // Handle request errors
  //       console.error("Request Error:", error);
  //       return Promise.reject(error);
  //     }
  //   );

  //   // Response interceptor
  //   this.client.interceptors.response.use(
  //     (response: AxiosResponse) => {
  //       // Transform or modify response data
  //       return response;
  //     },
  //     (error: AxiosError) => {
  //       // Handle response errors
  //       console.error("Response Error:", error);

  //       // You can handle specific error cases
  //       if (error.response?.status === 401) {
  //         // Handle unauthorized
  //       }

  //       return Promise.reject(error);
  //     }
  //   );
  // }

  get = async (url: string, params: any = {}) => {
    return await this.client.get(url, {
      params,
      paramsSerializer: (params) => {
        return Object.entries(params)
          .map(([key, value]) =>
            qs.stringify({ [key]: value }, { arrayFormat: "comma" })
          )
          .join("&");
      },
    });
  };

  post = (url: string, data: any) => this.client.post(url, data);

  getSettings = () => this.client.get("/settings");

  getResources = (): Promise<{ data: Resource[] }> =>
    this.client.get("/resources");

  getResource = (slug: string): Promise<{ data: Resource }> =>
    this.client.get(`/resource/${slug}`);

  getCategories = (): Promise<{ data: Category[] }> =>
    this.client.get("/categories");

  sendEmail = (data: any) => this.client.post("/send-email", data);
}
