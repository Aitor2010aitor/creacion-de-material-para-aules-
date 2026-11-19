export type H5PGroup = 'quiz' | 'presentation' | 'game' | 'multimedia' | 'writing' | 'survey' | 'other';

export type H5PStatus = 'ready' | 'construction';

export type H5PType = {
  id: string;
  name: string;
  group: H5PGroup;
  demo: string;
  description: string;
  fields: string;
  status: H5PStatus;
};

export const h5pCatalog: H5PType[] = [
  ['interactive-video','Vídeo interactivo','multimedia','https://h5p.org/interactive-video','Vídeo enriquecido con preguntas y marcadores.','Vídeo fuente · interacciones temporizadas · resumen final'],
  ['course-presentation','Presentación de curso','presentation','https://h5p.org/presentation','Diapositivas con texto, imágenes y actividades.','Diapositivas · elementos · navegación · fondos'],
  ['branching-scenario','Escenario ramificado','presentation','https://h5p.org/branching-scenario','Dilemas y experiencias con decisiones.','Nodos · elecciones · destinos · pantallas finales'],
  ['accordion','Acordeón','other','https://h5p.org/accordion','Paneles verticales que se expanden y contraen.','Paneles · títulos · contenido enriquecido'],
  ['advent-calendar-beta','Calendario de Adviento','other','https://h5p.org/content-types/advent-calendar','24 puertas con texto, imagen, audio o vídeo.','Puertas · imagen · contenido · fecha'],
  ['agamotto','Agamotto','multimedia','https://h5p.org/content-types/agamotto','Secuencia de imágenes con deslizador.','Imágenes · descripciones · etiquetas · deslizador'],
  ['ar-scavenger','Búsqueda AR','game','https://h5p.org/content-types/ar-scavenger','Búsqueda con cámara, marcadores y modelos 3D.','Marcadores · patrones · contenido H5P · modelos 3D'],
  ['arithmetic-quiz','Quiz de aritmética','quiz','https://h5p.org/arithmetic-quiz','Preguntas matemáticas contrarreloj.','Operación · preguntas · dificultad · fracciones'],
  ['audio-recorder','Grabadora de audio','multimedia','https://h5p.org/audio-recorder','Actividad para grabar y descargar voz.','Título · instrucciones · textos de interfaz'],
  ['chart','Gráfico','multimedia','https://h5p.org/chart','Gráficos de barras o circulares.','Tipo · etiquetas · valores · colores'],
  ['collage','Collage','multimedia','https://h5p.org/collage','Composición con varias imágenes.','Plantilla · imágenes · marco · espaciado'],
  ['cornell-notes','Notas Cornell','writing','https://h5p.org/cornell-notes','Vídeo o recurso con panel de notas Cornell.','Recurso · instrucciones · pistas · notas · resumen'],
  ['crossword','Crucigrama','game','https://h5p.org/content-types/crossword','Crucigrama con palabras y pistas.','Palabras · pistas · colores · puntuación'],
  ['dialog-cards','Tarjetas de diálogo','quiz','https://h5p.org/dialog-cards','Tarjetas que se giran para mostrar respuestas.','Tarjetas · respuestas · imágenes · audio · consejos'],
  ['dictation','Dictado','quiz','https://h5p.org/dictation','Dictado con audio y corrección.','Audio · transcripción · intentos · feedback'],
  ['documentation-tool','Herramienta de documentación','writing','https://h5p.org/documentation-tool','Asistente para documentar un proyecto y exportarlo.','Páginas · objetivos · plan · evaluación · exportación'],
  ['drag-and-drop','Arrastrar y soltar','quiz','https://h5p.org/drag-and-drop','Elementos arrastrables y zonas de destino.','Arrastrables · zonas · relaciones · puntuación'],
  ['drag-the-words','Arrastra las palabras','quiz','https://h5p.org/drag-the-words','Texto con huecos y palabras arrastrables.','Texto · palabras · distractores · pistas'],
  ['essay','Redacción','writing','https://h5p.org/content-types/essay','Texto libre con feedback por palabras clave.','Instrucción · límites · palabras clave · solución'],
  ['fill-in-the-blanks','Completar espacios','quiz','https://h5p.org/fill-in-the-blanks','Texto con palabras ausentes.','Texto · respuestas · alternativas · feedback'],
  ['find-multiple-hotspots','Encontrar hotspots','quiz','https://h5p.org/find-multiple-hotspots','Encontrar varios puntos correctos en una imagen.','Imagen · hotspots · correctos · feedback'],
  ['find-the-hotspot','Encontrar el hotspot','quiz','https://h5p.org/image-hotspot-question','Encontrar un punto correcto en una imagen.','Imagen · hotspot · pregunta · respuesta'],
  ['find-the-words','Sopa de letras','game','https://h5p.org/find-the-words','Palabras ocultas en una cuadrícula.','Palabras · orientaciones · cuadrícula · soluciones'],
  ['flashcards','Tarjetas didácticas','quiz','https://h5p.org/flashcards','Tarjetas con imagen, pregunta y respuesta.','Tarjetas · imágenes · respuestas · feedback'],
  ['game-map','Mapa de juego','game','https://h5p.org/content-types/game-map','Mapa con etapas y contenidos desbloqueables.','Mapa · etapas · caminos · restricciones · puntuación'],
  ['guess-the-answer','Adivina la respuesta','quiz','https://h5p.org/guess-the-answer','Imagen con botón para revelar la respuesta.','Imagen · pregunta · respuesta · botón'],
  ['iframe-embedder','Insertar iframe','multimedia','https://h5p.org/iframe-embedder','Inserta contenido HTML o una URL.','URL o HTML · ancho · alto · redimensionado'],
  ['image-hotspots','Hotspots de imagen','multimedia','https://h5p.org/image-hotspots','Imagen con varios puntos informativos.','Imagen · hotspots · popups · texto · vídeo'],
  ['image-juxtaposition','Comparar imágenes','multimedia','https://h5p.org/image-juxtaposition','Comparación de dos imágenes con deslizador.','Imagen antes · imagen después · posición · orientación'],
  ['image-pairing','Emparejar imágenes','game','https://h5p.org/image-pairing','Relacionar imágenes mediante arrastre.','Pares · imágenes · instrucciones · reintento'],
  ['image-sequencing','Ordenar imágenes','quiz','https://h5p.org/content-types/image-sequencing','Ordenar imágenes correctamente.','Imágenes · descripciones · solución · reintento'],
  ['image-slider','Carrusel de imágenes','multimedia','https://h5p.org/image-slider','Galería de imágenes navegable.','Título · imágenes · texto alternativo · pantalla completa'],
  ['impressive-presentation-alpha','Presentación 3D','presentation','https://h5p.org/impressive-presentation','Presentación con zoom, rotación y paralaje.','Escenas · posiciones · rotaciones · fondos'],
  ['information-wall','Muro de información','other','https://h5p.org/content-types/information-wall','Paneles informativos filtrables.','Encabezado · paneles · propiedades · filtro'],
  ['interactive-book','Libro interactivo','presentation','https://h5p.org/content-types/interactive-book','Libro con capítulos y actividades H5P.','Portada · capítulos · índice · navegación'],
  ['kewar-code','Código QR','multimedia','https://h5p.org/content-types/kewar-code','Genera códigos QR de contacto, evento o URL.','Tipo · datos · colores · tamaño'],
  ['mark-the-words','Marcar palabras','writing','https://h5p.org/mark-the-words','Resaltar palabras correctas dentro de un texto.','Texto · palabras correctas · feedback · puntuación'],
  ['memory-game','Juego de memoria','game','https://h5p.org/memory-game','Parejas de imágenes con tiempo y turnos.','Parejas · imágenes · descripciones · tema'],
  ['multimedia-choice','Elección multimedia','quiz','https://h5p.org/content-types/image-choice','Pregunta con opciones visuales y audio.','Pregunta · opciones · imágenes · correctas'],
  ['multiple-choice','Opción múltiple','quiz','https://h5p.org/multichoice','Pregunta flexible con varias respuestas.','Pregunta · respuestas · feedback · puntuación'],
  ['page','Página H5P','other','https://h5p.org/column','Página vertical con varios contenidos H5P.','Elementos · orden · texto · actividades anidadas'],
  ['personality-quiz','Test de personalidad','survey','https://h5p.org/personality-quiz','Cuestionario que calcula un perfil final.','Preguntas · respuestas · personalidades · resultado'],
  ['questionnaire','Cuestionario','survey','https://h5p.org/questionnaire','Encuesta con selección y respuesta abierta.','Preguntas · obligatorias · opciones · pantalla final'],
  ['quiz-question-set','Quiz de preguntas','quiz','https://h5p.org/question-set','Secuencia de preguntas de distintos tipos.','Preguntas · tipos · respuestas · aprobado'],
  ['single-choice-set','Conjunto de opción única','quiz','https://h5p.org/single-choice-set','Serie de preguntas con una respuesta correcta.','Preguntas · opciones · feedback · avance'],
  ['sort-the-paragraphs','Ordenar párrafos','writing','https://h5p.org/content-types/sort-the-paragraphs','Ordenar párrafos con arrastre o teclado.','Consigna · párrafos · penalización · solución'],
  ['speak-the-words','Habla las palabras','quiz','https://h5p.org/speak-the-words','Responder usando reconocimiento de voz.','Pregunta · idioma · respuestas aceptadas · feedback'],
  ['speak-the-words-set','Conjunto de voz','quiz','https://h5p.org/speak-the-words-set','Serie de preguntas respondidas con voz.','Introducción · preguntas · idioma · feedback'],
  ['structure-strip','Banda de estructura','writing','https://h5p.org/content-types/structure-strip','Redactar secciones con pesos orientativos.','Secciones · pistas · pesos · colores · solución'],
  ['summary','Resumen','quiz','https://h5p.org/summary','Elegir afirmaciones para construir un resumen.','Instrucción · afirmaciones · correctas · feedback'],
  ['timeline','Línea temporal','multimedia','https://h5p.org/timeline','Eventos cronológicos con recursos multimedia.','Título · eventos · fechas · texto · medios'],
  ['true-false-question','Verdadero o falso','quiz','https://h5p.org/true-false','Afirmación con dos respuestas.','Afirmación · respuesta correcta · media · feedback'],
  ['virtual-tour-360','Tour virtual 360','multimedia','https://h5p.org/virtual-tour-360','Escenas panorámicas con hotspots.','Escenas · panoramas · hotspots · destinos'],
  ['complex-fill-the-blanks','Completar espacios avanzado','quiz','https://h5p.org/advanced-fill-the-blanks','Huecos con errores típicos y feedback específico.','Texto · huecos · respuestas · errores · feedback'],
].map(([id, name, group, demo, description, fields]) => ({
  id,
  name,
  group: group as H5PGroup,
  demo,
  description,
  fields,
  status: (id === 'find-the-words' || id === 'crossword' ? 'ready' : 'construction') as H5PStatus,
}));

export const h5pGroupLabels: Record<H5PGroup, string> = {
  quiz: 'Cuestionarios', presentation: 'Presentaciones', game: 'Juegos', multimedia: 'Multimedia', writing: 'Escritura', survey: 'Encuestas', other: 'Otros',
};
