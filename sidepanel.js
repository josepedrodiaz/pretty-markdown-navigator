/* Markdown Navigator - sidepanel logic
 * Three views: folders, outline, search.
 * Side panel only navigates; the rendered markdown lives in a separate full tab (viewer.html).
 * The two communicate via chrome.storage.session.
 */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const treeEl = $("#tree");
const folderSearchEl = $("#folder-search");
const pickBtn = $("#pick-folder");
const outlineEl = $("#outline");
const outlineSearchEl = $("#outline-search");
const docSearchEl = $("#doc-search");
const searchResultsEl = $("#search-results");
const collapseBtn = $("#collapse");

const tabFolders = $("#tab-folders");
const tabOutline = $("#tab-outline");
const tabSearch = $("#tab-search");
const viewFolders = $("#view-folders");
const viewOutline = $("#view-outline");
const viewSearch = $("#view-search");

let rootHandle = null;
let rootName = "";
let currentDoc = null; // { id, title, path, text, headings: [{level,text,id,line}], viewerTabId }

// ---------- Tab switching ----------
function switchTab(name) {
  [tabFolders, tabOutline, tabSearch].forEach((t) => t.classList.remove("active"));
  [viewFolders, viewOutline, viewSearch].forEach((v) => v.classList.remove("active"));
  if (name === "folders") { tabFolders.classList.add("active"); viewFolders.classList.add("active"); }
  if (name === "outline") { tabOutline.classList.add("active"); viewOutline.classList.add("active"); }
  if (name === "search")  { tabSearch.classList.add("active");  viewSearch.classList.add("active"); }
}
tabFolders.addEventListener("click", () => switchTab("folders"));
tabOutline.addEventListener("click", () => switchTab("outline"));
tabSearch.addEventListener("click", () => switchTab("search"));

// ---------- Collapse panel ----------
collapseBtn.addEventListener("click", () => {
  // Close the side panel by closing this window (extension page).
  window.close();
});

// ---------- Folder picker ----------
// In Chrome's side panel the very first click is sometimes swallowed by the
// browser to focus the panel itself. We attach to pointerdown (which fires
// earlier and provides user activation) and guard against double-firing.
let pickerBusy = false;
async function pickFolder() {
  if (pickerBusy) return;
  if (!window.showDirectoryPicker) {
    alert("Tu navegador no soporta File System Access API. Usa Chrome/Edge actualizado.");
    return;
  }
  pickerBusy = true;
  try {
    const handle = await window.showDirectoryPicker({ mode: "read" });
    rootHandle = handle;
    rootName = handle.name;
    treeEl.innerHTML = "";
    const rootUl = document.createElement("ul");
    treeEl.appendChild(rootUl);
    const rootLi = await buildNode(handle, rootName, [rootName], true);
    rootUl.appendChild(rootLi);
    rootLi.classList.remove("collapsed");
    // Release focus from the button so the next click on the tree registers immediately.
    try { pickBtn.blur(); } catch (_) {}
    if (document.activeElement && document.activeElement.blur) {
      try { document.activeElement.blur(); } catch (_) {}
    }
  } catch (e) {
    if (e.name !== "AbortError") console.error(e);
  } finally {
    pickerBusy = false;
  }
}
pickBtn.addEventListener("pointerdown", (ev) => {
  // Only act on the primary button; let the click handler be a backup.
  if (ev.button !== 0) return;
  ev.preventDefault();
  pickFolder();
});
pickBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  pickFolder();
});

// Make sure the panel grabs focus immediately so the very first click on the
// "Open folder" button registers reliably. After the picker has been used,
// pickFolder() blurs the button so subsequent tree clicks work on first try.
window.addEventListener("DOMContentLoaded", () => {
  try { pickBtn.focus({ preventScroll: true }); } catch (_) {}
});

