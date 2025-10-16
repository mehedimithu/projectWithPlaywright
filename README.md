I’m using the Playwright automation framework to practice creating and executing end-to-end test scripts on a demo web application, exploring browser interactions, locators, and page object patterns.


## 🧪 Playwright Essential Branch — Test Suites Overview

This repository is used to practice end-to-end (E2E) automation using Playwright, focusing on:
	•	Browser interaction and element locators
	•	Page Object Model (POM) design
	•	API mocking and HAR replay
	•	Reusable helper functions and data factories

⸻

## 📘 Test Suite: contact_page (Please switch to contact_page Branch)

Purpose

To validate the end-to-end Contact Message flow, including message creation, viewing, and replying — using data factories, helper functions, and API authentication.

⸻

Test: Create and Validate Contact Message Flow

Test Objective

Verify that a logged-in user can successfully:
	1.	Create a new contact message
	2.	View it from their account
	3.	Add and validate a reply

⸻

Test Steps
	1.	Login with a Valid User
	•	Navigate to the login page
	•	Enter credentials (email and password) retrieved from environment variables
	•	Submit the form and verify successful login (e.g., redirected to home page or user account visible)
	
    2.	Create a Message through /contact Page
	•	Navigate to the /contact page
	•	Use a data factory to generate test message data (e.g., subject, message text)
	•	Fill out and submit the contact form
	•	Validate a success message such as “Thanks for your message! We will contact you shortly.”
	
    3.	View Messages in /account/messages
	•	Navigate to /account/messages as the logged-in user
	•	Verify that the newly created message appears in the message list
	
    4.	View Message Details
	•	Click on the message to open its details view
	•	Validate that the original message content matches the one created earlier

	5.	Add a Text Reply
	•	Enter a reply message in the reply text box
	•	Submit the reply
	•	Wait for confirmation or UI update

	6.	Validate Reply in Replies Section
	•	Confirm that the reply appears in the message thread (replies section)
	•	Optionally verify timestamp or username for accuracy

⸻

Hints / Implementation Notes
	•	Use API data factories to create messages directly via API (requires authentication token).
	•	Store the token in environment variables or retrieve it through a helper function before test execution.
	•	Prefer Playwright fixtures for reusable login logic and data setup.

⸻

## 🏠 Test Suite: home_page (Please switch to home_page Branch)

Purpose

To validate that product data is correctly displayed on the Home Page, whether fetched from the API, dynamically mocked, or replayed from a HAR file.

⸻

Test 1: Verify Products Data in UI from API Data

Purpose

Ensure that products displayed on the UI match the data returned from the API and validate that modified mock data is reflected correctly.

⸻

Test Steps
	1.	Fetch Products from API
	•	Intercept API request to GET /products**
	•	Retrieve real product data and store it in a variable (products)
	•	Log product data in the console for debugging

	2.	Login to the Application
	•	Navigate to the login page
	•	Enter valid credentials from environment variables
	•	Submit the login form and verify successful login

	3.	Navigate to Home Page and Verify UI Data
	•	Navigate to the home page
	•	Wait until all product cards are visible (loading skeletons disappear)
	•	For each product in API response:
	•	Verify product name is visible
	•	Verify product price matches the API value
	•	Ensure each product card is visible on the page

	4.	Mock Modified Product Data
	•	Intercept /products API call again
	•	Modify the first product’s:
	•	name → "Mocked Product"
	•	price → 999.09
	•	in_stock → false
	•	Fulfill the modified response using route.fulfill()

	5.	Verify Mocked Data on UI
	•	Reload or navigate back to the home page
	•	Wait for product list to load
	•	Validate the first product shows:
	•	Name: "Mocked Product"
	•	Price: "999.09"
	•	Availability: "Out of stock"

⸻

Test 2: Validate Products Data is Loading from HAR File

Purpose

Ensure that product data can be loaded and validated using a recorded HAR file for network mocking.

⸻

Test Steps
	1.	Set Up HAR Mocking
	•	Use page.routeFromHAR() to replay requests from the HAR file
	•	File location: .hars/product.har
	•	Match URL pattern: ${process.env.API_URL}/products**
	•	Use update: true the first time to record the HAR file if it doesn’t exist

	2.	Login to the Application
	•	Navigate to the login page
	•	Enter valid credentials
	•	Submit and confirm login success

	3.	Navigate to Home Page
	•	Navigate to the home page
	•	Wait for product data to load (HAR replay simulates the API response)

	4.	Verify Products Data on UI
	•	Locate the product list section
	•	Validate that product name and price from HAR data are displayed:
	•	Product Name: "Combination Pliers"
	•	Product Price: "14.15"

⸻
