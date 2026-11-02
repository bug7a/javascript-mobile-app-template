# Mobile App Template: Booking

A mobile app that takes appointments, for any business that works by the hour: a salon, a barber, a clinic, a coach.
Services with a search, a choice of person, a calendar of free times, changing and cancelling an appointment. English
and Turkish. It runs without a server: the data is saved on the device, so you can try every step.

Open `index.html` with a web server (the VS Code Live Server extension).

## The design: 390 px

The app is drawn 390 px wide and fitted to the screen (`page.fit(390, 480)`, `App.fitPage()` in `app/app.js`): every
size is a px of that design. A smaller phone shows the same layout a little smaller, with the same lines of text. On a
screen wider than 480 px it is a column of 480 px in the middle. Dialogs and toasts scale with the page.

## The pages

| Page | What it does |
|---|---|
| Home (tab) | The next appointment or an invitation, the popular services, the team, the address and the hours. |
| Services (tab) | The services, with a search and the categories. From a person on Home: only their services. |
| Book | The person (or "Any"), the day, the time and a note. The confirm button stays in a fixed footer and waits for a time. |
| Bookings (tab) | The upcoming and the past appointments, with a count on the tab. |
| Appointment | Its details; change its time or cancel it; "Book again" for a past one. |
| Account (tab) | The name and the phone, the language, the reset of the demo. |

## The rules of the free times (`app/store.js`)

- A time is shown only if the whole service fits before closing, it is not in the past, and the person is free for its
  whole length (a 2-hour color needs four free half hours in a row).
- The customer can not have two appointments at the same time, also with two different people.
- "Any" gives the appointment to the first person who is free and does that service.
- While an appointment is changed, its own time stays free.
- The time is checked once more at the moment of saving; a time that is gone gives a message and a new choice.
- Closed days and days after `weeksAhead` can not be chosen. A day with no free time moves to the next one that has.

A day is a text (`"2026-11-02"`) in the time of the phone, and a time is minutes from midnight. Do not use
`toISOString()` for a day: late in the evening it gives the wrong day in many countries.

## Make it your business

| File | Change |
|---|---|
| `app/settings.js` | The name, the address, the hours, the closed days, the slot length, the money, the colors, the tabs. The "Mon-Sat" line on Home is a text (`app/texts.js`): change it with the closed days. |
| `app/store.js` | `Store.services` and `Store.people`. `Store.getFreeTimes()`: ask your server here. `Store.saveAppointment()`: send the booking here. |
| `app/texts.js` | The texts. Every text goes through `tx("English text")`; a new language is a new list in `Texts`. |
| `components/booking-ui.js` | The parts of the pages: buttons, chips, the service card, the avatar, the empty states, the header. |
| `pages/*.js` | One file per page (`appointments.js` and `account.js` have two). |
| `app/app.js` | The frame of the app (a copy of the one in `../shop`). |

`BookingUI.avatar()` draws the first letter of a person; load a photo there in a real app.

## Before it takes real appointments

This is a demo: **no appointment is sent to a business**, and the times taken by others are made up
(`Store.isTakenByOthers()`). A real app needs:

- a server that holds the calendar: only it can stop two customers from taking the same time;
- reminders by message or notification (they come from the server);
- the privacy text of your country: a booking holds a name and a phone number, and a clinic holds health data, which
  has stricter rules.

## Checked

Chrome with real clicks and a fixed clock: a whole booking, changing, cancelling, past times, overlaps, closing time,
a closed day, the end of the calendar, the local day in two time zones and a clock change day (25 checks). English and
Turkish, 390 x 844 and 360 x 740. Not checked on a real phone.

The icons were made for this template (`app/app.js`, `assets/tabs/`).