async function buildNode(handle, name, pathParts, isRoot = false) {
  const li = document.createElement("li");
  li.classList.add("collapsed");
  const node = document.createElement("div");
  node.className = "node " + (handle.kind === "directory" ? "dir" : "file");

  if (handle.kind === "directory") {
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "▾";
    node.appendChild(arrow);
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = "📁";
    node.appendChild(icon);
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = name;
    node.appendChild(label);

    const childUl = document.createElement("ul");
    let loaded = false;
    node.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      const isCollapsed = li.classList.contains("collapsed");
      if (isCollapsed && !loaded) {
        await loadChildren(handle, childUl, pathParts);
        loaded = true;
      }
      li.classList.toggle("collapsed");
    });
    li.appendChild(node);
    li.appendChild(childUl);
  } else {
    const isMd = /\.(md|markdown|mdown|mkd)$/i.test(name);
    node.classList.add(isMd ? "md" : "other");
    const spacer = document.createElement("span");
    spacer.className = "arrow";
    spacer.textContent = " ";
    node.appendChild(spacer);
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = isMd ? "📄" : "•";
    node.appendChild(icon);
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = name;
    node.appendChild(label);

    if (isMd) {
      node.addEventListener("click", async (ev) => {
        ev.stopPropagation();
        await openMarkdownInTab(handle, pathParts, node);
      });
    } else {
      node.style.cursor = "default";
    }
    li.appendChild(node);
  }
  return li;
}

async function loadChildren(dirHandle, parentUl, parentPath) {
  parentUl.innerHTML = "";
  const entries = [];
  for await (const [entryName, entryHandle] of dirHandle.entries()) {
    if (entryName.startsWith(".")) continue;
    if (["node_modules", "dist", "build", ".git"].includes(entryName)) continue;
    entries.push([entryName, entryHandle]);
  }
  entries.sort((a, b) => {
    if (a[1].kind !== b[1].kind) return a[1].kind === "directory" ? -1 : 1;
    return a[0].localeCompare(b[0]);
  });
  for (const [entryName, entryHandle] of entries) {
    const childPath = [...parentPath, entryName];
    const childLi = await buildNode(entryHandle, entryName, childPath);
    parentUl.appendChild(childLi);
  }
}

// ---------- Open markdown in viewer tab ----------
async function openMarkdownInTab(fileHandle, pathParts, nodeEl) {
  $$(".node.active").forEach((n) => n.classList.remove("active"));
  nodeEl.classList.add("active");

  try {
    const file = await fileHandle.getFile();
    const text = await file.text();
    const headings = extractHeadings(text);
    const docId = "doc_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    const payload = {
      id: docId,
      title: pathParts[pathParts.length - 1],
      path: pathParts.join(" / "),
      text,
      headings,
      ts: Date.now(),
    };
    await chrome.storage.session.set({ [docId]: payload, currentDocId: docId });
    currentDoc = payload;

    const url = chrome.runtime.getURL("viewer.html") + "?id=" + encodeURIComponent(docId);
    const tab = await chrome.tabs.create({ url });
    payload.viewerTabId = tab.id;
    await chrome.storage.session.set({ [docId]: payload });

    renderOutline();
    switchTab("outline");
  } catch (e) {
    console.error(e);
    alert("Could not open the file: " + e.message);
  }
}

// ---------- Headings extraction & slugify ----------
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

