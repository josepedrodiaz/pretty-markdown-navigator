# Privacy Policy — Pretty Markdown Navigator

_Last updated: April 6, 2026_

**Pretty Markdown Navigator** is a Chrome extension that lets you browse local folders and read Markdown files rendered with a beautiful style.

## Quick summary

**We do not collect, store or transmit any user data.** All extension activity happens locally in your browser.

## Data we DO NOT collect

The extension does **not** collect or send to any server:

- Personally identifiable information (name, email, address, etc.)
- Health, financial, authentication or credential information
- Personal communications (emails, messages, etc.)
- Location data
- Web browsing history
- User activity (clicks, scrolls, analytics)
- The contents of any opened files

## Data processed locally

When you pick a folder with the "Open folder" button, the extension uses the browser's **File System Access API** to:

1. List the names of files and subfolders to render the navigation tree.
2. Read the contents of `.md` files **only when you explicitly click them**, in order to render them.

This content is **kept only in your browser's memory** during the session and stored temporarily in `chrome.storage.session` to pass it between the side panel and the viewer tab. **It never leaves your computer**, it is never sent to any server (ours or anyone else's) and it is discarded when you close Chrome.

## Permissions requested

- `sidePanel` — to display the navigation interface in Chrome's side panel.
- `storage` — to pass the open file's content between the side panel and the viewer tab (only `chrome.storage.session`, which is cleared when the browser closes).
- `tabs` — only to open the extension's internal viewer page (`viewer.html`) when you click a file. The extension does **not** read URLs, titles or contents of any other tabs.

## Content script (floating launcher)

The extension injects a small floating launcher button on every web page (via a content script). This button has a single purpose: send a message to the extension's service worker so it can re-open the side panel after you collapse it. The content script:

- **Does not** read, modify or transmit any page content.
- **Does not** read cookies, localStorage, form data or any other browser state.
- **Does not** track navigation between pages.
- Only adds a single DOM element (the floating button) and listens for clicks on that element.
- Stores a single dismissal flag in the page's own `sessionStorage` (not synced or transmitted).

You can right-click the launcher button to hide it for the rest of the browser session, or disable the extension if you don't want it injected.

The keyboard shortcut `Ctrl/Cmd + Shift + M` provides the same functionality without any content script involvement.

## Third-party services

None. The extension does not load remote code, does not use runtime CDNs (the `marked` library is bundled locally), does not include trackers or analytics, and does not communicate with any server.

## Open source

The full source code is available on GitHub and can be audited by anyone:

https://github.com/josepedrodiaz/pretty-markdown-navigator

## Contact

If you have questions about this policy, please open an issue in the repository above.
