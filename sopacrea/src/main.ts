import './style.css';
import { h5pCatalog, h5pGroupLabels, type H5PGroup } from './h5pCatalog';

type Mode = 'wordsearch' | 'crossword';
type Difficulty = 'easy' | 'medium' | 'hard';

type Entry = {
  id: number;
  word: string;
  clue: string;
};

type Placement = {
  id: number;
  word: string;
  row: number;
  col: number;
  dr: number;
  dc: number;
};

type VideoInteraction = { id: number; time: number; question: string; options: string[]; correct: number };
type VideoBookmark = { id: number; time: number; label: string };

let selectedH5PId = 'find-the-words';
let catalogQuery = '';
let catalogGroup: H5PGroup | 'all' = 'all';
let genericContent = '';
let genericSettings = { instructions: '', difficulty: 'media', time: 0, showScore: true, randomize: false, mediaUrl: '' };
let autoGenerateTimer = 0;

type Point = { row: number; col: number };

const demoEntries: Entry[] = [
  { id: 1, word: 'BOSQUE', clue: 'Lugar lleno de árboles y vida.' },
  { id: 2, word: 'SEMILLA', clue: 'Parte de la planta que puede germinar.' },
  { id: 3, word: 'RAÍZ', clue: 'Sujeta la planta y absorbe agua.' },
  { id: 4, word: 'HOJA', clue: 'Parte verde que capta la luz.' },
  { id: 5, word: 'LLUVIA', clue: 'Agua que cae de las nubes.' },
  { id: 6, word: 'ABEJA', clue: 'Pequeño insecto que poliniza flores.' },
];

const state = {
  mode: 'wordsearch' as Mode,
  difficulty: 'medium' as Difficulty,
  title: 'Descubre la naturaleza',
  instructions: 'Encuentra las palabras escondidas en la cuadrícula.',
  gridSize: 12,
  entries: demoEntries.map((entry) => ({ ...entry })),
  grid: [] as string[][],
  placements: [] as Placement[],
  found: new Set<string>(),
  selectedStart: null as Point | null,
  selectedCells: [] as Point[],
  pointerPos: null as { row: number; col: number } | null,
  pointerSelecting: false,
  suppressNextCellClick: false,
  crosswordRevealed: false,
  crosswordInputs: new Map<string, string>(),
  crosswordSelected: null as Point | null,
  crosswordDirection: 'across' as 'across' | 'down',
  crosswordChecked: false,
  nextId: 7,
};

const videoState = {
  url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  interactions: [
    { id: 1, time: 3, question: '¿Qué parte de la planta capta la luz?', options: ['La hoja', 'La raíz', 'La semilla'], correct: 0 },
    { id: 2, time: 9, question: '¿Qué insecto ayuda a polinizar?', options: ['La abeja', 'La hormiga', 'La mariposa'], correct: 0 },
  ] as VideoInteraction[],
  bookmarks: [
    { id: 1, time: 0, label: 'Inicio' },
    { id: 2, time: 6, label: 'Las hojas' },
    { id: 3, time: 12, label: 'Polinización' },
  ] as VideoBookmark[],
  nextId: 3,
};

const formatTime = (seconds: number): string => {
  const safe = Math.max(0, Math.floor(seconds || 0));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
};

const $ = <T extends Element>(selector: string): T => {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`No se encontró ${selector}`);
  return element as T;
};

const normalize = (value: string): string => value
  .toLocaleUpperCase('es-ES')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^A-ZÑ]/g, '');

const escapeHtml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const capitalize = (value: string): string => value.charAt(0) + value.slice(1).toLowerCase();
const h5pGroupIcons: Record<H5PGroup, string> = { quiz: '☑', presentation: '▤', game: '♞', multimedia: '◉', writing: '✎', survey: '☷', other: '◆' };

