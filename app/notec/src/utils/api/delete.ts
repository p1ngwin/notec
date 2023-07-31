import { defaultFetchOptions } from "../helpers/utils";

export const deleteData = async (
  url: RequestInfo,
  id: any,
  token?: string
): Promise<any> => {
  if (!token) return new Error("Provide token!");

  const fetchOptions = {
    ...defaultFetchOptions,
    method: "DELETE",
    headers: {
      ...defaultFetchOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, {
    ...fetchOptions,
    body: JSON.stringify(id),
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  }

  if (response.status === 401) {
    return response;
  }

  if (response.status === 404) {
    return console.log("Not found");
  }
};
