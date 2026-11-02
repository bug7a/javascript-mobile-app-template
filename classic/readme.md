# Mobile App Template: the classic template

The look and the small motions of
[bug7a/javascript-mobile-app-template](https://github.com/bug7a/javascript-mobile-app-template), rebuilt
(2026-11-01) with the current basic.js and the components of the kit, on the frame of `../starter`
(pages, the back of Android / the browser / Escape, sheets, the lock screen, saved data).

Open `index.html` with a web server (the VS Code Live Server extension).

## The design: 600 px

The app is drawn 600 px wide and fitted to the screen (`page.fit(600, 800)`), as the original: every size in the
template is a px of that design. On a phone the design fills the width; on a wider screen it is a column of at most
800 px in the middle.

The components that were made from the old template are drawn in px of the design too, so they look as they did.
The ones made for screen px (Tabs, Dialog, Toast, Tooltip, SelectBox, SelectDate) keep their size on the screen:
the app sets `basic.uiScale = 1 / page.zoom` (basic.js v26.11.01), and they take it as their `scale`. Their sizes
(Ex: the width of a Tabs) are then screen px.

## The components of the frame

| Part | Component |
|---|---|
| The top bar of a tab (title, back arrow, ⋮) | `AppBar` (`comp/app-bar.js`) |
| The header of a page over the tabs (back link, big title) | `PageHeader` (`comp/page-header.js`) |
| The bottom bar (the circle, the name over it, the number of a tab) | `BottomBar` (`labelMode: "float"`, item colors, `badge`) |
| The side menu and the sheets (in the app column, round corners, they only slide) | `SidePanel` (`container`, `style.panel.round`, `fade: 0`) |
| The soft circle of a tap | `TapEffect.start()` |
| The rows of Settings | `SettingsRow`, `SettingsRow.createSection()` |
| The lists (Search, Usage Examples with its section titles and the dark flash, the side menu) | `ItemList` |
| The switches, the stepper | `Toggle` (`styleName: "classic"`), `Stepper` (`styleName: "ozden"`) |

## The files

| File | What is in it |
|---|---|
| `index.html` | Loads the library, the components, the app and the pages. |
| `app/settings.js` | **Change this first:** the name, the colors, the tabs (and the color of their circle), the side menu. |
| `app/app.js` | The frame of the app (`App`): the views, the bars, the side menu, the sheets, the lock screen. |
| `pages/home.js` | Categories (a search box finds them), the cards of the selected category, the link card. |
| `pages/search.js` | A list with prices that went up or down; a row opens a sheet (`ProductPreview`) that adds a task. |
| `pages/examples.js`, `pages/example.js` | Usage Examples: the components (Title, Left Title, Custom Tab Bar, Period Bar too), the views, the page templates; each row opens its example. |
| `pages/tasks.js` | Tasks (saved): add, select (tomato), delete the selected ones; the rows slide to their places. |
| `pages/settings.js` | Rows in groups (SettingsRow): switches, lists, the color, the font size, links. |
| `pages/dialogs.js` | The sheets: `ColorDialog`, `EditItemDialog`, `ConfirmDialog`. |
| `pages/info-pages.js` | secondView / defaultView examples, Security, Privacy (an HTML page), Menu Style. |
| `pages/template-pages.js` | Template A, My Documents (a grid of files), the page of a menu item. |
| `pages/lock.js` | The lock screen (`App.lock()`). |
| `html/privacy.htm` | A plain HTML page in the app. |
| `assets/` | The pictures (credits: `assets/_attribute.txt`). |

## The views and their motions

| View | How it opens | Motion |
|---|---|---|
| A tab | `App.open("search")`, the bottom bar | At once. The circle slides to the tab and takes its color (0.3 s); the name of the tab shows over it for 600 ms. |
| A page over the tabs | `App.open("security")` | Slides in from the right (0.2 s). Header: a small blue back link over a big title. |
| A page in the place of the tab | a page with `view: "default"` | At once, with a back arrow in the top bar and no bottom bar. |
| A sheet | `App.openSheet({ height, content })` | Rises from the bottom over a dark cover (0.2 s). |
| The side menu | ⋮ of the top bar | From the right over a dark cover (0.2 s); Settings > Menu Style can change its side. |
| The lock screen | `App.lock()` | At once; only a log in closes it. |
| A tap anywhere | – | A soft circle where the screen was tapped (0.2 s). |

## A new page

```js
App.addPage({
    id: "my-page",
    title: "My Page",
    create: function (box, params) {
        Label({ text: "Hello", fontSize: 20 });
    },
});
```

Load it in `index.html` and open it: `App.open("my-page")`. Put it in `AppSettings.tabs` to make it a tab.

More keys of a page: `scroll` (0: the page fills its place), `color`, `padding` / `gap`, `title: (params) => ...`;
a tab: `topBar`, `titleAlign`, `topBarLine`, `bottomBarLine`; a page over the tabs: `backText`, `header`,
`headerColor`, `backIcon`, `backColor`; `view: "default"`. See the header of `app/app.js`.

## What the app gives

`App.open`, `App.goBack`, `App.refreshTab`, `App.openSheet`, `App.wait`, `App.save` / `App.load`,
`App.setTabBadge`, `App.lock` / `App.unlock`, `App.setMenuSide`, `App.whenStarted`, `App.colors`: see the header of
`app/app.js`.

## A mobile app (Android, iOS)

As `../starter/readme.md`: Capacitor (no script line needed) or Cordova (`cordova.js`); the notch and the
home line are read from `env(safe-area-inset-*)`.

## Credits

The pictures are from [flaticon](https://www.flaticon.com/): the designers are in `assets/_attribute.txt`.
