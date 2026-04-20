import type { UrlFormReq } from "./models";

const BACKEND_URL = "http://localhost:3000"

export function generateShortUrl(req: UrlFormReq) {
    let url = `${BACKEND_URL}/gen-url`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(req),
    });
};