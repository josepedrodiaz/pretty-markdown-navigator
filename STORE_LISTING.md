# Pretty Markdown Navigator — Chrome Web Store listing

Textos listos para copiar/pegar en el formulario del [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## Nombre (Name)
```
Pretty Markdown Navigator
```

## Resumen corto (Short description) — máx. 132 caracteres
```
Navega carpetas locales y lee tus archivos Markdown con un formato precioso, índice automático y búsqueda. 100 % local.
```
*(124 caracteres)*

## Categoría
```
Productividad
```

## Idioma principal
```
Español
```

## Descripción detallada (Detailed description)

```
✨ Pretty Markdown Navigator convierte Chrome en un lector elegante de archivos Markdown locales. Abre cualquier carpeta de tu equipo, navega su contenido desde el panel lateral y abre cualquier archivo .md a pantalla completa con un renderizado precioso, sin salir del navegador.

━━━━━━━━━━━━━━━━━━━━
✨ CARACTERÍSTICAS
━━━━━━━━━━━━━━━━━━━━

📂 NAVEGADOR DE CARPETAS LOCAL
Selecciona cualquier carpeta de tu equipo con un solo clic. La extensión usa la File System Access API del navegador, lo que significa que TÚ controlas exactamente a qué carpeta accede.

📑 TRES VISTAS EN EL PANEL LATERAL
• Carpetas — árbol expandible/colapsable con búsqueda por nombre.
• Índice — outline automático del documento abierto, con navegación clic-a-sección.
• Buscar — búsqueda dentro del documento actual con resultados resaltados.

🎨 RENDERIZADO PRECIOSO
Estilo cuidado al detalle: tipografía limpia, encabezados con gradiente, code blocks oscuros estilo GitHub, tablas, blockquotes, listas de tareas, separadores elegantes y soporte completo de GitHub Flavored Markdown (GFM).

🌒 TEMA OSCURO
El panel lateral usa un tema oscuro nativo que descansa la vista durante sesiones largas de lectura.

🪟 VISOR A PANTALLA COMPLETA
Cada archivo se abre en una pestaña independiente, así puedes tener varios documentos abiertos a la vez y navegar entre ellos como pestañas normales del navegador.

⚡ RÁPIDO Y LIGERO
Sin frameworks pesados, sin telemetría, sin llamadas a servidores. Carga instantánea.

━━━━━━━━━━━━━━━━━━━━
🔒 PRIVACIDAD
━━━━━━━━━━━━━━━━━━━━

Pretty Markdown Navigator funciona 100 % localmente:

• No recoge ni envía ningún dato a ningún servidor.
• No incluye trackers, analytics ni código remoto.
• No tiene permisos de host (no puede leer las páginas web que visitas).
• La librería de renderizado (marked) viene empaquetada localmente, no se carga desde ningún CDN.
• El contenido de los archivos solo vive en la memoria de tu navegador durante la sesión.

━━━━━━━━━━━━━━━━━━━━
💡 IDEAL PARA
━━━━━━━━━━━━━━━━━━━━

• Leer documentación técnica de proyectos (README.md, CONTRIBUTING.md…)
• Repasar notas de Obsidian, Logseq, Bear o cualquier sistema basado en archivos .md
• Navegar repositorios clonados localmente
• Lectura rápida de archivos Markdown sin abrir un editor

━━━━━━━━━━━━━━━━━━━━
🆓 GRATIS Y CÓDIGO ABIERTO
━━━━━━━━━━━━━━━━━━━━

Pretty Markdown Navigator es totalmente gratuito y de código abierto bajo licencia MIT. Audita, contribuye o haz fork:

https://github.com/josepedrodiaz/pretty-markdown-navigator

━━━━━━━━━━━━━━━━━━━━
🚀 CÓMO USAR
━━━━━━━━━━━━━━━━━━━━

1. Haz clic en el icono de la extensión (M morada) en la barra de herramientas.
2. Se abrirá el panel lateral. Pulsa "📂 Abrir carpeta".
3. Elige cualquier carpeta de tu equipo y acepta el permiso del navegador.
4. Haz clic en cualquier archivo .md del árbol → se abrirá en una pestaña nueva con el formato precioso.
5. Usa las pestañas del panel para ver el índice del documento o buscar dentro de él.

¿Sugerencias o problemas? Abre un issue en GitHub.
```

## Justificación de permisos

### `sidePanel`
```
La interfaz principal de la extensión es un panel lateral persistente desde el que el usuario navega su carpeta local y abre archivos. Sin este permiso no puede mostrarse el panel.
```

### `storage`
```
Se usa exclusivamente chrome.storage.session (memoria volátil que se borra al cerrar el navegador) para pasar el contenido del archivo Markdown abierto desde el side panel a la pestaña del visor. No se persiste nada en disco.
```

### `tabs`
```
Únicamente se usa chrome.tabs.create() para abrir la página interna del visor (viewer.html, parte de la propia extensión) cuando el usuario hace clic en un archivo. No se accede a ninguna pestaña del usuario, ni a su URL, título o contenido.
```

### Justificación del propósito único (Single purpose)
```
Pretty Markdown Navigator tiene un único propósito: permitir al usuario navegar carpetas locales seleccionadas explícitamente y leer archivos Markdown renderizados con un formato cuidado, sin salir del navegador.
```

### Política de privacidad (URL)
```
https://github.com/josepedrodiaz/pretty-markdown-navigator/blob/main/PRIVACY.md
```

## Prácticas de datos (Data practices)

Marcar **TODAS** las siguientes opciones como NO recopiladas:

- ❌ Personally identifiable information
- ❌ Health information
- ❌ Financial and payment information
- ❌ Authentication information
- ❌ Personal communications
- ❌ Location
- ❌ Web history
- ❌ User activity
- ❌ Website content

Y certificar:
- ✅ I do not sell or transfer user data to third parties
- ✅ I do not use or transfer user data for purposes unrelated to the single purpose
- ✅ I do not use or transfer user data to determine creditworthiness
