# Mobile App Template: the starter template

A mobile app made with basic.js and the JS-Component Kit: tabs at the bottom, a header, a side menu, pages that
slide in, sheets from the bottom, a waiting screen and HTML pages inside the app. It is the new version of
[bug7a/web2app](https://github.com/bug7a/web2app) (2026-11-01). Copy this folder to start a more specific app.

Open `index.html` with a web server (the VS Code Live Server extension).

## The design: 390 px

The app is drawn 390 px wide and fitted to the screen (`page.fit(390, 480)`, `App.fitPage()` in `app/app.js`): every
size is a px of that design. A smaller phone shows the same layout a little smaller, with the same lines of text. On a
screen wider than 480 px it is a column of 480 px in the middle. Dialogs and toasts scale with the page.

## The files

| File | What is in it |
|---|---|
| `index.html` | Loads the library, the components, the app and the pages. |
| `app/settings.js` | **Change this first:** the name, the colors, the tabs, the side menu, the first page. |
| `app/app.js` | The frame of the app (`App`). You do not need to change it to add pages. |
| `pages/*.js` | One file per page. |
| `html/about.htm` | A plain HTML page shown in the app (`pages/about.js`). |
| `assets/` | The tab icons, the app icon, the product pictures. |

## A new page

1. Make `pages/my-page.js`:

   ```js
   App.addPage({
       id: "my-page",
       title: "My Page",
       create: function (box, params) {
           App.startCard();
               App.createText("Hello");
               App.createButton({ labelText: "Back to Home", onClick: () => App.open("home") });
           App.endCard();
       },
   });
   ```

2. Load it in `index.html` (`<script src="pages/my-page.js">`).
3. Open it: `App.open("my-page", { any: "params" })`. Put it in `AppSettings.tabs` to make it a tab, or in
   `AppSettings.menu` to show it in the side menu.

- A page scrolls by default: its objects go into a column that is as wide as a phone on a big screen. A page that
  fills its place (a list that scrolls itself, a web view) has `scroll: 0`.
- The timers and the events of a page stop when it is closed if they are made through its box: `box.after()`,
  `box.every()`, `box.listenTo(window, ...)`.
- More keys of a page: `color` (its background), `padding` / `gap` of its column (`padding: 0`: rows from edge to
  edge), `title: (params) => params.title` (a title from the params), `headerContent: function (params) {}` (objects
  at the right of the title, Ex: a small search box).

## What the app gives

| Call | Does |
|---|---|
| `App.open(pageId, params)` | A tab is shown as a tab (the tab that is already seen keeps its scroll and its text); another page slides in over the tabs with a back button. |
| `App.goBack()` | Closes the sheet, the menu or the page on top. The Android back button, the back of the browser and Escape call it. |
| `App.refreshTab()` | Makes the tab under the pages again (after a page over it changed its data). |
| `App.openSheet({ titleText, height, content })` | A panel from the bottom. Returns it (`sheet.close()`). |
| `App.wait(promise)` | The waiting screen while a task works. Returns the result. |
| `App.save(name, value)`, `App.load(name, defaultValue)` | The saved data of the app. |
| `App.setTabBadge(pageId, count)` | The number on a tab. |
| `App.startCard()` ... `App.endCard()`, `App.createCaption(text)`, `App.createText(text)`, `App.createButton(params)` | The parts of a page. |
| `App.colors` | The colors of `AppSettings.colors`. |
| `App.whenStarted(func)` | Runs `func` when the app is ready. |

Components used: `SmartButton`, `BottomBar` (+ `Badge`), `SidePanel`, `ItemList` (+ `SearchInput`), `InputB`,
`CheckBox`, `Toggle`, `WebView`, `LoadingScreen`, `Dialog`, `Toast`, `Tooltip`.

## The tab icons

`BottomBar` needs two PNG files per tab: `name.png` and `names.png` (the selected one, in the accent color). The
ones in `assets/tabs/` are 120 x 120, made from `assets/ui-bottom-bar/*.svg` of the repository.

## A mobile app (Android, iOS)

The app runs in Capacitor (recommended) or Cordova: put the files of this folder in the `www` folder of the
native project. The steps are in the [main readme](../README.md).

- **Capacitor:** <https://capacitorjs.com/docs/getting-started>. Capacitor adds `window.Capacitor` to the page
  itself (only an old project with `"bundledWebRuntime": true` needs the `capacitor.js` line of `index.html`).
  Plugins are used as `Capacitor.Plugins.Name`. Install `@capacitor/app` for the Android back button.
- **Cordova:** <https://cordova.apache.org/docs/en/latest/guide/cli/>. Open the `cordova.js` line in `index.html`; the
  app starts after `deviceready`. In `config.xml`: `<preference name="DisallowOverscroll" value="true" />`,
  `<preference name="Orientation" value="portrait" />`.

The back of the browser (a phone browser, an installed web app): while a page, a sheet or the menu is open, the
history has one more entry, so the back closes it and does not leave the app.

The notch and the home line of a phone are read from `env(safe-area-inset-*)` (`App.safeArea`), so the header and
the tab bar stay out of them.

## Credits

The product pictures: Icongeek26 on [flaticon](https://www.flaticon.com/authors/icongeek26).
