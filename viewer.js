/* Markdown Viewer - full-tab page that reads a doc payload from chrome.storage.session */

if (window.marked) {
  marked.setOptions({ gfm: true, breaks: false });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

let currentDocId = null;

async function init() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const titleEl = document.getElementById("title");
  const pathEl = document.getElementById("path");
  const contentEl = document.getElementById("content");

  if (!id) {
    titleEl.textContent = "Sin documento";
    contentEl.innerHTML = "<p>No se especificó un documento para mostrar.</p>";
    return;
  }
  currentDocId = id;

  try {
    const data = await chrome.storage.session.get(id);
    const doc = data[id];
    if (!doc) {
      titleEl.textContent = "Documento no encontrado";
      contentEl.innerHTML =
        "<p>El documento ya no está disponible. Vuelve al side panel y haz clic en el archivo de nuevo.</p>";
      return;
    }

    titleEl.textContent = doc.title || "Sin título";
    pathEl.textContent = doc.path || "";
    document.title = (doc.title || "Markdown") + " — Markdown Navigator";

    let html;
    try {
      html = window.marked
        ? marked.parse(doc.text || "")
        : `<pre>${escapeHtml(doc.text || "")}</pre>`;
    } catch (e) {
      console.error("marked parse error", e);
      html = `<pre>${escapeHtml(doc.text || "")}</pre>`;
    }

    if (!doc.text || !doc.text.trim()) {
      html = '<p style="color:#6e7781;font-style:italic;">(Este archivo está vacío)</p>';
    }

    contentEl.innerHTML = html;
    addHeadingIds(contentEl);

    // Mark this doc as the currently active one for the side panel
    await chrome.storage.session.set({ currentDocId: id });
  } catch (e) {
    console.error(e);
    titleEl.textContent = "Error";
    contentEl.innerHTML = `<pre>${escapeHtml(String(e))}</pre>`;
  }
}

function addHeadingIds(root) {
  const seen = new Map();
  root.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((h) => {
    let id = slugify(h.textContent || "");
    if (!id) return;
    const count = seen.get(id) || 0;
    seen.set(id, count + 1);
    if (count > 0) id += "-" + count;
    h.id = id;
    h.classList.add("anchored");
  });
}

// Listen for scroll-to commands from the side panel
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "session") return;
  if (changes.scrollTarget && changes.scrollTarget.newValue) {
    const t = changes.scrollTarget.newValue;
    if (t.docId !== currentDocId) return;
    const el = document.getElementById(t.headingId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 1500);
    }
  }
});

// When this tab becomes visible, mark its doc as current
document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible" && currentDocId) {
    await chrome.storage.session.set({ currentDocId });
  }
});

init();
