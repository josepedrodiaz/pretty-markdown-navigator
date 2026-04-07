# 📖 Pretty Markdown Navigator

[![Manifest V3](https://img.shields.io/badge/manifest-v3-blue)](https://developer.chrome.com/docs/extensions/mv3/intro/) [![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Privacy: 100% local](https://img.shields.io/badge/privacy-100%25%20local-success)](PRIVACY.md)

> Una extensión de Chrome para navegar carpetas locales y leer tus archivos Markdown con un formato precioso, sin salir del navegador.

## ✨ Características

- 📂 **Navegador de carpetas locales** con la File System Access API — todo procesado en local, nada sale de tu equipo.
- 📑 **Tres vistas en el panel lateral**:
  - **Carpetas**: árbol expandible/colapsable con búsqueda por nombre.
  - **Índice**: outline automático del documento abierto, navegable.
  - **Buscar**: búsqueda dentro del documento actual.
- 🎨 **Renderizado precioso** con estilo cuidado: encabezados con gradiente, code blocks oscuros estilo GitHub, tablas, blockquotes, listas de tareas y soporte completo de GitHub Flavored Markdown.
- 🌒 **Tema oscuro nativo** en el panel lateral.
- 🪟 **Visor a pantalla completa** en pestañas independientes — abre varios documentos a la vez.
- ⚡ **Rápido y ligero**: sin frameworks, sin telemetría, sin llamadas a servidores.

## 🚀 Instalación

### Desde el Chrome Web Store

*(próximamente)*

### Modo desarrollador

1. Clona o descarga este repo.
2. Abre `chrome://extensions` en Chrome.
3. Activa **Modo desarrollador** (esquina superior derecha).
4. Pulsa **Cargar descomprimida** y selecciona la carpeta del repo.
5. Haz clic en el icono **M** morado de la barra para abrir el side panel.

## 🛠 Cómo usar

1. Abre el side panel y pulsa **📂 Abrir carpeta**.
2. Selecciona cualquier carpeta de tu equipo y acepta el permiso del navegador.
3. Haz clic en cualquier archivo `.md` del árbol — se abrirá en una pestaña a pantalla completa.
4. Usa las pestañas del panel (📁 / 📑 / 🔍) para alternar entre carpetas, índice del documento y búsqueda.

## 🗂 Estructura del proyecto

```
pretty-markdown-navigator/
├── manifest.json       # Manifest V3
├── background.js       # Service worker
├── sidepanel.html      # UI del panel lateral (3 vistas)
├── sidepanel.js        # Navegación, outline, búsqueda
├── viewer.html         # Página del visor a pantalla completa
├── viewer.js           # Render del markdown
├── styles.css          # Estilos (panel + visor)
├── marked.min.js       # Parser de markdown (local, sin CDN)
├── icons/              # Iconos 16/48/128
├── PRIVACY.md          # Política de privacidad
└── LICENSE             # MIT
```

## 🔐 Privacidad

La extensión **no envía nada a ningún servidor**. La carpeta que eliges la lee directamente el navegador con la File System Access API y todo el renderizado ocurre en local. La librería `marked` viene empaquetada — no se carga desde ningún CDN. Lee la [política de privacidad completa](PRIVACY.md) para más detalles.

## 🤝 Contribuir

Pull requests bienvenidos. Para cambios grandes, abre un issue primero para discutirlo.

## 📜 Licencia

[MIT](LICENSE)
