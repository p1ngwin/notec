import { defaultFetchOptions } from "../helpers/utils";

export const fetchData = async (
  url: RequestInfo,
  token?: string
): Promise<any> => {
  try {
    if (!token) return new Error("Provide token!");

    const fetchOptions = {
      ...defaultFetchOptions,
      method: "GET",
      headers: {
        ...defaultFetchOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);

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
  } catch (err) {
    return err;
  }
};
