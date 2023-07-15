export const fetchOptions: RequestInit = {
  mode: "cors",
  cache: "no-cache",
  credentials: "omit",
  headers: {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzi, deflate, br",
  },
};
export const fetchData = async (url: RequestInfo): Promise<any> => {
  try {
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
