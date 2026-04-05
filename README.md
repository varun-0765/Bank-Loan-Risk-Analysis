# Bank Loan Risk Analysis Dashboard

A production-ready **Next.js (App Router) + Tailwind CSS + TypeScript** dashboard for analyzing loan risk and customer default patterns.

## Features

- **Data source:** Local JSON file at `public/data/loan_data.json`
- **Data cleaning utility:** `scripts/clean-loan-data.mjs` to normalize missing values
- **Risk analysis engine:** Segment customers into **Low**, **Medium**, and **High** risk using:
  - Debt-to-Income (DTI) ratio
  - Credit score thresholds
  - Loan-to-Value (LTV) ratio
- **Responsive dashboard UI:**
  - KPI cards (Total Loans, Approval Rate, Total Default Risk)
  - Risk Distribution Pie Chart (Defaulters vs Non-Defaulters)
  - Correlation Scatter Chart (Income vs Loan Amount, color-coded by default)
  - Searchable customer table with risk score and badge

## Project Structure

- `app/` – Next.js App Router pages and layout
- `components/` – Reusable dashboard UI components
- `lib/` – Types, data processing, and risk engine logic
- `public/data/loan_data.json` – Sample dataset
- `scripts/clean-loan-data.mjs` – Data cleaning script

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3) Run data cleaning script

```bash
npm run clean:data
```

This generates `public/data/loan_data.cleaned.json` with missing values filled.

## Build & Lint

```bash
npm run lint
npm run build
```

## Deploy to Vercel

### Option A: Vercel Dashboard

1. Push the repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import this GitHub repository.
4. Keep default settings (Framework: Next.js).
5. Click **Deploy**.

### Option B: Vercel CLI

1. Install CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. For production deployment:

```bash
vercel --prod
```

No additional environment variables are required for this project.
