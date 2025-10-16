I’m using the Playwright automation framework to practice creating and executing end-to-end test scripts on a demo web application, exploring browser interactions, locators, and page object patterns.

# 🎭 Playwright End-to-End Testing Setup
This project uses **[Playwright](https://playwright.dev/)** for end-to-end (E2E) test automation.  
Follow the steps below to install all dependencies and get started.
---

## 🧩 1. Prerequisites

Before installing Playwright, ensure the following are installed on your system:

- **Node.js** ≥ 16

  ```bash
  node -v

  	•	npm or yarn
    •	VS Code (recommended)
  •	Git (for version control)
  ```

⚙️ 2. Install Playwright

Initialize Playwright in your project:
 ```bash 
 npm init playwright@latest 
 ```

This command will:
• Create a basic test structure.
• Install Playwright and browsers.
• Generate playwright.config.ts.

✅ Browsers installed by default:
• Chromium
• Firefox
• WebKit

📁 3. Recommended Project Structure

projectWithPlaywright/
├── tests/
│ ├── login/
│ │ └── login.spec.ts
│ ├── contact/
│ │ └── contact.spec.ts
│ └── lib/ fixtures/
│ └── base.fixture.ts
├── lib/pages/
│ ├── login.page.ts
│ ├── home.page.ts
│ └── contact.page.ts
├── hars/
│ └── product.har
├── lib/ helpers/
│ └── credentials.ts
├── .env
├── playwright.config.ts
└── package.json

🔧 4. Optional Dependencies

Add these as needed:

Environment variables- dotenv  
```bash 
npm install dotenv 
```
Faker data for test input- @faker-js/faker  
```bash  
npm install @faker-js/faker 
```
File utilities- fs-extra 
```bash 
npm install fs-extra 
```
Allure reports- allure-playwright 
```bash 
npm install -D allure-playwright 
```
Linting - eslint 
```bash 
npm install -D eslint 
```
TypeScript- typescript ts-node 
```bash 
npm install -D typescript ts-node 
```


🧪 5. Verify Installation

Run the following command to check Playwright:

```bash 
npx playwright --version 
```

Then execute your first test:
```bash 
npx playwright test login.spec.ts 
```

Open the test report:
```bash 
npx playwright show-report 
```

📘 6. Environment Variables (.env Example)
```bash
API_URL=https://practicesoftwaretesting.com
EMAIL=testuser@demo.com
PASSWORD=secret123
```

✅ Now you’re ready to run and write Playwright tests!

To start the test runner in UI mode:
```bash 
npx playwright test --ui 
```


Notes: Please switch to Branch:  contact_page, home_page

