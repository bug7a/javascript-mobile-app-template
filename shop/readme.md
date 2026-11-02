# Mobile App Template: Shop

A complete mobile shop made with basic.js and the JS-Component Kit: a catalog with search, filters and sorting, a
product page with colors and sizes, favorites, a cart with discount codes, checkout, order tracking and an account
page. English and Turkish. It runs without a server: the data is saved on the device, so you can try every step.

Why this template (2026-11-02): an online shop is the kind of app the most businesses can use. `../coffee-shop` is a
small ordering app; this one is a full store.

Open `index.html` with a web server (the VS Code Live Server extension).

## The design: 390 px

The app is drawn 390 px wide and fitted to the screen (`page.fit(390, 480)`, `App.fitPage()` in `app/app.js`): every
size is a px of that design. A smaller phone shows the same layout a little smaller, with the same lines of text. On a
screen wider than 480 px it is a column of 480 px in the middle. Dialogs and toasts scale with the page.

## The pages

| Page | What it does |
|---|---|
| Home (tab) | Search, an offer, the categories, the products on sale, the new ones. |
| Shop (tab) | All the products: search, categories, four sort orders, an empty state. |
| Product | Color (the picture takes the color), size, count, stock, reviews, related products. The add button stays in a fixed footer. |
| Cart (tab) | The lines, the way to free shipping, a discount code (try `WELCOME10`), the totals. A bin shows when one more tap removes a line. |
| Checkout | Address, delivery, payment and the summary on one page. |
| Order, My orders | The status steps (the demo moves one step every 2 minutes), the content, the address. |
| Favorites | The products with a heart. |
| Account (tab) | Orders, favorites, addresses, the language, the reset of the demo. |
| Addresses, New address | Choose, delete and add an address. |

## Make it your shop

| File | Change |
|---|---|
| `app/settings.js` | The name, the money, the shipping prices, the discount codes, the colors, the tabs. |
| `app/store.js` | `Store.products`: your products. `Store.placeOrder()`: send the order to your server here. |
| `app/art.js` | The drawn pictures. With real photos, make `Store.getImage()` return the photo file of a product and its color. |
| `app/texts.js` | The texts. Every text goes through `tx("English text")`; a new language is a new list in `Texts`. |
| `components/shop-ui.js` | The parts of the pages: buttons, chips, the product card, the empty states, the header. |
| `pages/*.js` | One file per page (`orders.js` has two, `account.js` three). |
| `app/app.js` | The frame of the app (a copy of the one in `../coffee-shop`, with `App.createFooter()` and a floating tab bar). |

A page that shows the data listens to changes: `box.listenTo(window, Store.EVENT, redraw)`.

## Before it sells anything

This is a demo: **no payment is taken and no order is sent**. A real shop needs:

- a server for the products, the stock, the orders and the accounts (the prices must be checked there, not on the phone);
- a payment service (Stripe, iyzico...). **Do not add card number fields to the pages**: open the page of the service at
  "Place order" (`pages/checkout.js`);
- the terms of sale, the privacy text and the return rules of your country.

## Checked

Chrome: every step of a purchase with real clicks (29 checks), English and Turkish, 390 x 844 and 360 x 740.
Not checked on a real phone.

The product drawings and the tab icons were made for this template (`app/art.js`, `assets/tabs/`).
