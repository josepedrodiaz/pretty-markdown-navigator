/* Markdown Navigator - sidepanel logic */

const $ = (sel) => document.querySelector(sel);
const treeEl = $("#tree");
const contentEl = $("#content");
const breadcrumbEl = $("#breadcrumb");
const searchEl = $("#search");
const pickBtn = $("#pick-folder");

let rootHandle = null;
let rootName = "";
let activeNodeEl = null;

// Configure marked
if (window.marked) {
  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: true,
    mangle: false,
  });
}

pickBtn.addEventListener("click", async () => {
  if (!window.showDirectoryPicker) {
    alert("Tu navegador no soporta File System Access API. Usa Chrome/Edge actualizado.");
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({ mode: "read" });
    rootHandle = handle;
    rootName = handle.name;
    treeEl.innerHTML = "";
    const rootUl = document.createElement("ul");
    treeEl.appendChild(rootUl);
    const rootLi = await buildNode(handle, rootName, [rootName], true);
    rootUl.appendChild(rootLi);
    // expand root
    rootLi.classList.remove("collapsed");
    breadcrumbEl.innerHTML = `<span class="crumb last">${escapeHtml(rootName)}</span>`;
  } catch (e) {
    if (e.name !== "AbortError") console.error(e);
  }
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
        await openMarkdown(handle, pathParts, node);
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
    // Skip hidden and common noise
    if (entryName.startsWith(".")) continue;
    if (["node_modules", "dist", "build", ".git"].includes(entryName)) continue;
    entries.push([entryName, entryHandle]);
  }
  // Sort: directories first, then files alphabetically
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

async function openMarkdown(fileHandle, pathParts, nodeEl) {
  try {
    const file = await fileHandle.getFile();
    const text = await file.text();
    const html = window.marked ? marked.parse(text) : `<pre>${escapeHtml(text)}</pre>`;
    contentEl.innerHTML = `<div class="markdown-body">${html}</div>`;
    contentEl.scrollTop = 0;

    // Update breadcrumb
    breadcrumbEl.innerHTML = pathParts
      .map((p, i) => {
        const isLast = i === pathParts.length - 1;
        return `<span class="crumb${isLast ? " last" : ""}">${escapeHtml(p)}</span>` +
               (isLast ? "" : `<span class="sep">/</span>`);
      })
      .join("");

    // Highlight active node
    if (activeNodeEl) activeNodeEl.classList.remove("active");
    nodeEl.classList.add("active");
    activeNodeEl = nodeEl;
  } catch (e) {
    contentEl.innerHTML = `<div class="markdown-body"><h1>Error</h1><pre>${escapeHtml(String(e))}</pre></div>`;
  }
}

// Filter / search
searchEl.addEventListener("input", () => {
  const q = searchEl.value.trim().toLowerCase();
  const allLis = treeEl.querySelectorAll("li");
  if (!q) {
    allLis.forEach((li) => (li.style.display = ""));
    return;
  }
  // Hide nodes whose label doesn't match; reveal ancestors of matches
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

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
