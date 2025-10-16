
I’m using the Playwright automation framework to practice creating and executing end-to-end test scripts on a demo web application, exploring browser interactions, locators, and page object patterns.


🧪 Playwright Essential Branch — Test Suites Overview

This repository is used to practice end-to-end (E2E) automation using Playwright, focusing on:
	•	Browser interaction and element locators
	•	Page Object Model (POM) design
	•	API mocking and HAR replay
	•	Reusable helper functions and data factories

⸻

📘 Test Suite: contact_page (Please switch to contact_page Branch)

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