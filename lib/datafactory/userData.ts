import { Page, expect, request } from "@playwright/test";

export async function getUserDetails(userAuthFile: string) {
    const requestContext = await request.newContext();
    const storageData = JSON.parse(require('fs').readFileSync(userAuthFile, 'utf-8'));

    //cookies as string
    const cookies = storageData.cookies as { name: string; value: string }[];
    const cookieHeader = cookies.map((cookie: { name: string; value: string; }) => `${cookie.name}=${cookie.value}`).join('; ');

    const token = storageData.origins[0].localStorage.find((item: { name: string; }) => item.name === 'auth-token')?.value;

    // Send GET request to retrieve user details
    const response = await requestContext.get(`${process.env.API_URL}/users/refresh`, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: `Bearer ${token}`,
        
        }
    });

    expect(response.status()).toBe(200);
    return response.json();
}