function renderCatalog(): void {
  const host = document.querySelector<HTMLDivElement>('[data-h5p-catalog]');
  if (!host) return;
  const query = catalogQuery.trim().toLocaleLowerCase('es-ES');
  const filtered = h5pCatalog.filter((item) => {
    const matchesQuery = !query || `${item.name} ${item.description} ${item.fields}`.toLocaleLowerCase('es-ES').includes(query);
    return matchesQuery && (catalogGroup === 'all' || item.group === catalogGroup);
  });
  const selected = h5pCatalog.find((item) => item.id === selectedH5PId) || h5pCatalog.find((item) => item.id === 'find-the-words')!;
  host.innerHTML = `
    <div class="catalog-selected"><div><span class="section-kicker">TIPO SELECCIONADO</span><h3><span class="selected-type-icon">${h5pGroupIcons[selected.group]}</span>${escapeHtml(selected.name)}</h3><p>${escapeHtml(selected.description)}</p><small>${escapeHtml(selected.fields)}</small></div><div class="catalog-selected-actions"><button class="button button-dark" data-action="download-selected"><span class="icon">↓</span> ${isNativeEditor() ? 'Descargar .h5p para Aules' : 'Descargar borrador'}</button><button class="button button-ghost" data-action="animate-selected"><span class="icon">✦</span> Animar</button><a class="button button-ghost catalog-demo" href="${selected.demo}" target="_blank" rel="noreferrer">Ver demo oficial ↗</a></div></div>
    <div class="catalog-toolbar"><label class="catalog-search"><span>⌕</span><input data-catalog-search type="search" value="${escapeHtml(catalogQuery)}" placeholder="Buscar entre 54 tipos H5P..." /></label><select data-catalog-group class="select-input"><option value="all">Todos los tipos</option>${Object.entries(h5pGroupLabels).map(([key, label]) => `<option value="${key}" ${catalogGroup === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div>
    <div class="catalog-grid">${filtered.map((item) => `<button class="catalog-card ${item.id === selectedH5PId ? 'is-selected' : ''} ${item.status === 'construction' ? 'is-construction' : ''}" data-h5p-id="${item.id}" ${item.status === 'construction' ? 'disabled aria-disabled="true" title="En construcción"' : ''}><span class="catalog-card-top"><span class="catalog-type-icon type-${item.group}">${h5pGroupIcons[item.group]}</span><span>${h5pGroupLabels[item.group]}</span><span class="catalog-arrow">${item.status === 'construction' ? '⏳' : '↗'}</span></span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.description)}</small><span class="catalog-status ${item.status === 'construction' ? 'is-construction' : 'is-ready'}">${item.status === 'construction' ? 'EN CONSTRUCCIÓN' : 'DISPONIBLE'}</span></button>`).join('')}</div>
    <p class="catalog-count">Mostrando ${filtered.length} de ${h5pCatalog.length} tipos · ${h5pCatalog.filter((item) => item.status === 'ready').length} disponibles; el resto se irá publicando poco a poco.</p>`;
}

function isWordActivity(): boolean {
  return selectedH5PId === 'find-the-words' || selectedH5PId === 'crossword';
}

function isNativeEditor(): boolean {
  return isWordActivity() || selectedH5PId === 'interactive-video';
}

function syncCatalogMode(): void {
  const editor = document.querySelector<HTMLElement>('.editor-panel');
  const generic = document.querySelector<HTMLElement>('[data-catalog-editor]');
  if (!editor || !generic) return;
  const selected = h5pCatalog.find((item) => item.id === selectedH5PId) || h5pCatalog[0];
  const native = isWordActivity();
  editor.classList.toggle('is-catalog-mode', !native);
  generic.innerHTML = native ? '' : selectedH5PId === 'interactive-video' ? renderVideoEditor() : `<div class="generic-editor-card"><span class="section-kicker">CREADOR H5P</span><h3>Crear ${escapeHtml(selected.name)}</h3><p>${escapeHtml(selected.description)}</p><label class="field-label">Título de la actividad<input data-generic-title type="text" value="${escapeHtml(state.title)}" /></label><label class="field-label">Contenido principal<textarea data-generic-content rows="5" placeholder="Escribe aquí el contenido de tu actividad...">${escapeHtml(genericContent)}</textarea></label><label class="field-label">Instrucciones para el alumnado<textarea data-generic-instructions rows="3" placeholder="Explica qué debe hacer el alumnado...">${escapeHtml(genericSettings.instructions)}</textarea></label><div class="generic-config-grid"><label class="field-label">Dificultad<select data-generic-difficulty><option value="facil" ${genericSettings.difficulty === 'facil' ? 'selected' : ''}>Fácil</option><option value="media" ${genericSettings.difficulty === 'media' ? 'selected' : ''}>Media</option><option value="dificil" ${genericSettings.difficulty === 'dificil' ? 'selected' : ''}>Difícil</option></select></label><label class="field-label">Tiempo (minutos)<input data-generic-time type="number" min="0" value="${genericSettings.time}" /></label></div><div class="generic-checks"><label><input data-generic-score type="checkbox" ${genericSettings.showScore ? 'checked' : ''} /> Mostrar puntuación</label><label><input data-generic-random type="checkbox" ${genericSettings.randomize ? 'checked' : ''} /> Orden aleatorio</label></div><label class="field-label">Vídeo, imagen o recurso (URL)<input data-generic-media type="url" value="${escapeHtml(genericSettings.mediaUrl)}" placeholder="https://..." /></label><div class="generic-fields"><strong>Campos principales de este formato</strong><span>${escapeHtml(selected.fields)}</span></div><div class="generic-editor-actions"><button class="button button-dark" data-action="generate-generic"><span class="icon">✦</span> Generar actividad</button><button class="button button-ghost" data-action="download-selected"><span class="icon">↓</span> Descargar borrador</button><a class="button button-ghost" href="${selected.demo}" target="_blank" rel="noreferrer">Ver demo oficial</a></div><small>La configuración se guarda en el borrador y se refleja en la vista previa. La exportación específica H5P se implementa por formato.</small></div>`;
}

function renderGenericPreview(): string {
  const selected = h5pCatalog.find((item) => item.id === selectedH5PId) || h5pCatalog[0];
  return `<div class="generic-preview"><div class="preview-header"><div class="preview-label"><span class="preview-icon">✦</span> ${escapeHtml(selected.name.toUpperCase())}</div><span class="preview-number">VISTA PREVIA</span></div><div class="generic-preview-body"><span class="section-kicker">ACTIVIDAD CREADA</span><h3>${escapeHtml(state.title || selected.name)}</h3><p>${escapeHtml(genericSettings.instructions || selected.description)}</p>${genericSettings.mediaUrl ? `<a class="generic-media-link" href="${escapeHtml(genericSettings.mediaUrl)}" target="_blank" rel="noreferrer">◉ Abrir recurso multimedia</a>` : ''}<div class="generic-content-preview">${escapeHtml(genericContent || 'Escribe contenido en el editor para verlo aquí.')}</div><div class="generic-fields"><strong>Configuración</strong><span>Dificultad: ${escapeHtml(genericSettings.difficulty)} · Tiempo: ${genericSettings.time ? `${genericSettings.time} min` : 'sin límite'} · ${genericSettings.showScore ? 'con puntuación' : 'sin puntuación'} · ${genericSettings.randomize ? 'orden aleatorio' : 'orden fijo'}</span></div></div></div>`;
}

function renderVideoEditor(): string {
  const questions = videoState.interactions.map((item, index) => `
    <div class="video-item" data-video-interaction="${item.id}">
      <div class="video-item-head"><strong>Pregunta ${index + 1}</strong><button class="remove-entry" data-action="remove-video-interaction" data-video-id="${item.id}" aria-label="Eliminar pregunta ${index + 1}">×</button></div>
      <div class="video-item-grid">
        <label class="field-label">Aparece en (segundos)<input data-video-field="time" data-video-id="${item.id}" type="number" min="0" step="1" value="${item.time}" /></label>
        <label class="field-label">Opción correcta<select data-video-field="correct" data-video-id="${item.id}">${item.options.map((_, optionIndex) => `<option value="${optionIndex}" ${optionIndex === item.correct ? 'selected' : ''}>Opción ${optionIndex + 1}</option>`).join('')}</select></label>
      </div>
      <label class="field-label">Pregunta<input data-video-field="question" data-video-id="${item.id}" type="text" value="${escapeHtml(item.question)}" maxlength="140" /></label>
      <label class="field-label">Opciones (separadas con |)<input data-video-field="options" data-video-id="${item.id}" type="text" value="${escapeHtml(item.options.join(' | '))}" /></label>
    </div>`).join('');
  const marks = videoState.bookmarks.map((item, index) => `
    <div class="video-item video-item-compact" data-video-bookmark="${item.id}">
      <span class="entry-index">${String(index + 1).padStart(2, '0')}</span>
      <input data-bookmark-field="time" data-video-id="${item.id}" type="number" min="0" step="1" value="${item.time}" aria-label="Segundo del marcador ${index + 1}" />
      <input data-bookmark-field="label" data-video-id="${item.id}" type="text" value="${escapeHtml(item.label)}" aria-label="Etiqueta del marcador ${index + 1}" />
      <button class="remove-entry" data-action="remove-video-bookmark" data-video-id="${item.id}" aria-label="Eliminar marcador ${index + 1}">×</button>
    </div>`).join('');

  return `<div class="generic-editor-card video-editor-card">
    <span class="section-kicker">CREADOR H5P</span>
    <h3>Vídeo interactivo</h3>
    <p>Sube un vídeo por URL, programa preguntas que aparecen en un segundo concreto y añade marcadores para saltar a los puntos clave.</p>
    <label class="field-label">Título de la actividad<input data-video-title type="text" value="${escapeHtml(state.title)}" maxlength="60" /></label>
    <label class="field-label">Instrucciones<textarea data-video-instructions rows="2" maxlength="140">${escapeHtml(state.instructions)}</textarea></label>
    <label class="field-label">URL del vídeo (MP4 o WebM)<input data-video-url type="url" value="${escapeHtml(videoState.url)}" placeholder="https://ejemplo.com/video.mp4" /></label>
    <div class="content-divider"></div>
    <div class="content-heading"><div><span class="section-kicker">CONTENIDO</span><h3>Preguntas temporizadas</h3></div><span class="counter">${videoState.interactions.length} preguntas</span></div>
    <div class="video-item-list">${questions || '<p class="video-empty">Sin preguntas todavía.</p>'}</div>
    <button class="add-entry" data-action="add-video-interaction"><span>＋</span> Añadir pregunta</button>
    <div class="content-divider"></div>
    <div class="content-heading"><div><span class="section-kicker">NAVEGACIÓN</span><h3>Marcadores</h3></div><span class="counter">${videoState.bookmarks.length} marcadores</span></div>
    <div class="video-item-list">${marks || '<p class="video-empty">Sin marcadores todavía.</p>'}</div>
    <button class="add-entry" data-action="add-video-bookmark"><span>＋</span> Añadir marcador</button>
    <div class="generic-editor-actions"><button class="button button-dark" data-action="generate-video"><span class="icon">✦</span> Actualizar vista previa</button></div>
    <small>El vídeo debe estar accesible públicamente por HTTPS. Si tu plataforma no reproduce MP4 externo, sube el archivo a Moodle y pega su URL.</small>
  </div>`;
}

function renderVideoPreview(): string {
  const points = [
    ...videoState.bookmarks.map((item) => ({ time: item.time, label: item.label, kind: 'bookmark' })),
    ...videoState.interactions.map((item) => ({ time: item.time, label: item.question, kind: 'question' })),
  ].sort((a, b) => a.time - b.time);
  const maxTime = Math.max(30, ...points.map((item) => item.time));
  const markers = points.map((item) => `<span class="video-marker ${item.kind}" style="left:${Math.min(100, (item.time / maxTime) * 100)}%" title="${formatTime(item.time)} · ${escapeHtml(item.label)}"></span>`).join('');
  const questionList = videoState.interactions.map((item) => `<li><span class="video-time">${formatTime(item.time)}</span><span>${escapeHtml(item.question)}</span><small>${item.options.length} opciones</small></li>`).join('');
  const bookmarkList = videoState.bookmarks.map((item) => `<button class="video-bookmark-chip" type="button">${formatTime(item.time)} · ${escapeHtml(item.label)}</button>`).join('');

  return `<div class="generic-preview video-preview">
    <div class="preview-header"><div class="preview-label"><span class="preview-icon">◉</span> VÍDEO INTERACTIVO</div><span class="preview-number">VISTA PREVIA</span></div>
    <div class="generic-preview-body">
      <span class="section-kicker">ACTIVIDAD CREADA</span>
      <h3>${escapeHtml(state.title || 'Vídeo interactivo')}</h3>
      <p>${escapeHtml(state.instructions || 'Responde a las preguntas mientras ves el vídeo.')}</p>
      <div class="video-screen">
        ${videoState.url ? `<video controls preload="metadata" src="${escapeHtml(videoState.url)}"></video>` : '<div class="video-placeholder">◉ Pega una URL de vídeo para verlo aquí</div>'}
      </div>
      <div class="video-timeline"><div class="video-timeline-track">${markers}</div><span>00:00</span><span>${formatTime(maxTime)}</span></div>
      <div class="video-chip-list">${bookmarkList || '<span class="video-empty">Sin marcadores</span>'}</div>
      <div class="video-question-list"><strong>Preguntas programadas</strong><ul>${questionList || '<li><span class="video-time">--:--</span><span>Sin preguntas todavía</span></li>'}</ul></div>
    </div>
  </div>`;
}

function seedMarkup(): void {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <a class="brand" href="#" aria-label="SopaCrea inicio">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          <span class="brand-name">Sopa<span>Crea</span></span>
        </a>
        <div class="topbar-actions">
          <span class="save-state"><span class="save-dot"></span> Guardado localmente</span>
          <button class="button button-dark" data-action="export-h5p" title="Descargar paquete H5P para Aules"><span class="icon">↓</span> Descargar .h5p</button>
          <button class="button button-ghost" data-action="scroll-preview"><span class="icon">◉</span> Vista previa</button>
          <button class="avatar" aria-label="Perfil de usuario">AM</button>
        </div>
      </header>

      <main>
        <section class="hero-section">
          <div class="hero-copy">
            <div class="eyebrow"><span class="sparkle">✦</span> Creador de actividades H5P</div>
            <h1>Crea actividades<br /><em>que despiertan</em> curiosidad.</h1>
            <p class="hero-text">Diseña sopas de letras y crucigramas listos para Aules. Pronto llegarán más formatos: el resto de la biblioteca está en construcción.</p>
          </div>
          <div class="hero-note">
            <div class="note-line"><span class="note-number">01</span><span>Elige tu formato</span></div>
            <div class="note-line"><span class="note-number">02</span><span>Añade el contenido</span></div>
            <div class="note-line"><span class="note-number">03</span><span>Descarga y comparte</span></div>
          </div>
        </section>

        <div class="mode-switcher" role="tablist" aria-label="Tipo de actividad">
          <button class="mode-tab is-active" data-mode="wordsearch" role="tab"><span class="tab-icon">⌕</span><span><strong>Sopa de letras</strong><small>Disponible · exporta para Aules</small></span><span class="tab-arrow">↗</span></button>
          <button class="mode-tab" data-mode="crossword" role="tab"><span class="tab-icon tab-icon-cross">＋</span><span><strong>Crucigrama</strong><small>Resuelve con pistas</small></span><span class="tab-arrow">↗</span></button>
        </div>

        <section class="catalog-section">
          <div class="catalog-heading"><div><span class="section-kicker">BIBLIOTECA H5P</span><h2>Explora los 54 tipos oficiales</h2><p>La sopa de letras y el crucigrama ya están disponibles. El resto de formatos está en construcción.</p></div><span class="catalog-badge">2 disponibles · 52 en construcción</span></div>
          <div data-h5p-catalog></div>
        </section>

        <div class="workspace">
          <aside class="editor-panel">
            <div class="panel-heading">
              <div><span class="section-kicker">EDITOR</span><h2>Da forma a tu actividad</h2></div>
              <span class="step-badge">1/2</span>
            </div>

            <div data-catalog-editor></div>

            <div class="field-group">
              <label for="activity-title">Título de la actividad</label>
              <input id="activity-title" class="text-input" type="text" value="Descubre la naturaleza" maxlength="60" />
            </div>
            <div class="field-group">
              <label for="activity-instructions">Instrucciones <span class="label-optional">Opcional</span></label>
              <textarea id="activity-instructions" class="text-input textarea-input" rows="2" maxlength="140">Encuentra las palabras escondidas en la cuadrícula.</textarea>
            </div>

            <div class="content-divider"></div>
            <div class="content-heading"><div><span class="section-kicker">CONTENIDO</span><h3 data-content-title>Palabras escondidas</h3></div><span class="counter" data-counter>6 palabras</span></div>
            <div class="entry-list" data-entry-list></div>
            <button class="add-entry" data-action="add-entry"><span>＋</span> Añadir palabra</button>

            <div class="content-divider"></div>
            <div class="settings-heading"><span class="section-kicker">CONFIGURACIÓN</span><span class="settings-icon">⚙</span></div>
            <div class="setting-row wordsearch-setting">
              <div><label for="grid-size">Tamaño de cuadrícula</label><small>Más grande = más reto</small></div>
              <select id="grid-size" class="select-input"><option value="10">10 × 10</option><option value="12" selected>12 × 12</option><option value="14">14 × 14</option><option value="16">16 × 16</option></select>
            </div>
            <div class="setting-row">
              <div><label>Nivel de dificultad</label><small data-difficulty-description>Horizontal, vertical y diagonal</small></div>
              <div class="difficulty-control"><button data-difficulty="easy">Fácil</button><button data-difficulty="medium" class="is-selected">Medio</button><button data-difficulty="hard">Difícil</button></div>
            </div>
            <div class="helper-tip"><span>✦</span><span><strong>Consejo docente</strong><br />Usa entre 5 y 10 palabras para mantener el ritmo de la actividad.</span></div>
          </aside>

          <section class="preview-panel" id="preview-section">
            <div class="preview-topline"><div><span class="section-kicker">VISTA PREVIA</span><h2>Así lo verá tu alumnado</h2></div><span class="live-pill"><span></span> En vivo</span></div>
            <div class="activity-preview" data-preview></div>
            <div class="preview-footer"><span><span class="keyboard-key">⌘</span> Interactiva en pantalla</span><span class="preview-footer-separator"></span><span>Lista para imprimir</span></div>
          </section>
        </div>

        <section class="export-section">
          <div class="export-copy"><span class="section-kicker">LISTA PARA COMPARTIR</span><h2>Tu actividad, allá donde la necesites.</h2><p>Para Moodle o Aules, descarga el archivo <strong>.h5p</strong>. No subas aquí el ZIP del código fuente de la web.</p></div>
          <div class="export-actions"><button class="button button-dark" data-action="export-h5p"><span>↓</span> Descargar .h5p para Aules</button><button class="button button-outline" data-action="print"><span>▣</span> Imprimir / PDF</button></div>
        </section>
      </main>
      <footer class="footer"><span>SopaCrea <span class="footer-dot">•</span> Hecho para enseñar creando.</span><span>Compatible con H5P · Sin registro</span></footer>
      <div class="toast" role="status" aria-live="polite" data-toast></div>
    </div>
  `;
}

function renderEntries(): void {
  const list = $('[data-entry-list]');
  const isCrossword = state.mode === 'crossword';
  list.innerHTML = state.entries.map((entry, index) => `
    <div class="entry-card" data-entry-card="${entry.id}">
      <span class="entry-index">${String(index + 1).padStart(2, '0')}</span>
      <div class="entry-fields">
        <input class="entry-input entry-word" data-entry-id="${entry.id}" data-field="word" type="text" value="${escapeHtml(entry.word)}" placeholder="PALABRA" maxlength="18" aria-label="Palabra ${index + 1}" />
        <input class="entry-input entry-clue" data-entry-id="${entry.id}" data-field="clue" type="text" value="${escapeHtml(entry.clue)}" placeholder="${isCrossword ? 'Escribe una pista...' : 'Añade una pista opcional...'}" maxlength="80" aria-label="Pista ${index + 1}" />
      </div>
      <button class="remove-entry" data-action="remove-entry" data-entry-id="${entry.id}" aria-label="Eliminar ${escapeHtml(entry.word)}">×</button>
    </div>
  `).join('');
  $('[data-counter]').textContent = `${state.entries.length} ${state.entries.length === 1 ? 'palabra' : 'palabras'}`;
  $('[data-content-title]').textContent = isCrossword ? 'Palabras y pistas' : 'Palabras escondidas';
  document.querySelectorAll<HTMLElement>('.wordsearch-setting').forEach((element) => {
    element.style.display = isCrossword ? 'none' : 'flex';
  });
}

function directionsForDifficulty(): Array<[number, number]> {
  if (state.difficulty === 'easy') return [[0, 1], [1, 0]];
  if (state.difficulty === 'medium') return [[0, 1], [1, 0], [1, 1], [1, -1]];
  return [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
}

function canPlace(grid: string[][], word: string, row: number, col: number, dr: number, dc: number): boolean {
  for (let index = 0; index < word.length; index += 1) {
    const nextRow = row + dr * index;
    const nextCol = col + dc * index;
    if (nextRow < 0 || nextRow >= state.gridSize || nextCol < 0 || nextCol >= state.gridSize) return false;
    const current = grid[nextRow][nextCol];
    if (current && current !== word[index]) return false;
  }
  return true;
}

function putWord(grid: string[][], word: string, row: number, col: number, dr: number, dc: number): void {
  for (let index = 0; index < word.length; index += 1) grid[row + dr * index][col + dc * index] = word[index];
}

function generateWordSearch(): void {
  const size = state.gridSize;
  state.grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
  state.placements = [];
  state.found.clear();
  state.selectedStart = null;
  state.selectedCells = [];
  state.pointerPos = null;
  const directions = directionsForDifficulty();
  const validEntries = state.entries
    .map((entry) => ({ entry, word: normalize(entry.word) }))
    .filter((item) => item.word.length >= 2 && item.word.length <= size)
    .sort((a, b) => b.word.length - a.word.length);

  for (const item of validEntries) {
    let placed = false;
    for (let attempt = 0; attempt < 600 && !placed; attempt += 1) {
      const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (canPlace(state.grid, item.word, row, col, dr, dc)) {
        putWord(state.grid, item.word, row, col, dr, dc);
        state.placements.push({ id: item.entry.id, word: item.word, row, col, dr, dc });
        placed = true;
      }
    }
  }

  const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!state.grid[row][col]) state.grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
}

function canPlaceCrossword(grid: string[][], word: string, row: number, col: number, dr: number, dc: number): boolean {
  for (let index = 0; index < word.length; index += 1) {
    const nextRow = row + dr * index;
    const nextCol = col + dc * index;
    if (nextRow < 0 || nextRow >= state.gridSize || nextCol < 0 || nextCol >= state.gridSize) return false;
    const current = grid[nextRow][nextCol];
    if (current && current !== word[index]) return false;
  }
  return true;
}

type CrosswordSpot = { row: number; col: number; dr: number; dc: number; score: number };

function crosswordCellKey(row: number, col: number): string {
  return `${row}-${col}`;
}

function crosswordBounds(): { minRow: number; maxRow: number; minCol: number; maxCol: number } {
  let minRow = state.gridSize;
  let maxRow = -1;
  let minCol = state.gridSize;
  let maxCol = -1;
  state.placements.forEach((placement) => {
    placementCells(placement).forEach((point) => {
      minRow = Math.min(minRow, point.row);
      maxRow = Math.max(maxRow, point.row);
      minCol = Math.min(minCol, point.col);
      maxCol = Math.max(maxCol, point.col);
    });
  });
  if (maxRow < minRow) return { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };
  return { minRow, maxRow, minCol, maxCol };
}

function crosswordNumberMap(): Map<string, number> {
  const numbers = new Map<string, number>();
  const sorted = [...state.placements].sort((a, b) => a.row - b.row || a.col - b.col || a.dc - b.dc);
  sorted.forEach((placement) => {
    const key = crosswordCellKey(placement.row, placement.col);
    if (!numbers.has(key)) numbers.set(key, numbers.size + 1);
  });
  return numbers;
}

function crosswordPlacementAt(row: number, col: number): Placement | undefined {
  return state.placements.find((placement) =>
    placementCells(placement).some((point) => point.row === row && point.col === col),
  );
}

function crosswordScore(word: string, row: number, col: number, dr: number, dc: number): number {
  let crossings = 0;
  let neighbours = 0;
  for (let index = 0; index < word.length; index += 1) {
    const nextRow = row + dr * index;
    const nextCol = col + dc * index;
    if (state.grid[nextRow]?.[nextCol] === word[index]) crossings += 1;
    const around = [
      [nextRow - 1, nextCol], [nextRow + 1, nextCol],
      [nextRow, nextCol - 1], [nextRow, nextCol + 1],
    ];
    around.forEach(([r, c]) => {
      if (r >= 0 && r < state.gridSize && c >= 0 && c < state.gridSize && state.grid[r][c]) neighbours += 1;
    });
  }
  const center = (state.gridSize - 1) / 2;
  const distance = Math.abs(row - center) + Math.abs(col - center);
  return crossings * 30 + Math.min(neighbours, 8) * 3 + word.length - distance * 0.15;
}

function bestCrosswordSpot(word: string): CrosswordSpot | null {
  let best: CrosswordSpot | null = null;
  const consider = (row: number, col: number, dr: number, dc: number) => {
    if (!canPlaceCrossword(state.grid, word, row, col, dr, dc)) return;
    const score = crosswordScore(word, row, col, dr, dc);
    if (!best || score > best.score) best = { row, col, dr, dc, score };
  };

  // 1) Cruces con palabras ya colocadas: el resultado parece un crucigrama de verdad.
  for (const existing of state.placements) {
    for (let existingIndex = 0; existingIndex < existing.word.length; existingIndex += 1) {
      const existingRow = existing.row + existing.dr * existingIndex;
      const existingCol = existing.col + existing.dc * existingIndex;
      for (let itemIndex = 0; itemIndex < word.length; itemIndex += 1) {
        if (word[itemIndex] !== existing.word[existingIndex]) continue;
        const dr = existing.dr === 0 ? 1 : 0;
        const dc = existing.dc === 0 ? 1 : 0;
        consider(existingRow - dr * itemIndex, existingCol - dc * itemIndex, dr, dc);
      }
    }
  }

  // 2) Si no hay ningún cruce posible, colocamos la palabra en cualquier hueco válido.
  if (!best) {
    for (let row = 0; row < state.gridSize; row += 1) {
      for (let col = 0; col < state.gridSize; col += 1) {
        consider(row, col, 0, 1);
        consider(row, col, 1, 0);
      }
    }
  }
  return best;
}

function generateCrossword(): void {
  const size = state.gridSize;
  state.grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
  state.placements = [];
  state.found.clear();
  state.crosswordRevealed = false;
  state.crosswordInputs.clear();
  state.crosswordSelected = null;
  state.crosswordDirection = 'across';
  state.crosswordChecked = false;
  const entries = state.entries
    .map((entry) => ({ entry, word: normalize(entry.word) }))
    .filter((item) => item.word.length >= 2 && item.word.length <= size)
    .sort((a, b) => b.word.length - a.word.length);
  if (!entries.length) return;

  const first = entries[0];
  const firstCol = Math.max(0, Math.floor((size - first.word.length) / 2));
  const firstRow = Math.floor(size / 2);
  putWord(state.grid, first.word, firstRow, firstCol, 0, 1);
  state.placements.push({ id: first.entry.id, word: first.word, row: firstRow, col: firstCol, dr: 0, dc: 1 });

  for (const item of entries.slice(1)) {
    const spot = bestCrosswordSpot(item.word);
    if (!spot) continue;
    putWord(state.grid, item.word, spot.row, spot.col, spot.dr, spot.dc);
    state.placements.push({ id: item.entry.id, word: item.word, row: spot.row, col: spot.col, dr: spot.dr, dc: spot.dc });
  }
}

function pointKey(point: Point): string { return `${point.row}-${point.col}`; }

function placementCells(placement: Placement): Point[] {
  return Array.from({ length: placement.word.length }, (_, index) => ({ row: placement.row + placement.dr * index, col: placement.col + placement.dc * index }));
}

function lineBetween(start: Point, end: Point): Point[] {
  const rowDelta = end.row - start.row;
  const colDelta = end.col - start.col;
  const straight = rowDelta === 0 || colDelta === 0 || Math.abs(rowDelta) === Math.abs(colDelta);
  if (!straight) return [];
  const steps = Math.max(Math.abs(rowDelta), Math.abs(colDelta));
  const rowStep = steps ? rowDelta / steps : 0;
  const colStep = steps ? colDelta / steps : 0;
  return Array.from({ length: steps + 1 }, (_, index) => ({ row: start.row + rowStep * index, col: start.col + colStep * index }));
}

function isSelected(row: number, col: number): boolean {
  return state.selectedCells.some((point) => point.row === row && point.col === col);
}

function isFoundCell(row: number, col: number): boolean {
  return state.placements.some((placement) => state.found.has(placement.word) && placementCells(placement).some((point) => point.row === row && point.col === col));
}

function renderSelectionLine(start: Point, end: Point, className: string, freeEnd?: { row: number; col: number }): string {
  const x2 = freeEnd ? freeEnd.col : end.col + 0.5;
  const y2 = freeEnd ? freeEnd.row : end.row + 0.5;
  return `<line class="${className}" marker-end="url(#green-selection-arrow)" x1="${start.col + 0.5}" y1="${start.row + 0.5}" x2="${x2}" y2="${y2}" />`;
}

function renderWordSearchPreview(): string {
  const size = state.gridSize;
  const cells = state.grid.map((row, rowIndex) => row.map((letter, colIndex) => {
    const classes = ['preview-cell'];
    if (isSelected(rowIndex, colIndex)) classes.push('is-selected');
    if (isFoundCell(rowIndex, colIndex)) classes.push('is-found');
    return `<button class="${classes.join(' ')}" data-cell-row="${rowIndex}" data-cell-col="${colIndex}" aria-label="Fila ${rowIndex + 1}, columna ${colIndex + 1}, letra ${letter}">${letter}</button>`;
  }).join('')).join('');
  const foundCount = state.found.size;
  const words = state.entries.map((entry) => {
    const normalized = normalize(entry.word);
    const found = state.found.has(normalized);
    return `<span class="word-chip ${found ? 'is-found' : ''}">${found ? '✓' : '○'} ${escapeHtml(entry.word || 'Sin palabra')}</span>`;
  }).join('');
  const foundLines = state.placements
    .filter((placement) => state.found.has(placement.word))
    .map((placement) => {
      const cells = placementCells(placement);
      return renderSelectionLine(cells[0], cells[cells.length - 1], 'found-line');
    }).join('');
  const currentLine = state.selectedStart
    ? renderSelectionLine(
        state.selectedStart,
        state.selectedCells[state.selectedCells.length - 1] || state.selectedStart,
        'current-line',
        state.pointerPos || undefined,
      )
    : '';
  return `
    <div class="preview-header"><div class="preview-label"><span class="preview-icon">⌕</span> SOPA DE LETRAS</div><span class="preview-number">${String(state.entries.length).padStart(2, '0')} PALABRAS</span></div>
    <div class="preview-title-row"><div><h3>${escapeHtml(state.title || 'Sin título')}</h3><p>${escapeHtml(state.instructions || 'Encuentra las palabras escondidas.')}</p></div><span class="progress-badge">${foundCount}/${state.placements.length} encontradas</span></div>
    <div class="wordsearch-layout"><div class="grid-frame"><div class="grid-board"><svg class="selection-overlay" viewBox="0 0 ${size} ${size}" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="green-selection-arrow" markerWidth="0.8" markerHeight="0.8" refX="0.68" refY="0.4" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 0.8 0.4 L 0 0.8 z" fill="#4f9678" /></marker></defs>${foundLines}${currentLine}</svg><div class="word-grid" style="--grid-size:${size}">${cells}</div></div><div class="grid-hint"><span>1</span> Mantén pulsado y arrastra hasta la última letra</div></div><div class="word-list"><div class="word-list-title"><span>PALABRAS</span><span>${foundCount}/${state.placements.length}</span></div>${words}</div></div>
    <div class="preview-activity-footer"><span><span class="timer-icon">◷</span> Tiempo: <strong>00:00</strong></span><span class="check-status">${foundCount === state.placements.length && state.placements.length ? '¡Actividad completada!' : 'Selecciona una palabra para comprobar'}</span></div>
  `;
}

function crosswordEntryClue(placement: Placement): string {
  return state.entries.find((entry) => entry.id === placement.id)?.clue?.trim() || '';
}

function crosswordWordState(placement: Placement): { cells: Point[]; guess: string; complete: boolean; correct: boolean } {
  const cells = placementCells(placement);
  const guess = cells.map(({ row, col }) => state.crosswordInputs.get(crosswordCellKey(row, col)) || '').join('');
  const complete = cells.every(({ row, col }) => Boolean(state.crosswordInputs.get(crosswordCellKey(row, col))));
  return { cells, guess, complete, correct: complete && guess === placement.word };
}

function crosswordActivePlacement(): Placement | undefined {
  if (!state.crosswordSelected) return undefined;
  const { row, col } = state.crosswordSelected;
  return state.placements.find((placement) => {
    const sameDirection = state.crosswordDirection === 'across' ? placement.dc !== 0 : placement.dr !== 0;
    return sameDirection && placementCells(placement).some((point) => point.row === row && point.col === col);
  });
}

function renderCrosswordPreview(): string {
  const bounds = crosswordBounds();
  const rows = Math.max(1, bounds.maxRow - bounds.minRow + 1);
  const cols = Math.max(1, bounds.maxCol - bounds.minCol + 1);
  const numbers = crosswordNumberMap();
  const active = crosswordActivePlacement();
  const activeKeys = new Set(active ? placementCells(active).map((point) => pointKey(point)) : []);
  const correctCells = new Set<string>();
  const wrongCells = new Set<string>();
  if (state.crosswordChecked) {
    state.placements.forEach((placement) => {
      const info = crosswordWordState(placement);
      if (!info.complete) return;
      info.cells.forEach((point) => (info.correct ? correctCells : wrongCells).add(pointKey(point)));
    });
    correctCells.forEach((key) => wrongCells.delete(key));
  }

  const cells: string[] = [];
  for (let row = bounds.minRow; row <= bounds.maxRow; row += 1) {
    for (let col = bounds.minCol; col <= bounds.maxCol; col += 1) {
      const letter = state.grid[row]?.[col] || '';
      if (!letter) {
        cells.push('<span class="cross-cell cross-block" aria-hidden="true"></span>');
        continue;
      }
      const key = crosswordCellKey(row, col);
      const value = state.crosswordInputs.get(key) || '';
      const classes = ['cross-cell'];
      if (state.crosswordSelected?.row === row && state.crosswordSelected?.col === col) classes.push('is-selected');
      if (activeKeys.has(key)) classes.push('is-active');
      if (correctCells.has(key)) classes.push('is-correct');
      if (wrongCells.has(key)) classes.push('is-wrong');
      if (state.crosswordRevealed) classes.push('is-revealed');
      const number = numbers.get(key);
      const shown = state.crosswordRevealed ? letter : value;
      cells.push(`<button class="${classes.join(' ')}" data-cross-row="${row}" data-cross-col="${col}" aria-label="Fila ${row - bounds.minRow + 1}, columna ${col - bounds.minCol + 1}${number ? `, pista ${number}` : ''}">${number ? `<span class="cross-number">${number}</span>` : ''}<span class="cross-letter">${shown}</span></button>`);
    }
  }

  const numbered = state.placements
    .map((placement) => ({
      placement,
      number: numbers.get(crosswordCellKey(placement.row, placement.col)) || 0,
      across: placement.dc !== 0,
      info: crosswordWordState(placement),
    }))
    .sort((a, b) => a.number - b.number || (a.across === b.across ? 0 : a.across ? -1 : 1));

  const clues = numbered.map(({ placement, number, across, info }) => `
    <button class="clue-row ${info.correct ? 'is-solved' : ''}" data-crossword-id="${placement.id}">
      <span class="clue-number">${number}</span>
      <span class="clue-direction" title="${across ? 'Horizontal' : 'Vertical'}">${across ? '→' : '↓'}</span>
      <span class="clue-text">${escapeHtml(crosswordEntryClue(placement) || 'Añade una pista para esta palabra.')}</span>
    </button>`).join('');

  const solved = numbered.length > 0 && numbered.every((item) => item.info.correct);
  const status = state.crosswordRevealed
    ? 'Solución mostrada'
    : solved
      ? '¡Crucigrama resuelto!'
      : state.crosswordChecked
        ? 'Revisa las letras marcadas en rojo'
        : 'Haz clic en una casilla y escribe';

  return `
    <div class="preview-header"><div class="preview-label"><span class="preview-icon tab-icon-cross">＋</span> CRUCIGRAMA</div><span class="preview-number">${String(numbered.length).padStart(2, '0')} PISTAS</span></div>
    <div class="preview-title-row"><div><h3>${escapeHtml(state.title || 'Sin título')}</h3><p>${escapeHtml(state.instructions || 'Resuelve las pistas y completa la cuadrícula.')}</p></div>
      <div class="crossword-actions">
        <button class="mini-action" data-action="check-crossword">Comprobar</button>
        <button class="mini-action" data-action="reveal-crossword">${state.crosswordRevealed ? 'Ocultar solución' : 'Mostrar solución'}</button>
        <button class="mini-action" data-action="reset-crossword">Reiniciar</button>
      </div>
    </div>
    <div class="crossword-layout"><div class="crossword-grid" style="--cross-cols:${cols};--cross-rows:${rows};aspect-ratio:${cols} / ${rows}">${cells.join('')}</div><div class="clue-list"><div class="word-list-title"><span>PISTAS</span><span>${numbered.length}</span></div>${clues}</div></div>
    <div class="preview-activity-footer"><span><span class="timer-icon">◷</span> Tiempo: <strong>00:00</strong></span><span class="check-status">${status}</span></div>
  `;
}

function renderPreview(): void {
  const preview = $('[data-preview]');
  if (selectedH5PId === 'interactive-video') preview.innerHTML = renderVideoPreview();
  else if (!isNativeEditor()) preview.innerHTML = renderGenericPreview();
  else preview.innerHTML = state.mode === 'wordsearch' ? renderWordSearchPreview() : renderCrosswordPreview();
}

function selectCrosswordCell(row: number, col: number, direction?: 'across' | 'down'): void {
  if (!state.grid[row]?.[col]) return;
  const placementsHere = state.placements.filter((placement) => placementCells(placement).some((point) => point.row === row && point.col === col));
  if (!placementsHere.length) return;
  let nextDirection = direction;
  if (!nextDirection) {
    const sameCell = state.crosswordSelected?.row === row && state.crosswordSelected?.col === col;
    if (sameCell) nextDirection = state.crosswordDirection === 'across' ? 'down' : 'across';
    else nextDirection = placementsHere.some((placement) => placement.dc !== 0) ? 'across' : 'down';
  }
  if (!placementsHere.some((placement) => (nextDirection === 'across' ? placement.dc !== 0 : placement.dr !== 0))) {
    nextDirection = nextDirection === 'across' ? 'down' : 'across';
  }
  state.crosswordSelected = { row, col };
  state.crosswordDirection = nextDirection;
  state.crosswordChecked = false;
  renderPreview();
}

function moveCrosswordSelection(delta: number): void {
  if (!state.crosswordSelected) return;
  const active = crosswordActivePlacement();
  if (active) {
    const cells = placementCells(active);
    const index = cells.findIndex((point) => point.row === state.crosswordSelected!.row && point.col === state.crosswordSelected!.col);
    const next = cells[index + delta];
    if (next) state.crosswordSelected = { row: next.row, col: next.col };
    return;
  }
  const stepRow = state.crosswordDirection === 'down' ? delta : 0;
  const stepCol = state.crosswordDirection === 'across' ? delta : 0;
  const row = state.crosswordSelected.row + stepRow;
  const col = state.crosswordSelected.col + stepCol;
  if (state.grid[row]?.[col]) state.crosswordSelected = { row, col };
}

function typeCrosswordLetter(letter: string): void {
  if (!letter) return;
  if (!state.crosswordSelected) {
    const first = state.placements[0];
    if (!first) return;
    state.crosswordSelected = { row: first.row, col: first.col };
    state.crosswordDirection = first.dc !== 0 ? 'across' : 'down';
  }
  state.crosswordInputs.set(crosswordCellKey(state.crosswordSelected.row, state.crosswordSelected.col), letter);
  state.crosswordChecked = false;
  moveCrosswordSelection(1);
  renderPreview();
}

function eraseCrosswordLetter(): void {
  if (!state.crosswordSelected) return;
  const currentKey = crosswordCellKey(state.crosswordSelected.row, state.crosswordSelected.col);
  if (state.crosswordInputs.has(currentKey)) {
    state.crosswordInputs.delete(currentKey);
  } else {
    moveCrosswordSelection(-1);
    if (state.crosswordSelected) {
      state.crosswordInputs.delete(crosswordCellKey(state.crosswordSelected.row, state.crosswordSelected.col));
    }
  }
  state.crosswordChecked = false;
  renderPreview();
}

function checkCrossword(): void {
  if (!state.placements.length) return;
  state.crosswordChecked = true;
  const solved = state.placements.every((placement) => crosswordWordState(placement).correct);
  renderPreview();
  showToast(solved ? '¡Crucigrama resuelto! 🎉' : 'Revisa las letras marcadas en rojo.');
}

function resetCrossword(): void {
  state.crosswordInputs.clear();
  state.crosswordRevealed = false;
  state.crosswordChecked = false;
  state.crosswordSelected = null;
  state.crosswordDirection = 'across';
  renderPreview();
  showToast('Crucigrama reiniciado.');
}

function showToast(message: string, tone: 'normal' | 'error' = 'normal'): void {
  const toast = $('[data-toast]');
  toast.textContent = message;
  toast.className = `toast is-visible ${tone === 'error' ? 'is-error' : ''}`;
  window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function showValidation(): boolean {
  const invalid = state.entries.filter((entry) => normalize(entry.word).length < 2);
  if (!state.title.trim()) {
    showToast('Añade un título para tu actividad.', 'error');
    return false;
  }
  if (state.entries.length < 2) {
    showToast('Añade al menos dos palabras para generar la actividad.', 'error');
    return false;
  }
  if (invalid.length) {
    showToast('Cada palabra debe tener al menos 2 letras.', 'error');
    return false;
  }
  const tooLong = state.mode === 'wordsearch' && state.entries.some((entry) => normalize(entry.word).length > state.gridSize);
  if (tooLong) {
    showToast(`Hay una palabra más larga que la cuadrícula de ${state.gridSize} × ${state.gridSize}.`, 'error');
    return false;
  }
  return true;
}

function generateActivity(showMessage = true): void {
  if (!showValidation()) return;
  if (state.mode === 'wordsearch') generateWordSearch();
  else generateCrossword();
  renderPreview();
  if (showMessage) showToast(state.mode === 'wordsearch' ? 'Sopa de letras generada.' : 'Crucigrama actualizado.');
}

function autoGenerateNow(): void {
  if (state.mode === 'wordsearch') generateWordSearch();
  else generateCrossword();
  renderPreview();
}

function scheduleAutoGenerate(delay = 100): void {
  window.clearTimeout(autoGenerateTimer);
  autoGenerateTimer = window.setTimeout(() => {
    const valid = state.entries.filter((entry) => {
      const word = normalize(entry.word);
      return word.length >= 2 && (state.mode !== 'wordsearch' || word.length <= state.gridSize);
    });
    if (valid.length < 2) { renderPreview(); return; }
    autoGenerateNow();
  }, delay);
}

function updateDifficultyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-difficulty]').forEach((button) => {
    button.classList.toggle('is-selected', button.dataset.difficulty === state.difficulty);
  });
  const descriptions: Record<Difficulty, string> = {
    easy: 'Solo horizontal y vertical',
    medium: 'Horizontal, vertical y diagonal',
    hard: 'En todas las direcciones',
  };
  $('[data-difficulty-description]').textContent = descriptions[state.difficulty];
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function write32(target: Uint8Array, offset: number, value: number): void {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
  target[offset + 2] = (value >>> 16) & 0xff;
  target[offset + 3] = (value >>> 24) & 0xff;
}