function extractHeadings(md) {
  const lines = md.split(/\r?\n/);
  const headings = [];
  let inFence = false;
  const seen = new Map();
  lines.forEach((line, i) => {
    if (/^```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      const level = m[1].length;
      const text = m[2].trim();
      let id = slugify(text);
      const count = seen.get(id) || 0;
      seen.set(id, count + 1);
      if (count > 0) id += "-" + count;
      headings.push({ level, text, id, line: i });
    }
  });
  return headings;
}

// ---------- Outline rendering ----------
function renderOutline(filter = "") {
  if (!currentDoc) {
    outlineEl.innerHTML = `<div class="empty-state"><p>📑 No document</p><small>Open a <code>.md</code> file from the folders tab.</small></div>`;
    return;
  }
  const q = filter.trim().toLowerCase();
  const items = currentDoc.headings.filter((h) => !q || h.text.toLowerCase().includes(q));
  if (items.length === 0) {
    outlineEl.innerHTML = `<div class="empty-state"><p>No matches</p><small>Try a different term.</small></div>`;
    return;
  }
  outlineEl.innerHTML = `
    <div class="doc-title">${escapeHtml(currentDoc.title)}</div>
    <ul class="outline-list">
      ${items.map((h) => `
        <li class="outline-item lvl-${h.level}" data-id="${escapeHtml(h.id)}">
          <span class="outline-text">${highlight(escapeHtml(h.text), q)}</span>
        </li>`).join("")}
    </ul>`;
  outlineEl.querySelectorAll(".outline-item").forEach((el) => {
    el.addEventListener("click", () => scrollViewerTo(el.dataset.id));
  });
}

async function scrollViewerTo(headingId) {
  if (!currentDoc) return;
  await chrome.storage.session.set({
    scrollTarget: { docId: currentDoc.id, headingId, ts: Date.now() },
  });
  // Try to focus the viewer tab if we know it
  if (currentDoc.viewerTabId) {
    try {
      await chrome.tabs.update(currentDoc.viewerTabId, { active: true });
    } catch (_) { /* tab may have been closed */ }
  }
}

outlineSearchEl.addEventListener("input", () => renderOutline(outlineSearchEl.value));

// ---------- Search inside the document ----------
docSearchEl.addEventListener("input", () => renderDocSearch(docSearchEl.value));

function renderDocSearch(query) {
  const q = query.trim();
  if (!currentDoc) {
    searchResultsEl.innerHTML = `<div class="empty-state"><p>🔍 No document</p><small>Open a <code>.md</code> file first.</small></div>`;
    return;
  }
  if (!q) {
    searchResultsEl.innerHTML = `<div class="empty-state"><p>🔍 Start typing</p><small>Matches will appear here.</small></div>`;
    return;
  }
  const ql = q.toLowerCase();
  const lines = currentDoc.text.split(/\r?\n/);
  const matches = [];
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    let idx = lower.indexOf(ql);
    while (idx !== -1) {
      const start = Math.max(0, idx - 30);
      const end = Math.min(line.length, idx + q.length + 60);
      matches.push({ line: i, snippet: line.slice(start, end), trimLeft: start > 0, trimRight: end < line.length });
      idx = lower.indexOf(ql, idx + q.length);
      if (matches.length >= 200) return;
    }
  });
  if (matches.length === 0) {
    searchResultsEl.innerHTML = `<div class="empty-state"><p>No matches</p></div>`;
    return;
  }
  searchResultsEl.innerHTML = `
    <div class="results-count">${matches.length} result${matches.length === 1 ? "" : "s"}</div>
    <ul class="results-list">
      ${matches.map((m) => `
        <li class="result-item" data-line="${m.line}">
          <span class="result-line">L${m.line + 1}</span>
          <span class="result-snippet">${m.trimLeft ? "…" : ""}${highlight(escapeHtml(m.snippet), ql)}${m.trimRight ? "…" : ""}</span>
        </li>`).join("")}
    </ul>`;
}

// ---------- Folder search filter ----------
folderSearchEl.addEventListener("input", () => {
  const q = folderSearchEl.value.trim().toLowerCase();
  const allLis = treeEl.querySelectorAll("li");
  if (!q) { allLis.forEach((li) => (li.style.display = "")); return; }
  allLis.forEach((li) => (li.style.display = "none"));
  treeEl.querySelectorAll(".node .label").forEach((lbl) => {
    if (lbl.textContent.toLowerCase().includes(q)) {
      let li = lbl.closest("li");
      while (li) {
        li.style.display = "";
        li.classList.remove("collapsed");
        li = li.parentElement.closest("li");
      }
    }
  });
});

// ---------- Sync currentDoc from storage on load (in case viewer tab is open) ----------
(async function syncCurrent() {
  try {
    const { currentDocId } = await chrome.storage.session.get("currentDocId");
    if (currentDocId) {
      const data = await chrome.storage.session.get(currentDocId);
      if (data[currentDocId]) {
        currentDoc = data[currentDocId];
        renderOutline();
      }
    }
  } catch (_) {}
})();

// React when the active doc changes (e.g. another tab navigated)
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area !== "session") return;
  if (changes.currentDocId && changes.currentDocId.newValue) {
    const id = changes.currentDocId.newValue;
    const data = await chrome.storage.session.get(id);
    if (data[id]) {
      currentDoc = data[id];
      renderOutline(outlineSearchEl.value);
      if (docSearchEl.value) renderDocSearch(docSearchEl.value);
    }
  }
});

// ---------- Helpers ----------
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function highlight(htmlText, q) {
  if (!q) return htmlText;
  const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
  return htmlText.replace(re, '<mark>$1</mark>');
}
