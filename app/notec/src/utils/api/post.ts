export const postData = async (url: RequestInfo, body: any): Promise<any> => {
    console.log("Body is", body)
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        return response
    }

    if (response.status === 401) {
        return response;
    }

    if (response.status === 404) {
        return console.log("Not found");
    }
}