function write16(target: Uint8Array, offset: number, value: number): void {
  target[offset] = value & 0xff;
  target[offset + 1] = (value >>> 8) & 0xff;
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
  let offset = 0;
  chunks.forEach((chunk) => { result.set(chunk, offset); offset += chunk.length; });
  return result;
}

function createZip(files: Array<{ name: string; data: string }>): Blob {
  const encoder = new TextEncoder();
  const localChunks: Uint8Array[] = [];
  const centralChunks: Uint8Array[] = [];
  let offset = 0;
  files.forEach((file) => {
    const name = encoder.encode(file.name);
    const data = encoder.encode(file.data);
    const crc = crc32(data);
    const local = new Uint8Array(30 + name.length + data.length);
    write32(local, 0, 0x04034b50); write16(local, 4, 20); write16(local, 6, 0); write16(local, 8, 0); write16(local, 10, 0); write16(local, 12, 0); write32(local, 14, crc); write32(local, 18, data.length); write32(local, 22, data.length); write16(local, 26, name.length); write16(local, 28, 0);
    local.set(name, 30); local.set(data, 30 + name.length);
    localChunks.push(local);
    const central = new Uint8Array(46 + name.length);
    write32(central, 0, 0x02014b50); write16(central, 4, 20); write16(central, 6, 20); write16(central, 8, 0); write16(central, 10, 0); write16(central, 12, 0); write16(central, 14, 0); write32(central, 16, crc); write32(central, 20, data.length); write32(central, 24, data.length); write16(central, 28, name.length); write16(central, 30, 0); write16(central, 32, 0); write16(central, 34, 0); write16(central, 36, 0); write32(central, 38, 0); write32(central, 42, offset);
    central.set(name, 46); centralChunks.push(central); offset += local.length;
  });
  const localData = concatBytes(localChunks);
  const centralData = concatBytes(centralChunks);
  const end = new Uint8Array(22);
  write32(end, 0, 0x06054b50); write16(end, 4, 0); write16(end, 6, 0); write16(end, 8, files.length); write16(end, 10, files.length); write32(end, 12, centralData.length); write32(end, 16, localData.length); write16(end, 20, 0);
  return new Blob([localData.buffer as ArrayBuffer, centralData.buffer as ArrayBuffer, end.buffer as ArrayBuffer], { type: 'application/zip' });
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildH5pLibraryScript(machineName: string): string {
  const className = machineName.replace(/^H5P\./, '');
  return `(function ($) {
  H5P.${className} = function (params, contentId, extras) {
    var self = this;
    self.params = params || {};
    self.contentId = contentId;
    self.attach = function ($container) {
      var words = self.params.words || [];
      var solutions = parseData(self.params.solutionsData, self.params.solutions);
      var grid = parseData(self.params.gridData, self.params.grid);
      var size = grid.length || 1;
      function parseData(json, fallback) {
        if (typeof json === 'string' && json) {
          try {
            var txt = document.createElement('textarea');
            txt.innerHTML = json;
            return JSON.parse(txt.value);
          } catch (e) { return []; }
        }
        return fallback || [];
      }
      var selected = null;
      var selecting = false;
      var svgNS = 'http://www.w3.org/2000/svg';
      var markerId = 'h5p-findwords-arrow-' + contentId;

      function lineBetween(start, end) {
        var dr = end.row - start.row, dc = end.col - start.col;
        if (!(dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc))) return [];
        var steps = Math.max(Math.abs(dr), Math.abs(dc));
        var rs = steps ? dr / steps : 0, cs = steps ? dc / steps : 0;
        var out = [];
        for (var i = 0; i <= steps; i++) out.push({ row: start.row + rs * i, col: start.col + cs * i });
        return out;
      }
      function svg(tag, attrs) {
        var el = document.createElementNS(svgNS, tag);
        for (var key in attrs) el.setAttribute(key, attrs[key]);
        return $(el);
      }
      function cellCenter(row, col) {
        var el = $board.find('[data-row="' + row + '"][data-col="' + col + '"]')[0];
        if (!el) return { x: col + 0.5, y: row + 0.5 };
        var br = $board[0].getBoundingClientRect(), cr = el.getBoundingClientRect();
        return {
          x: ((cr.left + cr.width / 2 - br.left) / br.width) * size,
          y: ((cr.top + cr.height / 2 - br.top) / br.height) * size
        };
      }
      function pointerPoint(event) {
        var br = $board[0].getBoundingClientRect();
        var clamp = function (v) { return Math.max(0, Math.min(size, v)); };
        return {
          x: clamp(((event.clientX - br.left) / br.width) * size),
          y: clamp(((event.clientY - br.top) / br.height) * size)
        };
      }

      var $root = $('<div class="h5p-findwords"></div>');
      $root.append('<p class="h5p-findwords-description">' + (self.params.taskDescription || '') + '</p>');
      var $layout = $('<div class="h5p-findwords-layout"></div>');
      var $board = $('<div class="h5p-findwords-board"></div>');
      grid.forEach(function (row, rowIndex) {
        row.forEach(function (letter, colIndex) {
          $board.append($('<button type="button" class="h5p-findwords-cell"></button>')
            .attr({ 'data-row': rowIndex, 'data-col': colIndex }).text(letter));
        });
      });
      $board.css('grid-template-columns', 'repeat(' + (grid.length || 1) + ', 1fr)');

      var $overlay = svg('svg', { 'class': 'h5p-findwords-overlay', viewBox: '0 0 ' + (grid.length || 1) + ' ' + (grid.length || 1), preserveAspectRatio: 'none', 'aria-hidden': 'true' });
      var $defs = svg('defs', {});
      var $marker = svg('marker', { id: markerId, markerWidth: 0.8, markerHeight: 0.8, refX: 0.68, refY: 0.4, orient: 'auto', markerUnits: 'strokeWidth' });
      $marker.append(svg('path', { d: 'M 0 0 L 0.8 0.4 L 0 0.8 z', fill: '#4f9678' }));
      $defs.append($marker);
      var $foundLayer = svg('g', { 'class': 'h5p-findwords-found-lines' });
      var $currentLine = svg('line', { 'class': 'h5p-findwords-current-line', 'marker-end': 'url(#' + markerId + ')', x1: 0, y1: 0, x2: 0, y2: 0 });
      $currentLine.hide();
      $overlay.append($defs).append($foundLayer).append($currentLine);
      $board.append($overlay);

      function clearSelection() {
        selecting = false;
        selected = null;
        $board.find('.h5p-findwords-cell.selected').removeClass('selected');
        $currentLine.hide();
      }
      function addFoundLine(a, b) {
        var pa = cellCenter(a.row, a.col), pb = cellCenter(b.row, b.col);
        $foundLayer.append(svg('line', {
          'class': 'h5p-findwords-found-line',
          'marker-end': 'url(#' + markerId + ')',
          x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y
        }));
      }
      function finishSelection(row, col) {
        if (!selected) return;
        var cells = lineBetween(selected, { row: row, col: col });
        var word = cells.map(function (p) { return (grid[p.row] && grid[p.row][p.col]) || ''; }).join('');
        var reverse = word.split('').reverse().join('');
        var match = null;
        for (var i = 0; i < solutions.length; i++) {
          if (solutions[i].word === word || solutions[i].word === reverse) { match = solutions[i]; break; }
        }
        if (match) {
          cells.forEach(function (p) {
            $board.find('[data-row="' + p.row + '"][data-col="' + p.col + '"]').addClass('found');
          });
          $root.find('[data-word="' + match.word + '"]').addClass('found');
          addFoundLine(cells[0], cells[cells.length - 1]);
        }
        clearSelection();
      }

      $board.on('pointerdown', '.h5p-findwords-cell', function (event) {
        event.preventDefault();
        var cell = { row: Number($(this).attr('data-row')), col: Number($(this).attr('data-col')) };
        if (selected && (selected.row !== cell.row || selected.col !== cell.col)) {
          finishSelection(cell.row, cell.col);
          return;
        }
        selecting = true;
        selected = cell;
        $(this).addClass('selected');
        var c = cellCenter(cell.row, cell.col);
        $currentLine.attr({ x1: c.x, y1: c.y, x2: c.x, y2: c.y }).show();
      });

      $(document).on('pointermove.h5pf' + contentId, function (event) {
        if (!selecting || !selected) return;
        var p = pointerPoint(event);
        $currentLine.attr({ x2: p.x, y2: p.y });
        var hit = document.elementFromPoint(event.clientX, event.clientY);
        var $cell = hit ? $(hit).closest('.h5p-findwords-cell') : $();
        var cells = [];
        if ($cell.length) {
          cells = lineBetween(selected, { row: Number($cell.attr('data-row')), col: Number($cell.attr('data-col')) });
        }
        $board.find('.h5p-findwords-cell.selected').removeClass('selected');
        cells.forEach(function (point) {
          $board.find('[data-row="' + point.row + '"][data-col="' + point.col + '"]').addClass('selected');
        });
      });

      $(document).on('pointerup.h5pf' + contentId, function (event) {
        if (!selecting || !selected) return;
        selecting = false;
        $currentLine.hide();
        var hit = document.elementFromPoint(event.clientX, event.clientY);
        var $cell = hit ? $(hit).closest('.h5p-findwords-cell') : $();
        if (!$cell.length) { clearSelection(); return; }
        var row = Number($cell.attr('data-row')), col = Number($cell.attr('data-col'));
        if (row === selected.row && col === selected.col) return;
        finishSelection(row, col);
      });

      $(document).on('pointercancel.h5pf' + contentId, function () {
        if (selecting) clearSelection();
      });

      var $list = $('<ol class="h5p-findwords-list"></ol>');
      var wordList = self.params.wordList || [];
      if (wordList.length) {
        wordList.forEach(function (entry) {
          var answer = entry.answer || '';
          var $li = $('<li></li>').attr('data-word', answer).text(answer);
          if (entry.clue) { $li.append($('<small></small>').text(' — ' + entry.clue)); }
          $list.append($li);
        });
      } else {
        words.forEach(function (word) { $list.append($('<li></li>').attr('data-word', word).text(word)); });
      }
      $layout.append($board).append($list); $root.append($layout); $container.append($root);
    };
  };
})(H5P.jQuery);`;
}

function buildVideoLibraryScript(machineName: string): string {
  const className = machineName.replace(/^H5P\./, '');
  return `(function () {
  H5P.${className} = function (params, contentId) {
    var self = this;
    self.params = params || {};
    self.contentId = contentId;
    self.attach = function ($container) {
      var container = $container && $container[0] ? $container[0] : $container;
      function parseData(json, fallback) {
        if (typeof json === 'string' && json) {
          try {
            var txt = document.createElement('textarea');
            txt.innerHTML = json;
            return JSON.parse(txt.value);
          } catch (e) { return []; }
        }
        return fallback || [];
      }
      function fmt(value) {
        var n = Math.max(0, Math.floor(Number(value) || 0));
        return ('0' + Math.floor(n / 60)).slice(-2) + ':' + ('0' + (n % 60)).slice(-2);
      }

      var interactions = parseData(self.params.interactionsData, self.params.interactions) || [];
      var bookmarks = parseData(self.params.bookmarksData, self.params.bookmarks) || [];
      var videoUrl = self.params.videoUrl || '';
      var answered = {};
      var score = 0;
      var maxTime = 30;
      bookmarks.forEach(function (b) { maxTime = Math.max(maxTime, Number(b.time) || 0); });
      interactions.forEach(function (q) { maxTime = Math.max(maxTime, Number(q.time) || 0); });

      var root = document.createElement('div');
      root.className = 'h5p-sopavideo';
      var desc = document.createElement('p');
      desc.className = 'h5p-sopavideo-desc';
      desc.textContent = self.params.taskDescription || '';
      root.appendChild(desc);

      var player = document.createElement('div');
      player.className = 'h5p-sopavideo-player';
      var screen = document.createElement('div');
      screen.className = 'h5p-sopavideo-screen';
      var video = document.createElement('video');
      video.controls = true;
      video.preload = 'metadata';
      if (videoUrl) { video.src = videoUrl; }
      screen.appendChild(video);
      if (!videoUrl) {
        var placeholder = document.createElement('div');
        placeholder.className = 'h5p-sopavideo-placeholder';
        placeholder.textContent = 'Sin vídeo configurado';
        screen.appendChild(placeholder);
      }
      player.appendChild(screen);

      var timeline = document.createElement('div');
      timeline.className = 'h5p-sopavideo-timeline';
      var track = document.createElement('div');
      track.className = 'h5p-sopavideo-track';
      var fill = document.createElement('div');
      fill.className = 'h5p-sopavideo-fill';
      track.appendChild(fill);
      var marks = [];
      bookmarks.forEach(function (b) {
        var mark = document.createElement('button');
        mark.type = 'button';
        mark.className = 'h5p-sopavideo-mark bookmark';
        mark.title = b.label || '';
        mark.setAttribute('aria-label', b.label || 'Marcador');
        mark.style.left = (Math.min(100, ((Number(b.time) || 0) / maxTime) * 100)) + '%';
        mark.onclick = function () { video.currentTime = Number(b.time) || 0; };
        track.appendChild(mark);
      });
      interactions.forEach(function (q, index) {
        var mark = document.createElement('button');
        mark.type = 'button';
        mark.className = 'h5p-sopavideo-mark';
        mark.title = q.question || '';
        mark.setAttribute('aria-label', 'Pregunta: ' + (q.question || ''));
        mark.style.left = (Math.min(100, ((Number(q.time) || 0) / maxTime) * 100)) + '%';
        mark.onclick = function () { video.currentTime = Number(q.time) || 0; showQuestion(index); };
        track.appendChild(mark);
      });
      timeline.appendChild(track);
      var times = document.createElement('div');
      times.className = 'h5p-sopavideo-times';
      var startSpan = document.createElement('span');
      startSpan.textContent = '00:00';
      var endSpan = document.createElement('span');
      endSpan.textContent = fmt(maxTime);
      times.appendChild(startSpan);
      times.appendChild(endSpan);
      timeline.appendChild(times);
      player.appendChild(timeline);

      var questionLayer = document.createElement('div');
      questionLayer.className = 'h5p-sopavideo-question';
      questionLayer.style.display = 'none';
      player.appendChild(questionLayer);
      root.appendChild(player);

      var list = document.createElement('ol');
      list.className = 'h5p-sopavideo-list';
      interactions.forEach(function (q, index) {
        var li = document.createElement('li');
        li.textContent = (q.question || 'Pregunta ' + (index + 1));
        var time = document.createElement('span');
        time.className = 'h5p-sopavideo-time';
        time.textContent = fmt(q.time) + ' ';
        li.insertBefore(time, li.firstChild);
        list.appendChild(li);
      });
      root.appendChild(list);
      var scoreEl = document.createElement('div');
      scoreEl.className = 'h5p-sopavideo-score';
      scoreEl.textContent = 'Puntuación: 0 / ' + interactions.length;
      root.appendChild(scoreEl);
      container.appendChild(root);

      function showQuestion(index) {
        var q = interactions[index];
        if (!q || answered[index]) { return; }
        questionLayer.innerHTML = '';
        var card = document.createElement('div');
        card.className = 'h5p-sopavideo-question-card';
        var heading = document.createElement('h4');
        heading.textContent = q.question || ('Pregunta ' + (index + 1));
        card.appendChild(heading);
        var options = document.createElement('div');
        options.className = 'h5p-sopavideo-options';
        var feedback = document.createElement('div');
        feedback.className = 'h5p-sopavideo-feedback';
        var continueBtn = document.createElement('button');
        continueBtn.type = 'button';
        continueBtn.className = 'h5p-sopavideo-continue';
        continueBtn.textContent = 'Continuar';
        continueBtn.style.display = 'none';
        continueBtn.onclick = function () {
          questionLayer.style.display = 'none';
          if (video.paused) { video.play(); }
        };
        (q.options || []).forEach(function (option, optionIndex) {
          var button = document.createElement('button');
          button.type = 'button';
          button.textContent = option;
          button.onclick = function () {
            answered[index] = true;
            var ok = optionIndex === Number(q.correct || 0);
            if (ok) { score++; }
            button.className = ok ? 'correct' : 'wrong';
            Array.prototype.forEach.call(options.children, function (child) { child.disabled = true; });
            feedback.textContent = ok ? '¡Correcto!' : ('La respuesta correcta era: ' + ((q.options || [])[Number(q.correct || 0)] || ''));
            continueBtn.style.display = 'inline-block';
            if (list.children[index]) { list.children[index].className = 'done'; }
            scoreEl.textContent = 'Puntuación: ' + score + ' / ' + interactions.length;
          };
          options.appendChild(button);
        });
        card.appendChild(options);
        card.appendChild(feedback);
        card.appendChild(continueBtn);
        questionLayer.appendChild(card);
        questionLayer.style.display = 'flex';
        video.pause();
      }

      video.addEventListener('loadedmetadata', function () {
        if (!video.duration) { return; }
        endSpan.textContent = fmt(video.duration);
        Array.prototype.forEach.call(track.querySelectorAll('.h5p-sopavideo-mark'), function (mark, index) {
          var source = index < bookmarks.length ? bookmarks[index] : interactions[index - bookmarks.length];
          if (source) { mark.style.left = (Math.min(100, ((Number(source.time) || 0) / video.duration) * 100)) + '%'; }
        });
      });
      video.addEventListener('timeupdate', function () {
        if (video.duration) { fill.style.width = ((video.currentTime / video.duration) * 100) + '%'; }
        interactions.forEach(function (q, index) {
          var at = Number(q.time) || 0;
          if (!answered[index] && video.currentTime >= at && video.currentTime < at + 2) { showQuestion(index); }
        });
      });
      video.addEventListener('ended', function () {
        scoreEl.textContent = 'Actividad completada · Puntuación: ' + score + ' / ' + interactions.length;
      });
    };
  };
})();`;
}

function exportInteractiveVideoH5P(): void {
  if (!videoState.url.trim()) { showToast('Pega primero una URL de vídeo (MP4 o WebM).', 'error'); return; }
  const machineName = 'H5P.SopaCreaVideo';
  const majorVersion = 1;
  const minorVersion = 0;
  const interactions = videoState.interactions
    .filter((item) => item.question.trim() && item.options.length >= 2)
    .map((item) => ({ time: item.time, question: item.question.trim(), options: item.options, correct: item.correct }));
  const bookmarks = videoState.bookmarks
    .filter((item) => item.label.trim())
    .map((item) => ({ time: item.time, label: item.label.trim() }));
  const libraryPath = `${machineName}-${majorVersion}.${minorVersion}`;
  const libraryJson = {
    title: 'Vídeo interactivo SopaCrea',
    description: 'Vídeo con preguntas temporizadas y marcadores para Moodle y Aules',
    machineName,
    majorVersion,
    minorVersion,
    patchVersion: 0,
    author: 'SopaCrea',
    license: 'cc-by',
    runnable: 1,
    preloadedJs: [{ path: 'interactive-video.js' }],
    preloadedCss: [{ path: 'interactive-video.css' }],
    semantics: 'semantics.json',
    coreApi: { majorVersion: 1, minorVersion: 24 },
  };
  const semantics = [
    { name: 'taskDescription', type: 'text', label: 'Instrucciones', optional: true },
    { name: 'videoUrl', type: 'text', label: 'URL del vídeo' },
    { name: 'interactionsData', type: 'text', label: 'Preguntas', optional: true },
    { name: 'bookmarksData', type: 'text', label: 'Marcadores', optional: true },
  ];
  const content = {
    title: state.title,
    taskDescription: state.instructions,
    videoUrl: videoState.url.trim(),
    interactionsData: JSON.stringify(interactions),
    bookmarksData: JSON.stringify(bookmarks),
  };
  const h5p = { title: state.title, language: 'es', mainLibrary: machineName, embedTypes: ['div'], preloadedDependencies: [{ machineName, majorVersion, minorVersion }] };
  const css = `.h5p-sopavideo{font-family:Arial,sans-serif;color:#1c3530}.h5p-sopavideo-desc{margin:0 0 12px;font-size:13px}.h5p-sopavideo-player{position:relative;max-width:720px}.h5p-sopavideo-screen{position:relative;background:#102b27;aspect-ratio:16/9;display:grid;place-items:center;overflow:hidden;border-radius:6px}.h5p-sopavideo-screen video{width:100%;height:100%;object-fit:contain}.h5p-sopavideo-placeholder{color:#c9e2d6;font-size:14px}.h5p-sopavideo-timeline{margin-top:10px}.h5p-sopavideo-track{position:relative;height:6px;background:#d8e5dd;border-radius:3px}.h5p-sopavideo-fill{position:absolute;top:0;bottom:0;left:0;width:0;background:#4f9678;border-radius:3px}.h5p-sopavideo-mark{position:absolute;top:50%;width:10px;height:10px;padding:0;border:0;border-radius:50%;transform:translate(-50%,-50%);background:#4f9678;cursor:pointer}.h5p-sopavideo-mark.bookmark{background:#e08b62}.h5p-sopavideo-times{display:flex;justify-content:space-between;font-size:11px;color:#5a6f66;margin-top:4px}.h5p-sopavideo-question{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(10,32,28,.78)}.h5p-sopavideo-question-card{background:#fff;border-radius:8px;padding:20px;max-width:420px;width:90%;box-shadow:0 12px 30px rgba(0,0,0,.3)}.h5p-sopavideo-question-card h4{margin:0 0 12px;font-size:16px}.h5p-sopavideo-options{display:grid;gap:7px}.h5p-sopavideo-options button{border:1px solid #c6ddcf;background:#f4faf5;border-radius:5px;padding:9px;text-align:left;cursor:pointer}.h5p-sopavideo-options button.correct{background:#c8e4d2;border-color:#4f9678}.h5p-sopavideo-options button.wrong{background:#f6d7cd;border-color:#d88a70}.h5p-sopavideo-options button:disabled{cursor:default;opacity:.85}.h5p-sopavideo-feedback{margin:10px 0;font-size:13px;color:#315a49}.h5p-sopavideo-continue{border:0;background:#4f9678;color:#fff;border-radius:5px;padding:8px 14px;cursor:pointer}.h5p-sopavideo-list{margin:14px 0 0;padding-left:20px;font-size:12px;line-height:1.7}.h5p-sopavideo-list li.done{color:#4f9678;text-decoration:line-through}.h5p-sopavideo-time{display:inline-block;min-width:38px;font-family:monospace;color:#6d8b7c}.h5p-sopavideo-score{margin-top:10px;font-weight:600;color:#315a49}`;
  const blob = createZip([
    { name: 'h5p.json', data: JSON.stringify(h5p, null, 2) },
    { name: 'content/content.json', data: JSON.stringify(content, null, 2) },
    { name: `${libraryPath}/library.json`, data: JSON.stringify(libraryJson, null, 2) },
    { name: `${libraryPath}/semantics.json`, data: JSON.stringify(semantics, null, 2) },
    { name: `${libraryPath}/interactive-video.js`, data: buildVideoLibraryScript(machineName) },
    { name: `${libraryPath}/interactive-video.css`, data: css },
    { name: `${libraryPath}/language/es.json`, data: JSON.stringify({ libraryStrings: { correct: 'Correcto', wrong: 'Incorrecto', continue: 'Continuar' } }, null, 2) },
  ]);
  downloadBlob(blob, `${normalize(state.title).toLowerCase().replaceAll(' ', '-') || 'actividad'}-video.h5p`);
  showToast('Paquete H5P de vídeo descargado. Listo para importar.');
}

function exportOfficialWordSearchH5P(): void {
  const words = [...new Set(state.entries.map((entry) => normalize(entry.word)).filter(Boolean))];
  if (words.length < 2) {
    showToast('Añade al menos dos palabras para crear la sopa de letras.', 'error');
    return;
  }
  // Aules no permite instalar librerías nuevas. Exportamos solo el contenido y
  // reutilizamos la librería oficial H5P.FindTheWords que ya está instalada allí.
  const content = {
    title: state.title,
    taskDescription: state.instructions || 'Encuentra las palabras escondidas en la sopa de letras.',
    wordList: words.join(','),
    behaviour: {
      orientations: {
        horizontal: true,
        horizontalBack: true,
        vertical: true,
        verticalUp: true,
        diagonal: true,
        diagonalBack: true,
        diagonalUp: true,
        diagonalUpBack: true,
      },
      fillPool: 'abcdefghijklmnopqrstuvwxyz',
      preferOverlap: true,
      showVocabulary: true,
      enableShowSolution: true,
      enableRetry: true,
    },
    l10n: {
      check: 'Comprobar',
      tryAgain: 'Reintentar',
      showSolution: 'Mostrar solución',
      found: '@found de @totalWords encontradas',
      timeSpent: 'Tiempo',
      score: 'Has encontrado @score de @total palabras',
      wordListHeader: 'Encuentra las palabras',
    },
  };
  const h5p = {
    title: state.title,
    language: 'es',
    mainLibrary: 'H5P.FindTheWords',
    embedTypes: ['iframe'],
    preloadedDependencies: [{ machineName: 'H5P.FindTheWords', majorVersion: 1, minorVersion: 4 }],
  };
  const blob = createZip([
    { name: 'h5p.json', data: JSON.stringify(h5p, null, 2) },
    { name: 'content/content.json', data: JSON.stringify(content, null, 2) },
  ]);
  const slug = normalize(state.title).toLowerCase().replaceAll(' ', '-') || 'actividad';
  downloadBlob(blob, `${slug}-sopa-aules.h5p`);
  showToast('Paquete H5P para Aules descargado. Usa la librería oficial H5P.FindTheWords, sin instalar nada.');
}

function exportOfficialCrosswordH5P(): void {
  const words = state.entries
    .map((entry) => ({ clue: entry.clue.trim() || 'Sin pista', answer: normalize(entry.word) }))
    .filter((item) => item.answer.length >= 2);
  if (words.length < 2) {
    showToast('Añade al menos dos palabras con pista para crear el crucigrama.', 'error');
    return;
  }
  // Igual que la sopa: Aules no permite instalar librerías nuevas. Enviamos solo
  // el contenido y la plataforma usa su propia librería oficial H5P.Crossword.
  const content = {
    title: state.title,
    taskDescription: state.instructions || 'Resuelve el crucigrama con las pistas.',
    words,
    overallFeedback: [
      { from: 0, to: 49, feedback: 'Sigue intentándolo. Revisa las pistas y las letras que ya has escrito.' },
      { from: 50, to: 99, feedback: '¡Casi lo tienes! Corrige las palabras que estén incompletas.' },
      { from: 100, to: 100, feedback: '¡Perfecto! Has resuelto el crucigrama completo.' },
    ],
    behaviour: {
      enableInstantFeedback: false,
      scoreWords: true,
      applyPenalties: false,
      enableRetry: true,
      enableSolutionsButton: true,
      keepCorrectAnswers: false,
    },
    l10n: {
      title: 'Crucigrama',
      across: 'Horizontal',
      down: 'Vertical',
      checkAnswer: 'Comprobar',
      submitAnswer: 'Enviar',
      tryAgain: 'Reintentar',
      showSolution: 'Mostrar solución',
      couldNotGenerateCrossword: 'No se pudo generar el crucigrama con estas palabras. Prueba con menos palabras o con palabras que compartan más letras.',
      couldNotGenerateCrosswordTooFewWords: 'No se pudo generar el crucigrama. Necesitas al menos dos palabras.',
      probematicWords: 'Algunas palabras no se pudieron colocar: @words',
      problematicWords: 'Algunas palabras no se pudieron colocar: @words',
      extraClue: 'Pista extra',
      closeWindow: 'Cerrar',
    },
    a11y: {
      crosswordGrid: 'Cuadrícula de crucigrama. Usa las flechas para moverte y el teclado para escribir. También puedes usar Tab para escribir las respuestas en los campos de texto.',
      column: 'Columna',
      row: 'Fila',
      across: 'Horizontal',
      down: 'Vertical',
      empty: 'Vacío',
      listLabel: 'Respuestas del crucigrama',
      resultFor: 'Resultado para: @clue',
      correct: 'Correcto',
      wrong: 'Incorrecto',
      point: 'punto',
      solutionFor: 'Para @clue la solución es: @solution',
      extraClueFor: 'Abrir pista extra para @clue',
      letterSevenOfNine: 'Letra @position de @length',
      lettersWord: 'palabra de @length letras',
      check: 'Comprueba las letras. Las respuestas se marcarán como correctas, incorrectas o sin contestar.',
      showSolution: 'Muestra la solución y rellena el crucigrama con las respuestas correctas.',
      retry: 'Vuelve a intentar la tarea. Borra tus respuestas y empieza de nuevo.',
      yourResult: 'Has conseguido @score de un total de @total puntos.',
    },
  };
  const h5p = {
    title: state.title,
    language: 'es',
    mainLibrary: 'H5P.Crossword',
    embedTypes: ['iframe'],
    preloadedDependencies: [{ machineName: 'H5P.Crossword', majorVersion: 0, minorVersion: 5 }],
  };
  const blob = createZip([
    { name: 'h5p.json', data: JSON.stringify(h5p, null, 2) },
    { name: 'content/content.json', data: JSON.stringify(content, null, 2) },
  ]);
  const slug = normalize(state.title).toLowerCase().replaceAll(' ', '-') || 'actividad';
  downloadBlob(blob, `${slug}-crucigrama-aules.h5p`);
  showToast('Paquete de crucigrama para Aules descargado. Usa la librería oficial H5P.Crossword, sin instalar nada.');
}

function exportH5P(): void {
  if (!isNativeEditor()) { showToast('Este tipo H5P está seleccionado como plantilla. Abre su demo para construirlo.', 'error'); return; }
  if (selectedH5PId === 'interactive-video') { exportInteractiveVideoH5P(); return; }
  if (!showValidation()) return;
  if (state.mode === 'wordsearch') { exportOfficialWordSearchH5P(); return; }
  exportOfficialCrosswordH5P();
}

function printActivity(): void {
  document.body.classList.add('is-printing');
  window.setTimeout(() => window.print(), 80);
  window.setTimeout(() => document.body.classList.remove('is-printing'), 1000);
}

function downloadSelectedActivity(): void {
  if (isNativeEditor()) { exportH5P(); return; }
  const selected = h5pCatalog.find((item) => item.id === selectedH5PId) || h5pCatalog[0];
  const payload = { type: selected.name, typeId: selected.id, title: state.title, content: genericContent, fields: selected.fields, demo: selected.demo };
  const filename = `${normalize(state.title || selected.name).toLowerCase().replaceAll(' ', '-') || 'actividad'}-${selected.id}.json`;
  downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), filename);
  showToast('Borrador descargado.');
}

