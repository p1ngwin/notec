const fetchOptions: RequestInit = {
  method: "DELETE",
  mode: "cors",
  cache: "no-cache",
  credentials: "omit",
  headers: {
    "Content-type": "application/json",
  },
};

export const deleteData = async (url: RequestInfo, id: any): Promise<any> => {
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
