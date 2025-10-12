import { Page, expect, request } from "@playwright/test";

export async function registerAUser(email: string, password: string) {
    
  const apiUrl = process.env.API_URL;
  const requestContext = await request.newContext();

  const response = await requestContext.post(apiUrl + "/users/register", {
    data: {
      first_name: "tester12",
      last_name: "qa",
      dob: "1989-12-08",
      phone: "01712271705",
      email: email,
      password: password,
      address: {
        street: "dhaka",
        city: "dhaka",
        state: "dhaka",
        country: "BD",
        postal_code: "1200",
      },
    }
  });
  
  expect(response.status()).toBe(201);
  return response.status();
}