function animateSelected(): void {
  const section = document.querySelector<HTMLElement>('.catalog-section');
  section?.classList.remove('is-animating');
  window.requestAnimationFrame(() => section?.classList.add('is-animating'));
  window.setTimeout(() => section?.classList.remove('is-animating'), 650);
}

function finishSelection(row: number, col: number): void {
  if (!state.selectedStart) return;
  state.selectedCells = lineBetween(state.selectedStart, { row, col });
  const selectedWord = state.selectedCells.map((point) => state.grid[point.row]?.[point.col] || '').join('');
  const reverse = selectedWord.split('').reverse().join('');
  const match = state.placements.find((placement) => placement.word === selectedWord || placement.word === reverse);
  if (match) {
    state.found.add(match.word);
    showToast(`¡Encontraste «${match.word}»!`);
  } else {
    showToast('Casi. Prueba con otra combinación.', 'error');
    state.selectedCells = [];
  }
  state.selectedStart = null;
  state.pointerSelecting = false;
  state.pointerPos = null;
  renderPreview();
}

function handleCellClick(row: number, col: number): void {
  if (state.mode === 'crossword') return;
  if (state.suppressNextCellClick) { state.suppressNextCellClick = false; return; }
  if (!state.selectedStart) {
    state.selectedStart = { row, col };
    state.selectedCells = [{ row, col }];
    state.pointerPos = { row: row + 0.5, col: col + 0.5 };
    renderPreview();
    showToast('Ahora haz clic en la última letra.');
    return;
  }
  finishSelection(row, col);
}

