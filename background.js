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
