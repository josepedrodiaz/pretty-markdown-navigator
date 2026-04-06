# 📖 Markdown Navigator

Una extensión de Chrome (Manifest V3) que añade un **side panel** desde el que puedes navegar por cualquier carpeta de tu equipo y leer archivos Markdown renderizados con un estilo precioso.

![status](https://img.shields.io/badge/manifest-v3-blue) ![license](https://img.shields.io/badge/license-MIT-green)

## ✨ Características

- 📂 **Navegador de carpetas locales** usando la File System Access API (todo se procesa en local, nada sale de tu equipo).
- 🌳 **Árbol expandible/colapsable** con iconos por tipo.
- 🔍 **Búsqueda instantánea** de archivos por nombre.
- 📄 **Renderizado bonito de Markdown** (GFM) con `marked` empaquetado localmente — sin CDNs, cumple la CSP estricta de extensiones.
- 🎨 **Estilo cuidado**: gradientes morado/rosa, tipografía limpia, tablas, blockquotes, code blocks oscuros estilo GitHub, scrollbars finos, etc.
- 🧭 **Breadcrumbs** con la ruta del archivo abierto.
- 🌓 Optimizado para el side panel de Chrome.

## 🚀 Instalación (modo desarrollador)

1. Clona o descarga este repo.
2. Abre `chrome://extensions` en Chrome.
3. Activa **Modo desarrollador** (esquina superior derecha).
4. Pulsa **Cargar descomprimida** y selecciona la carpeta `markdown-navigator`.
5. Haz clic en el icono morado **M** de la barra de extensiones para abrir el side panel.
6. Pulsa **📂 Abrir carpeta**, elige una carpeta y empieza a navegar.

## 🛠 Estructura

```
markdown-navigator/
├── manifest.json       # Manifest V3
├── background.js       # Service worker (abre el side panel)
├── sidepanel.html      # UI del side panel
├── sidepanel.js        # Lógica de navegación y render
├── styles.css          # Estilos preciosos
├── marked.min.js       # Parser de Markdown (local, sin CDN)
└── icons/              # Iconos 16/48/128
```

## 🔐 Privacidad

La extensión **no envía nada a ningún servidor**. La carpeta que eliges la lee directamente el navegador con el File System Access API y todo el renderizado ocurre en local.

## 📜 Licencia

MIT
