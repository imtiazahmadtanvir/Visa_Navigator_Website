# Visa Navigator

## Links

- Live site: https://visa-navigator-client-67a8d.web.app/
- Client repo: https://github.com/programming-hero-web-course2/b10-a10-client-side-imtiazahmadtanvir
- Server repo: https://github.com/programming-hero-web-course2/b10-a10-server-side-imtiazahmadtanvir

## Description

Visa Navigator is a single-page application that helps users find visa information, apply for visas, and track their applications. The app includes authentication (Firebase), a responsive UI, dark/light themes, and admin functionality for managing visas and applications.

## Key features

- Browse visa listings with detailed information
- Apply for visas and track your applications
- User authentication (Firebase Email/Password + Google)
- Add and manage visa entries (admin)
- Responsive design and dark/light mode

## Tech stack

- Frontend: React, Vite, TailwindCSS, DaisyUI
- Client auth: Firebase Authentication
- Backend: Node.js + Express + MongoDB (separate server repo)
- Hosting: Firebase Hosting (client), see server repo for server hosting

## Quick start

Prerequisites:
- Node.js (16+ recommended)
- npm (or yarn)
- Firebase project (for hosting and Firebase Authentication)

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
# open the URL printed by Vite (usually http://localhost:5173)
```

3. Build production assets

```bash
npm run build
```

The build output is written to the `dist/` folder (this matches `firebase.json`).

## Deploy to Firebase Hosting

This project uses Firebase Hosting with `dist` as the public directory (see `firebase.json`). You can deploy using the Firebase CLI. If you don't have the CLI installed globally, `npx` works without installing.

1. Login to Firebase (interactive)

```bash
npx firebase-tools login
```

2. Deploy hosting

```bash
npx firebase-tools deploy --only hosting
```

If you have multiple Firebase projects, add `--project PROJECT_ID` to the deploy command.

For non-interactive CI deploys, create a token with:

```bash
npx firebase-tools login:ci
# use the resulting token in CI as FIREBASE_TOKEN
```

## Environment & configuration

- Firebase client config is typically stored in `src/firebase/firebase.config.js` and uses values from your Firebase console.
- Do NOT commit real credentials. In production / CI, use environment variables or secrets.

Admin behavior (development)

- This app treats a specific email as the admin user and shows admin-only links and data to that user. The default development admin credentials are:

	- Email: `admin@gmail.com`
	- Password: `Admin1234`

- To use the admin account during development:
	1. Create a user with the above email/password in your Firebase Console → Authentication → Users, or sign up using the app's Register form with those credentials.
	2. The client checks `user.email` and will show admin-only features when it matches the admin email.

- Security note: These credentials are for local development/testing only. Do not use real or production credentials here, and do not commit secret values to source control. For production, implement role-based access control on the server and/or make the admin email configurable via an environment variable (e.g., `VITE_ADMIN_EMAIL`).

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets to `dist/`
- `npm run preview` — preview production build locally (Vite)

You can add a convenience deploy script to `package.json` if you prefer:

```json
"scripts": {
	"deploy": "npx firebase-tools deploy --only hosting"
}
```

## Notes & recommendations

- For security and performance, consider implementing server-side filtering for user-specific resources (the server should only return data belonging to the authenticated user). Currently the client filters application lists by user email after fetching the full list.
- For CI/CD, use the `login:ci` token or GitHub Actions with `firebase/actions`.

## Contributing

Feel free to open issues or pull requests on the client or server repository. Describe the goal, steps to reproduce, and include screenshots or logs when relevant.

## License

This project does not include a license file. Add one if you plan to make the project public.