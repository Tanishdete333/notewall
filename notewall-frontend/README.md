# Notewall — frontend (with Clerk auth)

React + Vite frontend for the Notewall sticky-note board app, now with
per-user authentication via Clerk.

## Setup

```bash
npm install
cp .env.example .env
# fill in:
#   VITE_API_URL=http://localhost:3000
#   VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx   (from clerk.com dashboard)
npm run dev
```

## What changed from the non-auth version

- `main.jsx` wraps the app in `<ClerkProvider>`
- `App.jsx` shows a sign-in gate (`<SignedOut>`) or the board (`<SignedIn>`)
  depending on auth state, and shows `<UserButton />` in the masthead for
  profile/sign-out
- `src/api/notes.js` now requires a `getToken` function (from Clerk's
  `useAuth()` hook) and attaches it as `Authorization: Bearer <token>` on
  every request

## Backend contract expected

- `POST /notes` — requires `Authorization: Bearer <token>` header, JSON body
  `{ text, color }`, returns `{ message, note }` (the created note, with userId)
- `GET /notes` — requires auth header, returns only the signed-in user's notes,
  `{ message, notes }`, sorted newest first
- `DELETE /notes/:id` — requires auth header, only deletes if the note belongs
  to the signed-in user, returns `{ message }`

Requests without a valid token should get a `401` from the backend's
`requireAuth()` middleware — the frontend's sign-in gate prevents the app
from even trying to call the API until a real session exists.
