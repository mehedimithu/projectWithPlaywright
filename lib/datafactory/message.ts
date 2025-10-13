import { Page, expect, request } from "@playwright/test";


export async function createAMessage(name: string, subject: string, message: string, userAuthFile: string, page: Page) {
    const requestContext = await request.newContext();

    const response = await requestContext.post(process.env.API_URL + '/messages', {
        data: {
            "name": "Jane Doe",
            "subject": "customer-service",
            "message": "Hello! This message is just for testing purposes to ensure everything is working correctly."
        },
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US',
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5wcmFjdGljZXNvZnR3YXJldGVzdGluZy5jb20vdXNlcnMvbG9naW4iLCJpYXQiOjE3NjAyODYzMzMsImV4cCI6MTc2MDI4NjYzMywibmJmIjoxNzYwMjg2MzMzLCJqdGkiOiJJVzV3Y2J3T2l6UTd0Qjd3Iiwic3ViIjoiMDFLN0NKRDlFRzRXVEdQSjM4REhERVBZUE0iLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3Iiwicm9sZSI6InVzZXIifQ.nyr4n2CAbbzb9hUx4rKoxjngzxGxdzr2G4i-xPir8nI',
            Connection: 'keep-alive',
            'Content-Length': '152',
            'Content-Type': 'application/json',
            Host: 'api.practicesoftwaretesting.com',
            Origin: 'https://practicesoftwaretesting.com',
            Referer: 'https://practicesoftwaretesting.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.7390.37 Safari/537.36',
            'sec-ch-ua': '"HeadlessChrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    });
    expect(response.status()).toBe(200);
    return response.status();
}


