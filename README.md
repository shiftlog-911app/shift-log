# Shift Log

A patrol activity tracker that runs in the phone's browser and works offline.
Tap or type charges as you go, start and end shifts, and get monthly numbers that
match the FPD Monthly Citation Report and Monthly Activity Report line for line.

**Everything stays on the phone.** There is no server, no account and no sign-in.
Nothing is sent anywhere. Log charge types only: no names, plates, DOBs, addresses
or case numbers.

## Set it up on your phone (iPhone)

1. Open the link in **Safari**.
2. Tap **Share**, then **Add to Home Screen**, then **Add**.
3. From now on, open Shift Log from that icon. (The icon and Safari keep separate logs.)

Android: open the link in Chrome, tap the menu, then **Install app** or **Add to Home screen**.

## Using it

- **Start shift** when you go on duty. Logging while off shift starts one for you.
- Tap a tile to add 1. Tap **+#** to add a number at once.
- Or type what happened, e.g. `speeding, no insurance and tint` or `2 speeding`.
  The mic on your keyboard works too.
- **End shift** takes two taps and shows a recap to check against your ticket book.
- **Monthly review** shows both FPD reports. **Copy numbers** copies them as text.
- **Backup & your data:** save a backup file now and then. If you delete the app or
  clear Safari's website data, the log is gone.

## Beta (test) version

`/beta/` is a test copy that gets new features first. It has its own Home Screen
icon (marked BETA), its own offline copy and its own log, so testing never touches
the real one. The main link only changes after the beta has been tried and approved.

## Updating the app (for the maintainer)

1. Make the change in `beta/index.html` (and `beta/sw.js` if needed), bump `RELEASE`
   in `beta/sw.js` and `APP_VERSION` in `beta/index.html`, and publish.
2. Once the beta is approved, copy `beta/index.html` and `beta/sw.js` over the main
   ones, then set the main page's `apple-mobile-web-app-title` back to `Shift Log`.
   Keep each folder's own `manifest.webmanifest` and `icons/`.


Static site, no build step: `index.html`, `sw.js`, `manifest.webmanifest`, `fonts/`, `icons/`
(and the same set in `beta/`). Never rename a category key in `CATS`; counts are
stored by key.
