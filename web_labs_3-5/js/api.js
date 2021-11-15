const RESOURSE_URL = "http://127.0.0.1:5000/book";


const baseRequest = async({ urlPath = "", method = "GET", body = null }) => {
    try {
        const request = {
            method,

            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        };

        if (body) {
            request.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURSE_URL}${urlPath}`, request);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};

export const getAllBooks = async() => {

    const response = await baseRequest({ method: "GET" });
    return await response.json();
};

export const addBook = (body) => baseRequest({ method: "POST", body });

export const updateBook = (id, body) => {
    baseRequest({ urlPath: `/${id}`, method: "PUT", body });
}

export const deleteBook = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });