import { auth } from "@/auth/useAuth";
import { defaultFetchOptions } from "../helpers/utils";

export const updateData = async (url: RequestInfo, body: any): Promise<any> => {
  const token = await auth.currentUser?.getIdToken();
  if (!token) return new Error("Provide token!");

  const fetchOptions = {
    ...defaultFetchOptions,
    method: "PATCH",
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
