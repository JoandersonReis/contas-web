import axios from "axios";
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 0;
    const message = error.response?.data?.message;
    return Promise.reject(
      new ApiError(
        Array.isArray(message)
          ? "Confira os campos informados."
          : typeof message === "string"
            ? message
            : status
              ? "Não foi possível concluir a operação."
              : "Não foi possível conectar à API. Tente novamente.",
        status,
      ),
    );
  },
);
export async function api<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const response = await apiClient.request<T>({
    url: path,
    method,
    data: body,
  });
  return response.data;
}