function handleAction(action: string, element: HTMLElement): void {
  if (action === 'scroll-preview') $('[data-preview]').scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (action === 'add-entry') {
    state.entries.push({ id: state.nextId++, word: '', clue: '' });
    renderEntries();
    const last = document.querySelector<HTMLInputElement>('.entry-card:last-child .entry-word');
    last?.focus();
  }
  if (action === 'remove-entry') {
    if (state.entries.length <= 2) { showToast('Mantén al menos dos palabras.', 'error'); return; }
    const id = Number(element.dataset.entryId);
    state.entries = state.entries.filter((entry) => entry.id !== id);
    renderEntries();
    autoGenerateNow();
  }
  if (action === 'add-video-interaction') {
    videoState.interactions.push({ id: videoState.nextId++, time: Math.max(0, ...videoState.interactions.map((item) => item.time)) + 5, question: 'Nueva pregunta', options: ['Opción 1', 'Opción 2', 'Opción 3'], correct: 0 });
    syncCatalogMode();
    renderPreview();
  }
  if (action === 'remove-video-interaction') {
    videoState.interactions = videoState.interactions.filter((item) => item.id !== Number(element.dataset.videoId));
    syncCatalogMode();
    renderPreview();
  }
  if (action === 'add-video-bookmark') {
    videoState.bookmarks.push({ id: videoState.nextId++, time: Math.max(0, ...videoState.bookmarks.map((item) => item.time)) + 5, label: 'Nuevo marcador' });
    syncCatalogMode();
    renderPreview();
  }
  if (action === 'remove-video-bookmark') {
    videoState.bookmarks = videoState.bookmarks.filter((item) => item.id !== Number(element.dataset.videoId));
    syncCatalogMode();
    renderPreview();
  }
  if (action === 'generate-video') {
    syncCatalogMode();
    renderPreview();
    showToast('Vista previa del vídeo actualizada.');
  }
  if (action === 'update-generic') { renderPreview(); showToast('Vista previa actualizada.'); }
  if (action === 'download-selected') downloadSelectedActivity();
  if (action === 'animate-selected') animateSelected();
  if (action === 'export-h5p') exportH5P();
  if (action === 'print') printActivity();
  if (action === 'reveal-crossword') {
    state.crosswordRevealed = !state.crosswordRevealed;
    state.crosswordChecked = false;
    renderPreview();
  }
  if (action === 'check-crossword') checkCrossword();
  if (action === 'reset-crossword') resetCrossword();
}

