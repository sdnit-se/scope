# Hosted pages

Twenty shows a page of another app on the same site in its main area, under its own sidebar. The address `/shebang/<path>` in Twenty shows `/platform/<path>` in a frame. The query string and the hash are passed on, except the query parameter `panel`, which belongs to Twenty's side panel. A hosted page must not use a query parameter named `panel`.

This file is the contract between Twenty and a hosted page. `components/__tests__/hostedPageStandIn.html` is a small page that follows it.

## What a hosted page must do

1. Carry `<meta name="hosted-page">` in the document. Twenty shows an error when a document without the tag loads in the frame, for example an error page from the web server.
2. Send `ready` when the page can show itself. Twenty shows a loading skeleton until then. Twenty shows the error when `ready` has not arrived 10 seconds after the document loaded.
3. Never add an entry to the browser history. Twenty owns the address bar and the history. To open another screen, send `navigate`, then show the screen that the next `context` names.
4. Stay under `/platform/`. If the frame loads any other page of the site, Twenty leaves the hosted page and opens that address itself.

A page can tell that Twenty hosts it when `window.parent !== window` and `window.parent.location.origin === window.location.origin`.

## The messages

Both sides use `window.postMessage` with the site's own origin as the target origin. Every message is an object with `hostedPage: 1` and a `type`. Twenty accepts a message only from the frame's own window and the site's own origin, and ignores a message that does not match a row in the table of messages below. A hosted page must do the same: accept a message only when `event.source === window.parent` and `event.origin === window.location.origin`.

### From the hosted page to Twenty

| `type` | Fields | What Twenty does |
|---|---|---|
| `ready` | none | Removes the loading skeleton and answers with `context`. |
| `navigate` | `path`: string. `replace`: boolean, optional, default `false`. | Opens `path` in Twenty without a page reload, and adds a history entry unless `replace` is `true`. `path` is an address in Twenty that starts with one `/`. `/shebang/kontakter/7` is a screen of the hosted app, and `/object/person/<id>` is a page of Twenty. Twenty ignores any other value. |
| `title` | `title`: string | Shows `title` as the title of the browser tab. |
| `key` | `key`, `code`: strings. `ctrlKey`, `metaKey`, `shiftKey`, `altKey`: booleans. All six are required. | Handles the key press as if the person had pressed it in Twenty. The fields are the fields of the `keydown` event. |

Twenty's shortcuts do not see key presses inside the frame, so a hosted page sends the ones meant for Twenty and cancels its own default action for them:

- Ctrl+K and ⌘K always. This shortcut opens the command menu.
- `/` (search) and `@` (Ask AI) only when the focus is not in a text field.
- Escape only when the hosted page has nothing of its own to close.

### From Twenty to the hosted page

| `type` | Fields | What the hosted page does |
|---|---|---|
| `context` | `path`: string. `colorScheme`: `'light'` or `'dark'`. `locale`: string, for example `sv-SE`. | Shows the screen at `path` and uses the color scheme and the locale. |

`path` is the hosted page's own address, for example `/platform/kontakter/7?flik=affarer`. When `path` differs from the page's current address, the page shows that screen and sets its address with `history.replaceState`.

Twenty sends `context` in answer to `ready`, and again each time the address, the color scheme or the locale changes. Back, Forward and a click in the sidebar all arrive as a new `context`. A `context` states the current values. It can repeat values that the page already has, and the page must then change nothing.

## The sidebar entry

A sidebar entry of the kind LINK whose address is a path under `/shebang/`, for example `/shebang/kontakter`, opens the hosted page in place. The entry stays highlighted on every address below its own, such as `/shebang/kontakter/7`.

## What Twenty shows when the page fails

Twenty shows "The page could not be loaded." (in Swedish, "Sidan kunde inte laddas.") with two buttons. **Try again** loads the frame again. **Open in its own tab** opens the `/platform/` address in a new tab, outside Twenty.
