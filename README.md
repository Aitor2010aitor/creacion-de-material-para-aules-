# SopaCrea

**Creador de actividades H5P para Aules y Moodle.**

> **Versión 1.0 — primera publicación.** La **sopa de letras** ya está disponible y probada en Aules. El resto de formatos aparece en la interfaz como **«en construcción»** y se irá publicando poco a poco.

## Qué incluye esta versión

- Editor de **sopa de letras**: título, instrucciones, palabras, pistas, tamaño de cuadrícula y dificultad.
- Vista previa interactiva para resolver la sopa antes de exportarla.
- Exportación a **`.h5p` compatible con Aules** usando la librería oficial `H5P.FindTheWords` 1.4 que Aules ya tiene instalada.
- Paquete de ejemplo listo para subir: [`entregables/descubrelanaturaleza-sopa.h5p`](entregables/descubrelanaturaleza-sopa.h5p).

### Por qué funciona en Aules

Aules no permite instalar librerías H5P nuevas. Los paquetes de SopaCrea son **solo contenido** (`h5p.json` + `content/content.json`) y declaran `H5P.FindTheWords` como librería principal, por lo que no incluyen ni instalan bibliotecas propias.

## Cómo usar la aplicación

Requisitos: **Node.js 22** y **pnpm**.

```bash
cd sopacrea
pnpm install
pnpm dev
```

Abre <http://localhost:3000>.

Para servir la versión ya compilada (sin instalar dependencias):

```bash
cd sopacrea
node serve-dist.cjs
```

También puedes abrir `sopacrea/dist/index.html` desde un servidor estático. La build usa rutas relativas, así que funciona en GitHub Pages o en cualquier subcarpeta.

## Cómo subir la actividad a Aules

1. Genera la sopa de letras en SopaCrea.
2. Pulsa **Descargar .h5p para Aules**.
3. En Aules entra en el curso y elige **Añadir contenido → H5P → Paquete de archivos**.
4. Sube el archivo `.h5p` descargado.

## Estado de los formatos

| Formato | Estado |
| --- | --- |
| Sopa de letras | ✅ Disponible y compatible con Aules |
| Crucigrama | 🚧 En construcción (editor y exportación ya existen, pendiente de validación final) |
| Vídeo interactivo | 🚧 En construcción |
| Resto del catálogo H5P (51 tipos) | 🚧 En construcción |

La biblioteca muestra los **54 tipos oficiales** de H5P para consultar sus demos, pero solo la sopa de letras se puede crear y descargar en esta versión.

## Estructura del repositorio

```text
.
├── entregables/
│   └── descubrelanaturaleza-sopa.h5p   # Paquete de ejemplo listo para Aules
├── sopacrea/
│   ├── src/                            # Código fuente (TypeScript + CSS)
│   ├── public/
│   ├── dist/                           # Build lista para servir
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── serve-dist.cjs                  # Servidor estático sin dependencias
│   └── vite.config.ts
└── README.md
```

## Desarrollo

```bash
cd sopacrea
pnpm install
pnpm build      # genera dist/
pnpm preview    # sirve la build en el puerto 3000
```

El código principal está en `sopacrea/src/main.ts`, el catálogo en `sopacrea/src/h5pCatalog.ts` y los estilos en `sopacrea/src/style.css`.

## Hoja de ruta

- Validar y publicar el crucigrama.
- Adaptar el vídeo interactivo a la librería oficial `H5P.InteractiveVideo`.
- Ir habilitando el resto de tipos del catálogo con exportación content-only compatible con Aules.

---

Hecho para enseñar creando. Compatible con H5P · Sin registro.
