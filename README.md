# Bandung Family Getaway 2026

A mobile-friendly, editable React itinerary dashboard with a premium navy and slate-blue visual theme for 2 adults and one 4-year-old child, travelling 22–27 November 2026.

## Included
- Flight, Whoosh rail, ground transport and accommodation details
- Editable day-by-day itinerary with add/edit/remove controls
- Restaurant and activity ideas bank; add an idea to any day
- Budget categories, YouTrip and physical cash allocation
- Packing checklist with progress tracking
- Light/dark mode
- Automatic browser LocalStorage saving
- JSON backup and restore

## Important planning notes
This project starts with the latest planning details available when it was generated. Items marked “to confirm”, “estimate” or “not purchased” are deliberately not presented as confirmed bookings. Recheck airline flight numbers, Whoosh schedules/fares, transfer quotes, driver details, attraction opening hours and restaurant suitability before travel.

The initial spending split is S$500 physical-cash allocation and S$700 YouTrip from a S$1,200 pool. It is editable in the Budget tab. The initial cash equivalent is an editable planning estimate, not a live exchange quote.

## Run locally
1. Install Node.js (LTS).
2. Open a terminal in this project folder.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite.

## Publish to GitHub Pages
1. Create a **public** GitHub repository named `bandung-family-getaway-2026`.
2. Upload/push the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages** and set the source to **GitHub Actions** if using a workflow, or use the `gh-pages` branch deployment below.
4. For the included `gh-pages` deployment script:
   ```bash
   npm install
   npm run deploy
   ```
5. In repository **Settings → Pages**, select the `gh-pages` branch and `/ (root)` if it is not selected automatically.

The Vite `base` path in `vite.config.js` is set to `/bandung-family-getaway-2026/`. If you rename the repository, update that value to match.

## Saving and privacy
Edits are automatically saved in the current browser on the current device. LocalStorage is not cloud sync. Use Backup / Restore to transfer your latest data between devices. Do not clear browser site data unless you have exported a backup.
