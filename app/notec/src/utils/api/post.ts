import { defaultFetchOptions } from "../helpers/utils";

export const postData = async (
  url: RequestInfo,
  body: any,
  token?: string
): Promise<any> => {
  if (!token) return new Error("Provide token!");

  const fetchOptions = {
    ...defaultFetchOptions,
    method: "POST",
    headers: {
      ...defaultFetchOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, {
    ...fetchOptions,
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response;
  }

  if (response.status === 401) {
    return response;
  }

  if (response.status === 404) {
    return console.log("Not found");
  }
};
