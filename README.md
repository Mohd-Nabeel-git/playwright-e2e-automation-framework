![Playwright Tests](https://github.com/Mohd-Nabeel-git/playwright-e2e-automation-framework/actions/workflows/playwright.yml/badge.svg)

# 🧪 Playwright Automation Framework (TypeScript)

A production-ready end-to-end test automation framework built using **Playwright + TypeScript**, designed with scalable architecture, CI integration, and real-world SDET practices.

---

## 🚀 Features

* ✅ End-to-End (E2E) automation for complete user workflows
* ✅ Page Object Model (POM) with centralized Page Object Manager
* ✅ Storage State-based authentication (avoids repeated login)
* ✅ Data-driven testing using JSON
* ✅ Edge case validation for Cart, Checkout, and Login
* ✅ API testing using Playwright `APIRequestContext`
* ✅ GitHub Actions CI integration
* ✅ HTML reporting with trace, screenshots & video on failure
* ✅ CI-optimized execution (retries, workers control)

---

## 🧱 Tech Stack

* **Framework:** Playwright
* **Language:** TypeScript
* **Architecture:** POM + Fixture-based design
* **CI/CD:** GitHub Actions
* **Reporting:** Playwright HTML Reporter
* **Test Data:** JSON

---

## 📁 Project Structure

```
.
├── tests/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── E2E/
│   └── API/
├── pages/
├── utils/
├── fixtures/
├── playwright.config.ts
├── global-setup.ts
└── .github/workflows/playwright.yml
```

---

## 🔄 Test Coverage

### 🔐 Authentication

* Valid & invalid login scenarios
* Storage state persistence

### 🛒 Cart

* Add/remove single & multiple items
* Cart badge validation
* Data consistency (Inventory → Cart → Checkout)

### 🧾 Checkout

* Form validation (empty, spaces, invalid inputs)
* Data-driven edge cases
* Price calculations (item total, tax, final total)

### 📦 Order Flow

* Complete E2E purchase flow
* Order confirmation validation

### 🌐 API Testing

* GET/POST validation using ReqRes
* Response validation

---

## ⚙️ Setup & Installation

```bash
# Clone repo
git clone <https://github.com/Mohd-Nabeel-git/playwright-e2e-automation-framework.git>

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install
```

---

## ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/E2E/e2e.spec.ts

# Run in headed mode (debug)
npx playwright test --headed
```

---

## 📊 Reports & Debugging

* HTML report generated in:

  ```
  playwright-report/
  ```

* Debug artifacts available on failure:

  * Screenshots 📸
  * Trace Viewer 🔍
  * Video 🎥

```bash
# Open HTML report
npx playwright show-report
```

---

## 🔁 CI Integration

This project uses **GitHub Actions** to:

* Run tests on every push & pull request
* Install dependencies and browsers
* Execute Playwright tests
* Upload HTML reports & debug artifacts

---

## 🧠 Key Highlights (SDET Practices)

* ✔ Clean separation of test logic and assertions
* ✔ Reusable page methods with single responsibility
* ✔ Optimized CI execution using retries & worker control
* ✔ Failure debugging using trace, screenshots, and video
* ✔ Scalable test structure (feature-based organization)

---

## 📌 Future Improvements

* Add cross-browser testing (Firefox, WebKit)
* Integrate test tagging strategy (@smoke, @regression)
* Add test reporting dashboard (Allure)
* Implement network mocking within framework

---

## 👨‍💻 Author

**Mohd Nabeel**

* GitHub: https://github.com/Mohd-Nabeel-git
* LinkedIn: https://www.linkedin.com/in/mohd-nabeel-18231a319/

---

## ⭐ If you found this helpful, consider giving it a star!
