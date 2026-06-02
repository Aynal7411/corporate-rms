# System Architecture

## Overview

The platform is split into a React frontend, an Express API, MongoDB Atlas, Cloudinary for documents, SSLCommerz for application fees, and email notifications through Nodemailer.

## Runtime Flow

1. Public visitors browse company profile pages, officers, news, notices, gallery, and active job circulars.
2. Candidates register, verify email, complete profile, upload documents, apply for jobs, and pay fees.
3. Payment webhooks validate transactions and update application/payment state.
4. Admins review applications, shortlist or approve candidates, and generate admit cards.
5. Approved paid applications receive a roll number, downloadable PDF admit card, QR code, and notification.

## Backend Layers

- `routes`: HTTP endpoints and route-level middleware.
- `controllers`: Request orchestration and response shaping.
- `services`: Business workflows such as auth, payment validation, Cloudinary upload, and admit card generation.
- `models`: Mongoose schemas, validation, indexes, and relationships.
- `middleware`: Authentication, authorization, error handling, uploads, and security.
- `validators`: Request validation rules.
- `utils`: Shared helpers such as token generation and async handler.

## Frontend Layers

- `pages/public`: Public website pages.
- `pages/auth`: Login, registration, password reset, and email verification.
- `pages/candidate`: Candidate dashboard and workflows.
- `pages/admin`: Admin dashboard and management views.
- `components`: Reusable UI, cards, forms, modals, tables, and common layout pieces.
- `services`: Axios API client and domain API functions.
- `store`: Zustand stores for auth, theme, and notifications.
- `routes`: Protected route wrappers and route maps.

## Security Baseline

- Helmet headers
- Strict CORS origin control
- Express rate limit
- Mongo sanitize and XSS protection
- JWT access and refresh tokens
- Password hashing with bcrypt
- Role-based authorization
- Request validation before persistence
- Secure payment validation before state changes
