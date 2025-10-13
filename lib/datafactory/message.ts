import { Page, expect, request } from "@playwright/test";

export async function createAMessage(name: string, subject: string, message: string, userAuthFile: string) {
    //consts
    const requestContext = await request.newContext();
    const storageData = JSON.parse(require('fs').readFileSync(userAuthFile, 'utf-8'));

    // Prepare cookies as a string for the Cookie header
    const cookies = storageData.cookies as { name: string; value: string }[];
    const cookieHeader = cookies.map((cookie: { name: string; value: string; }) => `${cookie.name}=${cookie.value}`).join('; ');

    // Extract the auth-token from localStorage
    const token = storageData.origins[0].localStorage.find((item: { name: string; }) => item.name === 'auth-token')?.value;

    // Send POST request to create a message
    const response = await requestContext.post(`${process.env.API_URL}/messages`, {
        data: {
            "name": name,
            "subject": subject,
            "message": message
        },
        headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: `Bearer ${token}`,
        }

    });
    expect(response.status()).toBe(200);
    return await response.json();
}