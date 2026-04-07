// Manual control of the side panel so it always reopens after the user closes it.
// We disable the automatic open-on-action-click and listen for the icon click ourselves.

// Page opened in the user's browser when they uninstall the extension.
// Lets us collect feedback (why did you uninstall? what was missing?).
const UNINSTALL_FEEDBACK_URL =
  "https://github.com/josepedrodiaz/pretty-markdown-navigator/discussions/1";

function setupSidePanelBehavior() {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: false })
    .catch((error) => console.error(error));
}

function setupUninstallURL() {
  try {
    chrome.runtime.setUninstallURL(UNINSTALL_FEEDBACK_URL);
  } catch (e) {
    console.error("setUninstallURL failed:", e);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  setupSidePanelBehavior();
  setupUninstallURL();
});

chrome.runtime.onStartup.addListener(() => {
  setupSidePanelBehavior();
  setupUninstallURL();
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
