# SopaCrea

**Creador de actividades H5P para Aules y Moodle.**

**Demo en línea:** [Abrir SopaCrea](https://aitor2010aitor.github.io/creacion-de-material-para-aules-/sopacrea/dist/)

> **Versión 1.1.** La **sopa de letras** y el **crucigrama** ya están disponibles. El resto de formatos aparece en la interfaz como **«en construcción»** y se irá publicando poco a poco.

## Qué incluye esta versión

- Editor de **sopa de letras**: título, instrucciones, palabras, pistas, tamaño de cuadrícula y dificultad.
- Editor de **crucigrama**: palabras con pistas, cuadrícula interactiva, comprobar, mostrar solución y reiniciar.
- Vista previa interactiva para resolver la actividad antes de exportarla.
- Exportación a **`.h5p` compatible con Aules** usando librerías oficiales que la plataforma ya tiene instaladas, sin añadir bibliotecas propias.
- Paquetes de ejemplo listos para subir:
  - [`entregables/descubrelanaturaleza-sopa.h5p`](entregables/descubrelanaturaleza-sopa.h5p)
  - [`entregables/descubrelanaturaleza-crucigrama.h5p`](entregables/descubrelanaturaleza-crucigrama.h5p)

### Por qué funciona en Aules

Aules no permite instalar librerías H5P nuevas. Los paquetes de SopaCrea son **solo contenido** (`h5p.json` + `content/content.json`), por lo que no incluyen ni instalan bibliotecas propias:

- **Sopa de letras:** usa `H5P.FindTheWords` 1.4, ya probada en Aules.
- **Crucigrama:** usa `H5P.Crossword` 0.5, probada en Moodle local. En Aules funcionará si esa librería oficial está instalada en la plataforma.

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

1. Genera la actividad en SopaCrea (sopa de letras o crucigrama).
2. Pulsa **Descargar .h5p para Aules**.
3. En Aules entra en el curso y elige **Añadir contenido → H5P → Paquete de archivos**.
4. Sube el archivo `.h5p` descargado.

## Estado de los formatos

| Formato | Estado |
| --- | --- |
| Sopa de letras | ✅ Disponible y probada en Aules |
| Crucigrama | ✅ Disponible (probado en Moodle local; pendiente de confirmar en Aules) |
| Vídeo interactivo | 🚧 En construcción |
| Resto del catálogo H5P (51 tipos) | 🚧 En construcción |

La biblioteca muestra los **54 tipos oficiales** de H5P para consultar sus demos, pero solo la sopa de letras y el crucigrama se pueden crear y descargar en esta versión.

## Estructura del repositorio

```text
.
├── entregables/
│   ├── descubrelanaturaleza-sopa.h5p        # Ejemplo de sopa de letras para Aules
│   └── descubrelanaturaleza-crucigrama.h5p  # Ejemplo de crucigrama para Aules
├── sopacrea/
│   ├── src/                                 # Código fuente (TypeScript + CSS)
│   ├── public/
│   ├── dist/                                # Build lista para servir
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── serve-dist.cjs                       # Servidor estático sin dependencias
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

- Confirmar el crucigrama en Aules.
- Adaptar el vídeo interactivo a la librería oficial `H5P.InteractiveVideo`.
- Ir habilitando el resto de tipos del catálogo con exportación content-only compatible con Aules.

---

Hecho para enseñar creando. Compatible con H5P · Sin registro.
