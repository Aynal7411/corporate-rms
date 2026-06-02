# Company Profile & Recruitment Management System

A MERN stack platform for a public company website, officer/news/notice management, candidate applications, payments, and admit card generation.

## Quick Start

1. Copy environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Install dependencies:

```bash
npm run install:all
```

3. Run both apps:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend runs on `http://localhost:5000`.

## First Modules Included

- System architecture and roadmap in `docs/`
- Express API with security middleware, JWT auth, MVC folders, and Mongoose models
- Public CRUD APIs for jobs, officers, news, notices, contact messages, and dashboard analytics
- Candidate application, payment status, and admit-card generation service skeleton
- React 19 + Vite frontend shell with Tailwind, routing, Zustand auth state, Axios token refresh, public pages, candidate dashboard, and admin dashboard

## Next Recommended Module

Connect real MongoDB/Cloudinary/SSLCommerz credentials, then complete admin CRUD forms and candidate application submission flow end to end.