function gridPointerPoint(event: PointerEvent): { row: number; col: number } | null {
  const board = document.querySelector<HTMLElement>('.grid-board');
  if (!board) return null;
  const rect = board.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const clamp = (value: number) => Math.max(0, Math.min(state.gridSize, value));
  return {
    col: clamp(((event.clientX - rect.left) / rect.width) * state.gridSize),
    row: clamp(((event.clientY - rect.top) / rect.height) * state.gridSize),
  };
}

function updateDragVisuals(): void {
  const line = document.querySelector<SVGLineElement>('.current-line');
  if (line && state.pointerPos) {
    line.setAttribute('x2', String(state.pointerPos.col));
    line.setAttribute('y2', String(state.pointerPos.row));
  }
  const grid = document.querySelector<HTMLElement>('.word-grid');
  if (!grid) return;
  grid.querySelectorAll<HTMLElement>('.preview-cell.is-selected').forEach((cell) => cell.classList.remove('is-selected'));
  state.selectedCells.forEach((point) => {
    grid.querySelector<HTMLElement>(`[data-cell-row="${point.row}"][data-cell-col="${point.col}"]`)?.classList.add('is-selected');
  });
}

function bindEvents(): void {
  document.addEventListener('pointerdown', (event) => {
    const cell = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-cell-row]');
    if (!cell || state.mode === 'crossword') return;
    event.preventDefault();
    state.pointerSelecting = true;
    state.selectedStart = { row: Number(cell.dataset.cellRow), col: Number(cell.dataset.cellCol) };
    state.selectedCells = [state.selectedStart];
    state.pointerPos = gridPointerPoint(event) || { row: state.selectedStart.row + 0.5, col: state.selectedStart.col + 0.5 };
    renderPreview();
  });

  document.addEventListener('pointermove', (event) => {
    if (!state.pointerSelecting || !state.selectedStart) return;
    const point = gridPointerPoint(event);
    if (!point) return;
    state.pointerPos = point;
    const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLButtonElement>('[data-cell-row]');
    if (cell) {
      state.selectedCells = lineBetween(state.selectedStart, { row: Number(cell.dataset.cellRow), col: Number(cell.dataset.cellCol) });
    }
    updateDragVisuals();
  });

  document.addEventListener('pointerup', (event) => {
    if (!state.pointerSelecting || !state.selectedStart) return;
    const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLButtonElement>('[data-cell-row]');
    if (!cell) {
      state.pointerSelecting = false;
      state.selectedStart = null;
      state.selectedCells = [];
      state.pointerPos = null;
      renderPreview();
      return;
    }
    const row = Number(cell.dataset.cellRow);
    const col = Number(cell.dataset.cellCol);
    state.pointerPos = { row: row + 0.5, col: col + 0.5 };
    state.suppressNextCellClick = true;
    finishSelection(row, col);
  });

  document.addEventListener('pointercancel', () => {
    if (!state.pointerSelecting) return;
    state.pointerSelecting = false;
    state.selectedStart = null;
    state.selectedCells = [];
    state.pointerPos = null;
    renderPreview();
  });

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const actionElement = target.closest<HTMLElement>('[data-action]');
    if (actionElement?.dataset.action) handleAction(actionElement.dataset.action, actionElement);
    const modeButton = target.closest<HTMLButtonElement>('[data-mode]');
    if (modeButton?.dataset.mode) {
      state.mode = modeButton.dataset.mode as Mode;
      selectedH5PId = state.mode === 'wordsearch' ? 'find-the-words' : 'crossword';
      document.querySelectorAll('[data-mode]').forEach((button) => button.classList.toggle('is-active', button === modeButton));
      renderCatalog();
      syncCatalogMode();
      renderEntries();
      generateActivity(false);
    }
    const catalogCard = target.closest<HTMLButtonElement>('[data-h5p-id]');
    if (catalogCard?.dataset.h5pId && !catalogCard.disabled) {
      selectedH5PId = catalogCard.dataset.h5pId;
      genericContent = '';
      if (selectedH5PId === 'crossword') state.mode = 'crossword';
      if (selectedH5PId === 'find-the-words') state.mode = 'wordsearch';
      renderCatalog();
      syncCatalogMode();
      renderPreview();
      document.querySelector('.catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const difficultyButton = target.closest<HTMLButtonElement>('[data-difficulty]');
    if (difficultyButton?.dataset.difficulty) {
      state.difficulty = difficultyButton.dataset.difficulty as Difficulty;
      updateDifficultyButtons();
      generateActivity(false);
    }
    const crossClue = target.closest<HTMLElement>('[data-crossword-id]');
    if (crossClue && state.mode === 'crossword') {
      const placement = state.placements.find((item) => item.id === Number(crossClue.dataset.crosswordId));
      if (placement) selectCrosswordCell(placement.row, placement.col, placement.dc !== 0 ? 'across' : 'down');
      return;
    }
    const cell = target.closest<HTMLButtonElement>('[data-cell-row]');
    if (cell) handleCellClick(Number(cell.dataset.cellRow), Number(cell.dataset.cellCol));
    const crossCell = target.closest<HTMLButtonElement>('[data-cross-row]');
    if (crossCell) selectCrosswordCell(Number(crossCell.dataset.crossRow), Number(crossCell.dataset.crossCol));
  });

  document.addEventListener('keydown', (event) => {
    if (state.mode !== 'crossword' || !isNativeEditor()) return;
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable)) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key;
    if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
      if (!state.crosswordSelected) return;
      const nextDirection = key === 'ArrowLeft' || key === 'ArrowRight' ? 'across' : 'down';
      if (state.crosswordDirection !== nextDirection) {
        state.crosswordDirection = nextDirection;
        state.crosswordChecked = false;
        renderPreview();
      } else {
        moveCrosswordSelection(key === 'ArrowLeft' || key === 'ArrowUp' ? -1 : 1);
        state.crosswordChecked = false;
        renderPreview();
      }
      event.preventDefault();
      return;
    }
    if (key === 'Backspace' || key === 'Delete') {
      eraseCrosswordLetter();
      event.preventDefault();
      return;
    }
    if (key === 'Enter') {
      state.crosswordDirection = state.crosswordDirection === 'across' ? 'down' : 'across';
      state.crosswordChecked = false;
      renderPreview();
      event.preventDefault();
      return;
    }
    if (key === 'Escape') {
      state.crosswordSelected = null;
      renderPreview();
      return;
    }
    if (key.length === 1 && /[a-zñáéíóúü]/i.test(key)) {
      typeCrosswordLetter(normalize(key));
      event.preventDefault();
    }
  });

  document.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    if (target.id === 'activity-title') { state.title = target.value; renderPreview(); }
    if (target.id === 'activity-instructions') { state.instructions = target.value; renderPreview(); }
    if (target.matches('[data-generic-title]')) { state.title = target.value; renderPreview(); }
    if (target.matches('[data-generic-content]')) { genericContent = target.value; renderPreview(); }
    if (target.matches('[data-video-title]')) { state.title = target.value; renderPreview(); }
    if (target.matches('[data-video-instructions]')) { state.instructions = target.value; renderPreview(); }
    if (target.matches('[data-video-url]')) { videoState.url = target.value; renderPreview(); }
    if (target.matches('[data-video-field]')) {
      const item = videoState.interactions.find((entry) => entry.id === Number(target.dataset.videoId));
      if (item) {
        const field = target.dataset.videoField;
        if (field === 'time') item.time = Math.max(0, Number(target.value) || 0);
        if (field === 'question') item.question = target.value;
        if (field === 'correct') item.correct = Math.max(0, Number(target.value) || 0);
        if (field === 'options') {
          item.options = target.value.split('|').map((option) => option.trim()).filter(Boolean);
          if (item.correct >= item.options.length) item.correct = 0;
        }
        renderPreview();
      }
    }
    if (target.matches('[data-bookmark-field]')) {
      const mark = videoState.bookmarks.find((entry) => entry.id === Number(target.dataset.videoId));
      if (mark) {
        if (target.dataset.bookmarkField === 'time') mark.time = Math.max(0, Number(target.value) || 0);
        if (target.dataset.bookmarkField === 'label') mark.label = target.value;
        renderPreview();
      }
    }
    if (target.dataset.entryId && target.dataset.field) {
      const entry = state.entries.find((item) => item.id === Number(target.dataset.entryId));
      if (entry) {
        entry[target.dataset.field as 'word' | 'clue'] = target.value;
        if (target.dataset.field === 'word') scheduleAutoGenerate();
        else renderPreview();
      }
    }
    if (target.matches('[data-catalog-search]')) { catalogQuery = target.value; renderCatalog(); }
  });

  document.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;
    if (target.matches('[data-catalog-group]')) { catalogGroup = target.value as H5PGroup | 'all'; renderCatalog(); }
  });

  $('#grid-size').addEventListener('change', (event) => {
    state.gridSize = Number((event.target as HTMLSelectElement).value);
    generateActivity(false);
  });
}

seedMarkup();
renderCatalog();
syncCatalogMode();
renderEntries();
generateWordSearch();
renderPreview();
updateDifficultyButtons();
bindEvents();
