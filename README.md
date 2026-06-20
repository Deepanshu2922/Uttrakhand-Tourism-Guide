# Uttarakhand Tourism Guide – AI-Powered Homestay & Travel Recommendation Platform

Week 2 frontend skeleton — React + Vite + Tailwind CSS + React Router.

## What's included
- React Router setup with 4 routes: `/`, `/about`, `/dashboard`, `/login`
- Reusable components: `Navbar`, `Hero`, `Card`, `Footer`
- Tourism-themed Tailwind styling (forest green / sky blue / earth tones)
- Fully responsive layout (no horizontal scroll, cards stack on mobile, nav wraps)
- No backend, auth, database, or AI logic yet — placeholder content only

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`) in your browser.

## Folder structure

```
src/
  components/
    Navbar.jsx
    Hero.jsx
    Card.jsx
    Footer.jsx
  pages/
    Home.jsx
    About.jsx
    Dashboard.jsx
    Login.jsx
  App.jsx
  main.jsx
  index.css
```

## Next steps (future weeks)
- Connect a backend API for destinations and homestay listings
- Implement real authentication on the Login page
- Build out the AI travel recommendation engine
- Add the booking inquiry form and submission flow
