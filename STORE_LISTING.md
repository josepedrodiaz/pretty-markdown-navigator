# Pretty Markdown Navigator — Chrome Web Store listing

Texts ready to copy/paste into the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) form.

---

## Name
```
Pretty Markdown Navigator
```

## Short description (max 132 characters)
```
Browse local folders and read your Markdown files with a beautiful viewer, automatic outline and search. 100% local.
```
*(116 characters)*

## Category
```
Productivity
```

## Primary language
```
English
```

## Detailed description

```
✨ Pretty Markdown Navigator turns Chrome into an elegant reader for local Markdown files. Open any folder on your computer, browse it from the side panel and view any .md file in a full tab with beautiful rendering — without leaving the browser.

━━━━━━━━━━━━━━━━━━━━
✨ FEATURES
━━━━━━━━━━━━━━━━━━━━

📂 LOCAL FOLDER BROWSER
Pick any folder on your computer with one click. The extension uses the browser's File System Access API, which means YOU control exactly which folder it accesses.

📑 THREE VIEWS IN THE SIDE PANEL
• Folders — expandable/collapsible tree with name search.
• Outline — automatic outline of the open document, click any heading to jump to it.
• Search — in-document search with highlighted results.

🎨 BEAUTIFUL RENDERING
Carefully designed styling: clean typography, gradient headings, GitHub-style dark code blocks, tables, blockquotes, task lists, elegant separators and full GitHub Flavored Markdown (GFM) support.

🌒 NATIVE DARK THEME
The side panel uses a native dark theme that's easy on the eyes during long reading sessions.

🪟 FULL-TAB VIEWER
Each file opens in its own browser tab, so you can keep multiple documents open at once and navigate between them like normal browser tabs.

⌨️ KEYBOARD SHORTCUT
Press Ctrl/Cmd + Shift + M to open the side panel instantly from any tab.

⚡ FAST AND LIGHTWEIGHT
No heavy frameworks, no telemetry, no server calls. Loads instantly.

━━━━━━━━━━━━━━━━━━━━
🔒 PRIVACY
━━━━━━━━━━━━━━━━━━━━

Pretty Markdown Navigator runs 100% locally:

• Does not collect or send any data to any server.
• No trackers, no analytics, no remote code.
• No host permissions — the extension never reads pages you visit.
• The rendering library (marked) is bundled locally — never loaded from a CDN.
• File contents only live in your browser's memory during the session.

━━━━━━━━━━━━━━━━━━━━
💡 GREAT FOR
━━━━━━━━━━━━━━━━━━━━

• Reading project documentation (README.md, CONTRIBUTING.md, …)
• Reviewing notes from Obsidian, Logseq, Bear or any file-based note system
• Browsing locally cloned repositories
• Quickly reading Markdown files without opening an editor

━━━━━━━━━━━━━━━━━━━━
🆓 FREE AND OPEN SOURCE
━━━━━━━━━━━━━━━━━━━━

Pretty Markdown Navigator is completely free and open source under the MIT license. Audit, contribute or fork:

https://github.com/josepedrodiaz/pretty-markdown-navigator

━━━━━━━━━━━━━━━━━━━━
🚀 HOW TO USE
━━━━━━━━━━━━━━━━━━━━

1. Click the extension icon (purple M) in the toolbar.
2. The side panel opens. Click "📂 Open folder".
3. Pick any folder from your computer and accept the browser permission prompt.
4. Click any .md file in the tree → it opens in a new tab with the beautiful rendering.
5. Use the side panel tabs to view the document outline or search inside it.
6. Closed the panel? Click the toolbar icon again or press Ctrl/Cmd + Shift + M.

Suggestions or issues? Open an issue on GitHub.
```

## Permission justifications

### `sidePanel`
```
The extension's main interface is a persistent side panel from which the user navigates their local folder and opens files. Without this permission the panel cannot be shown.
```

### `storage`
```
We use chrome.storage.session (volatile memory cleared when the browser closes) exclusively to pass the open Markdown file's content from the side panel to the viewer tab. Nothing is persisted to disk.
```

### Single-purpose justification
```
Pretty Markdown Navigator has one single purpose: to let the user navigate explicitly selected local folders and read Markdown files rendered with a beautiful style, without leaving the browser.
```

### Privacy policy URL
```
https://github.com/josepedrodiaz/pretty-markdown-navigator/blob/main/PRIVACY.md
```

## Data practices

Mark **ALL** the following as NOT collected:

- ❌ Personally identifiable information
- ❌ Health information
- ❌ Financial and payment information
- ❌ Authentication information
- ❌ Personal communications
- ❌ Location
- ❌ Web history
- ❌ User activity
- ❌ Website content

And certify:
- ✅ I do not sell or transfer user data to third parties
- ✅ I do not use or transfer user data for purposes unrelated to the single purpose
- ✅ I do not use or transfer user data to determine creditworthiness
