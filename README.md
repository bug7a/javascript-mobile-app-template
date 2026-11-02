# JavaScript Mobile App Templates

Five mobile app templates for Android, iOS and the web, made with [basic.js](https://bug7a.github.io/basic.js/) and [JS Components](https://github.com/bug7a/js-components). Pick the one closest to your app and change its settings, data and pages. There is no build step: an app is plain HTML and JavaScript.

**[See the live demos](https://bug7a.github.io/javascript-mobile-app-template/)**

| Template | What it is | Design width | Language |
|---|---|---|---|
| [`starter`](starter/) | The plain frame: tabs, pages, side menu, sheets. Start here for your own app. | 390 px | English |
| [`classic`](classic/) | A complete app with many component examples, lists, settings and a lock screen. | 600 px | English |
| [`shop`](shop/) | A full store: catalog, product page, cart, checkout, orders, favorites. | 390 px | English, Turkish |
| [`booking`](booking/) | Appointments: services, people, free times, changing and cancelling. | 390 px | English, Turkish |
| [`coffee-shop`](coffee-shop/) | A small ordering app with a loyalty card. | 390 px | Turkish |

Every folder is a ready app with its own `basic/` and `comp/`, so one folder can be used alone. Each one has its own `readme.md`.

> **Status:** the templates are tested in Chrome, with phone emulation. They have not been built into a native app or run on a real device yet, so test your app on real phones before you release it. `shop` and `booking` are demos: no payment is taken and nothing is sent to a server.

The templates are developed in [js-components](https://github.com/bug7a/js-components/tree/main/04-templates/mobile-app-template). This repository holds their ready copies.

## Try a template

Open a template folder with a web server (the VS Code Live Server extension) and go to its `index.html`. To see it as a phone, turn on the device toolbar of the developer tools of your browser.

## Change a template

| File | What it holds |
|---|---|
| `app/settings.js` | **Change this first:** the name, the colors, the tabs, `storageKey`. |
| `app/app.js` | The frame: tabs, pages, the back button, sheets, safe areas. |
| `pages/*.js` | The pages. A page is one `App.addPage({ id, title, create })`. |
| `assets/` | Icons and pictures. |

An app is drawn at a fixed design width and scaled to the screen with `page.fit()`: write every size in px of the design.

## Android and iOS with Capacitor (recommended)

You need Node.js, Android Studio for Android, and a Mac with Xcode for iOS.

```sh
mkdir my-app && cd my-app
npm init -y
npm install @capacitor/core
npm install -D @capacitor/cli
npx cap init "My App" com.example.myapp --web-dir www
```

Copy the files of a template folder into `www`, then:

```sh
npm install @capacitor/android @capacitor/ios @capacitor/app
npx cap add android
npx cap add ios
npx cap sync
npx cap open android   # or: npx cap open ios
```

`@capacitor/app` makes the Android back button work; `app/app.js` finds it by itself. Run `npx cap sync` after every change. Guide: <https://capacitorjs.com/docs/getting-started>

## Android and iOS with Cordova

```sh
npm install -g cordova
cordova create my-app com.example.myapp "My App"
cd my-app
```

Replace the content of `www` with the files of a template folder, and open the `cordova.js` line in `www/index.html` (remove the comment around it). Add to `config.xml`:

```xml
<preference name="DisallowOverscroll" value="true" />
<preference name="Orientation" value="portrait" />
```

```sh
cordova platform add android
cordova platform add ios
cordova run android
```

Guide: <https://cordova.apache.org/docs/en/latest/guide/cli/>

## Notes for a mobile app

- **The notch:** `App.safeArea` keeps the header and the tab bar out of it. Check this on real Android phones: some WebView versions report wrong values.
- **The keyboard:** check that a focused field stays visible, on Android and on iOS.
- **Saved data:** `App.save()` uses `localStorage`. The system can clear it and it is not encrypted, so do not keep passwords or tokens there.
- **A server:** a real shop or booking app must check prices, stock and free times on a server.
- **Payments:** use the SDK or the page of your payment provider. Digital goods sold in an app usually have to use in-app purchase.
- **Store review:** Apple may reject an app that is only a thin wrapper around a website. Both stores ask for a privacy policy.

## License

Apache License, Version 2.0. See [LICENSE](LICENSE).
