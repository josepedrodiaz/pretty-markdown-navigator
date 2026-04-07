# Política de privacidad — Pretty Markdown Navigator

_Última actualización: 6 de abril de 2026_

**Pretty Markdown Navigator** es una extensión de Chrome que permite navegar carpetas locales y leer archivos Markdown renderizados con un formato cuidado.

## Resumen rápido

**No recopilamos, almacenamos ni transmitimos ningún dato personal del usuario.** Toda la actividad de la extensión ocurre localmente en tu navegador.

## Datos que NO se recogen

La extensión **no** recoge ni envía a ningún servidor:

- Información personal identificable (nombre, email, dirección, etc.)
- Información de salud, financiera, de autenticación o credenciales
- Comunicaciones personales (emails, mensajes, etc.)
- Localización
- Historial de navegación web
- Actividad de usuario (clicks, scrolls, métricas analíticas)
- Contenido de los archivos abiertos

## Datos que se procesan localmente

Cuando eliges una carpeta con el botón "Abrir carpeta", la extensión usa la **File System Access API** del navegador para:

1. Leer la lista de archivos y subcarpetas (solo nombres) para mostrar el árbol de navegación.
2. Leer el contenido de los archivos `.md` que tú abres explícitamente, para renderizarlos.

Este contenido **se mantiene únicamente en la memoria de tu navegador** durante la sesión y se almacena temporalmente en `chrome.storage.session` para poder pasarlo entre el side panel y la pestaña del visor. **Nunca sale de tu equipo**, no se envía a ningún servidor (ni nuestro ni de terceros) y se descarta cuando cierras Chrome.

## Permisos solicitados

- `sidePanel` — para mostrar la interfaz de navegación en el panel lateral de Chrome.
- `storage` — para pasar el contenido del archivo abierto entre el side panel y la pestaña del visor (solo `chrome.storage.session`, que se borra al cerrar el navegador).
- `tabs` — únicamente para abrir la pestaña interna del visor (`viewer.html`) cuando haces clic en un archivo.

No se solicita ningún permiso de host (`host_permissions`), por lo que la extensión no puede leer ni modificar ninguna página web que visites.

## Servicios de terceros

Ninguno. La extensión no carga código remoto, no usa CDNs en tiempo de ejecución (la librería `marked` está empaquetada localmente), no incluye trackers ni analytics, y no se comunica con ningún servidor.

## Código abierto

El código fuente completo está disponible en GitHub y puede ser auditado por cualquiera:

https://github.com/josepedrodiaz/pretty-markdown-navigator

## Contacto

Si tienes dudas sobre esta política, abre un issue en el repositorio de GitHub indicado arriba.
