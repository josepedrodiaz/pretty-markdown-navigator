# 📖 Pretty Markdown Navigator

[![Manifest V3](https://img.shields.io/badge/manifest-v3-blue)](https://developer.chrome.com/docs/extensions/mv3/intro/) [![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Privacy: 100% local](https://img.shields.io/badge/privacy-100%25%20local-success)](PRIVACY.md)

> A Chrome extension to browse local folders and read your Markdown files with a beautiful viewer — without leaving the browser.

## ✨ Features

- 📂 **Local folder browser** powered by the File System Access API — everything is processed locally, nothing leaves your computer.
- 📑 **Three views in the side panel**:
  - **Folders** — expandable/collapsible tree with name search.
  - **Outline** — automatic outline of the open document, click any heading to jump to it.
  - **Search** — in-document search with highlighted results.
- 🎨 **Beautiful rendering** with carefully designed styles: gradient headings, GitHub-style dark code blocks, tables, blockquotes, task lists and full GitHub Flavored Markdown support.
- 🌒 **Native dark theme** in the side panel.
- 🪟 **Full-tab viewer** — each Markdown file opens in its own browser tab so you can keep multiple documents open at once.
- ⌨️ **Keyboard shortcut** — press `Ctrl/Cmd + Shift + M` from anywhere to re-open the side panel after closing it (the toolbar icon does the same).
- ⚡ **Fast and lightweight** — no frameworks, no telemetry, no server calls.

## 🚀 Installation

### From the Chrome Web Store

*(coming soon)*

### Developer mode

1. Clone or download this repo.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top right corner).
4. Click **Load unpacked** and select the repo folder.
5. Click the **M** purple icon in the toolbar to open the side panel.

## 🛠 How to use

1. Open the side panel and click **📂 Open folder**.
2. Pick any folder from your computer and accept the browser permission prompt.
3. Click any `.md` file in the tree — it will open in a new full tab.
4. Use the panel tabs (📁 / 📑 / 🔍) to switch between folders, outline of the current document and in-document search.
5. To re-open the side panel after closing it, click the **M** purple icon in the toolbar or press `Ctrl/Cmd + Shift + M`.

## 🗂 Project structure

```
pretty-markdown-navigator/
├── manifest.json       # Manifest V3
├── background.js       # Service worker
├── sidepanel.html      # Side panel UI (3 views)
├── sidepanel.js        # Navigation, outline, in-document search
├── viewer.html         # Full-tab viewer page
├── viewer.js           # Markdown rendering + heading anchors
├── styles.css          # Styles (panel + viewer)
├── marked.min.js       # Markdown parser (bundled, no CDN)
├── icons/              # 16/48/128 icons
├── PRIVACY.md          # Privacy policy
└── LICENSE             # MIT
```

## 🔐 Privacy

The extension **does not send anything to any server**. The folder you pick is read directly by the browser using the File System Access API and all rendering happens locally. The `marked` library is bundled — no CDNs are loaded at runtime. Read the [full privacy policy](PRIVACY.md) for details.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License

[MIT](LICENSE)
