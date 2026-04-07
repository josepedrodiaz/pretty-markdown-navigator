// Manual control of the side panel so it always reopens after the user closes it.
// We disable the automatic open-on-action-click and listen for the icon click ourselves.

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: false })
    .catch((error) => console.error(error));
});

chrome.runtime.onStartup.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: false })
    .catch((error) => console.error(error));
});

chrome.action.onClicked.addListener(async (tab) => {
  try {
    if (tab && tab.windowId != null) {
      await chrome.sidePanel.open({ windowId: tab.windowId });
    } else if (tab && tab.id != null) {
      await chrome.sidePanel.open({ tabId: tab.id });
    }
  } catch (e) {
    console.error("Failed to open side panel:", e);
  }
});

// Open the side panel when the floating launcher button on a page is clicked.
// chrome.sidePanel.open() requires an active user gesture; the click in the
// content script propagates the gesture through to this listener.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "openSidePanel") {
    const windowId = sender && sender.tab && sender.tab.windowId;
    if (windowId != null) {
      chrome.sidePanel
        .open({ windowId })
        .then(() => sendResponse({ ok: true }))
        .catch((e) => {
          console.error("openSidePanel failed:", e);
          sendResponse({ ok: false, error: String(e) });
        });
      return true; // keep channel open for async response
    }
  }
});

// Optional keyboard shortcut (Cmd/Ctrl+Shift+M) defined in the manifest "commands" key.
chrome.commands &&
  chrome.commands.onCommand &&
  chrome.commands.onCommand.addListener(async (command) => {
    if (command !== "open-side-panel") return;
    try {
      const win = await chrome.windows.getCurrent();
      if (win && win.id != null) {
        await chrome.sidePanel.open({ windowId: win.id });
      }
    } catch (e) {
      console.error("commands open failed:", e);
    }
  });
