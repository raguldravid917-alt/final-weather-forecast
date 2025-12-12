# Weather Dashboard (React + Vite)

### Quick start
1. Clone or create a folder and copy the files shown in this document.
2. Create `.env` at project root with:

```
VITE_OWM_KEY=your_openweathermap_api_key_here
```

3. Install dependencies:

```
npm install
```

4. Run dev server:

```
npm run dev
```

### GitHub push (example commands) — run these in your project folder

```
git init
git add .
git commit -m "Initial commit - Weather Dashboard"
# create repo on GitHub (use UI) then:
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

### Deploy options (summary)
- Vercel: connect the GitHub repo and deploy (or `vercel` CLI).
- GitHub Pages (simple): build, then publish `dist/` via GitHub Pages or `gh-pages` package.

Full deploy commands and notes are included below in the `DEPLOY.md` file.

// FILE: DEPLOY.md
# Deploy

## Vercel (recommended)
1. Push repo to GitHub.
2. Go to vercel.com → Import Project → select your repo → Deploy.

## GitHub Pages (using `gh-pages`)
1. `npm install --save-dev gh-pages`
2. add to `package.json`:
```
"homepage": "https://<your-username>.github.io/<your-repo>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. `npm run deploy`

---