/* Pretty Markdown Navigator — floating launcher
 *
 * Injects a small fixed button on every page so the user can re-open the side
 * panel after collapsing it. The button is dismissible per browser session.
 *
 * Privacy note: this content script does NOT read, send or modify any page
 * content. It only adds a single DOM element used to send a message to the
 * extension's service worker, which then opens the side panel.
 */

(function () {
  // Don't inject inside extension pages or iframes
  if (window.top !== window) return;
  if (location.protocol === "chrome-extension:") return;
  if (document.getElementById("__pmn-launcher__")) return;

  // Per-session dismissal
  try {
    if (sessionStorage.getItem("__pmn_dismissed__") === "1") return;
  } catch (_) {}

  function inject() {
    if (!document.body) return;
    const btn = document.createElement("button");
    btn.id = "__pmn-launcher__";
    btn.type = "button";
    btn.title = "Open Pretty Markdown Navigator";
    btn.setAttribute("aria-label", "Open Pretty Markdown Navigator");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';

    const style = btn.style;
    style.position = "fixed";
    style.right = "16px";
    style.bottom = "16px";
    style.width = "40px";
    style.height = "40px";
    style.borderRadius = "50%";
    style.border = "0";
    style.cursor = "pointer";
    style.zIndex = "2147483647";
    style.display = "flex";
    style.alignItems = "center";
    style.justifyContent = "center";
    style.color = "#ffffff";
    style.background = "linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)";
    style.boxShadow =
      "0 4px 14px rgba(79, 70, 229, 0.45), 0 1px 3px rgba(0, 0, 0, 0.2)";
    style.opacity = "0.85";
    style.transition = "transform .15s ease, opacity .15s ease, box-shadow .15s ease";
    style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

    btn.addEventListener("mouseenter", () => {
      style.opacity = "1";
      style.transform = "scale(1.08)";
      style.boxShadow =
        "0 6px 20px rgba(79, 70, 229, 0.55), 0 1px 3px rgba(0, 0, 0, 0.25)";
    });
    btn.addEventListener("mouseleave", () => {
      style.opacity = "0.85";
      style.transform = "scale(1)";
      style.boxShadow =
        "0 4px 14px rgba(79, 70, 229, 0.45), 0 1px 3px rgba(0, 0, 0, 0.2)";
    });

    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      try {
        chrome.runtime.sendMessage({ type: "openSidePanel" }, () => {
          // ignore reply / lastError
          void chrome.runtime.lastError;
        });
      } catch (_) {}
    });

    // Right-click dismisses for the rest of the session
    btn.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      try {
        sessionStorage.setItem("__pmn_dismissed__", "1");
      } catch (_) {}
      btn.remove();
    });

    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject, { once: true });
  } else {
    inject();
  }
})();
