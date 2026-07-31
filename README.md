# Ralph & Shaira RSVP — Enhanced Build

## What changed

- **Realistic invitation opening:** a layered paper envelope with a textured body, front folds, 3D hinged flap, dimensional wax seal, letter extraction, subtle desktop pointer tilt, and optional synthesized paper/seal cues. It is responsive from small phones to desktop.
- **Cleaner reveal flow:** after the letter is drawn out, the site fades into the hero. The previous second automatic envelope effect is suppressed so the opening feels intentional rather than repetitive.
- **Scroll polish:** existing section reveals are retained and made more reliable; added low-cost decorative scroll accents and independent reveals for selected details. Animations use `IntersectionObserver` and a request-animation-frame scroll loop rather than expensive per-element scroll listeners.
- **Accessibility:** keyboard activation (`Enter`/`Space`), focus styling, semantic button behavior, modern mobile viewport sizing, scroll offset for the fixed navigation, and a complete `prefers-reduced-motion` fallback.
- **Runtime fixes / performance:** fixed the missing `createParticles()` function that could stop the invite page after validation; particle/petal systems are initialized once, reduce particle count on phones, and stop creating petals when the tab is hidden. Animation work uses composited `transform`/`opacity` wherever possible.
- **Apps Script cleanup:** consolidated duplicate `doGet`/`doPost` declarations, added a `LockService` transaction around RSVP consumption (prevents two simultaneous uses of the same invite), and HTML-escaped notification-email fields.
- **Live Wall rebuilt from scratch:** replaced the former Live Wall markup, styles, and client code with one clean responsive page. It keeps the existing Google Apps Script photo/upload/reaction endpoints while adding a streamlined gallery, latest-photo stack, sort/refresh controls, upload dialog, likes, downloads, lightbox, and accessible mobile controls.
- **Invitation Link Studio:** moved personalized RSVP-link creation into the authenticated tracker, with guest name, guest allowance, optional invite code, reusable website URL, and one-click copy. The standalone `generate-links.html` tool was removed.

## Files to deploy

The regular site files are unchanged in name, so replace the corresponding files in your project with:

- `index.html`
- `styles.css` — includes all invitation, scroll, and Candle/Cord/Veil enhancements
- `main.js`
- `live-wall.html` — includes its Live Wall visual enhancements in its existing inline style block
- `rsvp-tracker.html`

Keep your existing `images/` directory. The standalone legacy link generator was removed; use the authenticated Invitation Link Studio inside `rsvp-tracker.html` instead. No additional enhancement stylesheet files are required.

## Apps Script deployment

`rsvp-gs.txt` does not automatically change the deployed Google Apps Script.

1. Copy the enhanced `rsvp-gs.txt` into the Apps Script project.
2. In **Apps Script → Project Settings → Script properties**, create a property named **`TRACKER_ADMIN_PASSWORD`**. Set its value to your new tracker password. Do **not** place this password in `rsvp-tracker.html`.
3. Save it and create a **new version**.
4. Update/redeploy the web app using the same deployment if you want to keep the current `/exec` URL.
5. Open `rsvp-tracker.html`, sign in, refresh the dashboard, then test a deletion. The browser now stores only a short-lived opaque session token; list and delete requests are rejected by Apps Script without that server-issued token.
6. Test a fresh personalized invitation link and then test the same link again to confirm the `already_used` state.

## Tracker authentication model

The tracker password is now verified inside Google Apps Script through Script Properties rather than being embedded in browser JavaScript. The tracker posts the password once with a random login request ID, receives a server-issued token through a short-lived polling result, and passes that token to protected list/delete endpoints. Tokens expire from Apps Script CacheService after up to six hours and can be revoked with **Sign Out**.

This protects RSVP names and contacts from anonymous `list`/`delete` calls. Keep the tracker URL private and use a strong, unique Script Property password. Also validate invite hashes against a server-side allowlist if you need personalized invite links to be tamper-resistant.

## Validation performed

- Parsed `main.js` with Node syntax checking.
- Parsed the Apps Script source as JavaScript after its cleanup.
- Verified the HTML references the new stylesheet and script ordering.

The root URL intentionally displays the invalid-invitation screen; use a generated personalized URL when testing the envelope flow.
