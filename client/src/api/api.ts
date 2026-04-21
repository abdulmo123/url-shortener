import type { UrlFormReq } from "./models";

const BACKEND_URL = "http://localhost:3000"

export async function generateShortUrl(req: UrlFormReq) {
    let url = `${BACKEND_URL}/gen-url`;

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    });
};