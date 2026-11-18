(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const $=[["interactive-video","Vídeo interactivo","multimedia","https://h5p.org/interactive-video","Vídeo enriquecido con preguntas y marcadores.","Vídeo fuente · interacciones temporizadas · resumen final"],["course-presentation","Presentación de curso","presentation","https://h5p.org/presentation","Diapositivas con texto, imágenes y actividades.","Diapositivas · elementos · navegación · fondos"],["branching-scenario","Escenario ramificado","presentation","https://h5p.org/branching-scenario","Dilemas y experiencias con decisiones.","Nodos · elecciones · destinos · pantallas finales"],["accordion","Acordeón","other","https://h5p.org/accordion","Paneles verticales que se expanden y contraen.","Paneles · títulos · contenido enriquecido"],["advent-calendar-beta","Calendario de Adviento","other","https://h5p.org/content-types/advent-calendar","24 puertas con texto, imagen, audio o vídeo.","Puertas · imagen · contenido · fecha"],["agamotto","Agamotto","multimedia","https://h5p.org/content-types/agamotto","Secuencia de imágenes con deslizador.","Imágenes · descripciones · etiquetas · deslizador"],["ar-scavenger","Búsqueda AR","game","https://h5p.org/content-types/ar-scavenger","Búsqueda con cámara, marcadores y modelos 3D.","Marcadores · patrones · contenido H5P · modelos 3D"],["arithmetic-quiz","Quiz de aritmética","quiz","https://h5p.org/arithmetic-quiz","Preguntas matemáticas contrarreloj.","Operación · preguntas · dificultad · fracciones"],["audio-recorder","Grabadora de audio","multimedia","https://h5p.org/audio-recorder","Actividad para grabar y descargar voz.","Título · instrucciones · textos de interfaz"],["chart","Gráfico","multimedia","https://h5p.org/chart","Gráficos de barras o circulares.","Tipo · etiquetas · valores · colores"],["collage","Collage","multimedia","https://h5p.org/collage","Composición con varias imágenes.","Plantilla · imágenes · marco · espaciado"],["cornell-notes","Notas Cornell","writing","https://h5p.org/cornell-notes","Vídeo o recurso con panel de notas Cornell.","Recurso · instrucciones · pistas · notas · resumen"],["crossword","Crucigrama","game","https://h5p.org/content-types/crossword","Crucigrama con palabras y pistas.","Palabras · pistas · colores · puntuación"],["dialog-cards","Tarjetas de diálogo","quiz","https://h5p.org/dialog-cards","Tarjetas que se giran para mostrar respuestas.","Tarjetas · respuestas · imágenes · audio · consejos"],["dictation","Dictado","quiz","https://h5p.org/dictation","Dictado con audio y corrección.","Audio · transcripción · intentos · feedback"],["documentation-tool","Herramienta de documentación","writing","https://h5p.org/documentation-tool","Asistente para documentar un proyecto y exportarlo.","Páginas · objetivos · plan · evaluación · exportación"],["drag-and-drop","Arrastrar y soltar","quiz","https://h5p.org/drag-and-drop","Elementos arrastrables y zonas de destino.","Arrastrables · zonas · relaciones · puntuación"],["drag-the-words","Arrastra las palabras","quiz","https://h5p.org/drag-the-words","Texto con huecos y palabras arrastrables.","Texto · palabras · distractores · pistas"],["essay","Redacción","writing","https://h5p.org/content-types/essay","Texto libre con feedback por palabras clave.","Instrucción · límites · palabras clave · solución"],["fill-in-the-blanks","Completar espacios","quiz","https://h5p.org/fill-in-the-blanks","Texto con palabras ausentes.","Texto · respuestas · alternativas · feedback"],["find-multiple-hotspots","Encontrar hotspots","quiz","https://h5p.org/find-multiple-hotspots","Encontrar varios puntos correctos en una imagen.","Imagen · hotspots · correctos · feedback"],["find-the-hotspot","Encontrar el hotspot","quiz","https://h5p.org/image-hotspot-question","Encontrar un punto correcto en una imagen.","Imagen · hotspot · pregunta · respuesta"],["find-the-words","Sopa de letras","game","https://h5p.org/find-the-words","Palabras ocultas en una cuadrícula.","Palabras · orientaciones · cuadrícula · soluciones"],["flashcards","Tarjetas didácticas","quiz","https://h5p.org/flashcards","Tarjetas con imagen, pregunta y respuesta.","Tarjetas · imágenes · respuestas · feedback"],["game-map","Mapa de juego","game","https://h5p.org/content-types/game-map","Mapa con etapas y contenidos desbloqueables.","Mapa · etapas · caminos · restricciones · puntuación"],["guess-the-answer","Adivina la respuesta","quiz","https://h5p.org/guess-the-answer","Imagen con botón para revelar la respuesta.","Imagen · pregunta · respuesta · botón"],["iframe-embedder","Insertar iframe","multimedia","https://h5p.org/iframe-embedder","Inserta contenido HTML o una URL.","URL o HTML · ancho · alto · redimensionado"],["image-hotspots","Hotspots de imagen","multimedia","https://h5p.org/image-hotspots","Imagen con varios puntos informativos.","Imagen · hotspots · popups · texto · vídeo"],["image-juxtaposition","Comparar imágenes","multimedia","https://h5p.org/image-juxtaposition","Comparación de dos imágenes con deslizador.","Imagen antes · imagen después · posición · orientación"],["image-pairing","Emparejar imágenes","game","https://h5p.org/image-pairing","Relacionar imágenes mediante arrastre.","Pares · imágenes · instrucciones · reintento"],["image-sequencing","Ordenar imágenes","quiz","https://h5p.org/content-types/image-sequencing","Ordenar imágenes correctamente.","Imágenes · descripciones · solución · reintento"],["image-slider","Carrusel de imágenes","multimedia","https://h5p.org/image-slider","Galería de imágenes navegable.","Título · imágenes · texto alternativo · pantalla completa"],["impressive-presentation-alpha","Presentación 3D","presentation","https://h5p.org/impressive-presentation","Presentación con zoom, rotación y paralaje.","Escenas · posiciones · rotaciones · fondos"],["information-wall","Muro de información","other","https://h5p.org/content-types/information-wall","Paneles informativos filtrables.","Encabezado · paneles · propiedades · filtro"],["interactive-book","Libro interactivo","presentation","https://h5p.org/content-types/interactive-book","Libro con capítulos y actividades H5P.","Portada · capítulos · índice · navegación"],["kewar-code","Código QR","multimedia","https://h5p.org/content-types/kewar-code","Genera códigos QR de contacto, evento o URL.","Tipo · datos · colores · tamaño"],["mark-the-words","Marcar palabras","writing","https://h5p.org/mark-the-words","Resaltar palabras correctas dentro de un texto.","Texto · palabras correctas · feedback · puntuación"],["memory-game","Juego de memoria","game","https://h5p.org/memory-game","Parejas de imágenes con tiempo y turnos.","Parejas · imágenes · descripciones · tema"],["multimedia-choice","Elección multimedia","quiz","https://h5p.org/content-types/image-choice","Pregunta con opciones visuales y audio.","Pregunta · opciones · imágenes · correctas"],["multiple-choice","Opción múltiple","quiz","https://h5p.org/multichoice","Pregunta flexible con varias respuestas.","Pregunta · respuestas · feedback · puntuación"],["page","Página H5P","other","https://h5p.org/column","Página vertical con varios contenidos H5P.","Elementos · orden · texto · actividades anidadas"],["personality-quiz","Test de personalidad","survey","https://h5p.org/personality-quiz","Cuestionario que calcula un perfil final.","Preguntas · respuestas · personalidades · resultado"],["questionnaire","Cuestionario","survey","https://h5p.org/questionnaire","Encuesta con selección y respuesta abierta.","Preguntas · obligatorias · opciones · pantalla final"],["quiz-question-set","Quiz de preguntas","quiz","https://h5p.org/question-set","Secuencia de preguntas de distintos tipos.","Preguntas · tipos · respuestas · aprobado"],["single-choice-set","Conjunto de opción única","quiz","https://h5p.org/single-choice-set","Serie de preguntas con una respuesta correcta.","Preguntas · opciones · feedback · avance"],["sort-the-paragraphs","Ordenar párrafos","writing","https://h5p.org/content-types/sort-the-paragraphs","Ordenar párrafos con arrastre o teclado.","Consigna · párrafos · penalización · solución"],["speak-the-words","Habla las palabras","quiz","https://h5p.org/speak-the-words","Responder usando reconocimiento de voz.","Pregunta · idioma · respuestas aceptadas · feedback"],["speak-the-words-set","Conjunto de voz","quiz","https://h5p.org/speak-the-words-set","Serie de preguntas respondidas con voz.","Introducción · preguntas · idioma · feedback"],["structure-strip","Banda de estructura","writing","https://h5p.org/content-types/structure-strip","Redactar secciones con pesos orientativos.","Secciones · pistas · pesos · colores · solución"],["summary","Resumen","quiz","https://h5p.org/summary","Elegir afirmaciones para construir un resumen.","Instrucción · afirmaciones · correctas · feedback"],["timeline","Línea temporal","multimedia","https://h5p.org/timeline","Eventos cronológicos con recursos multimedia.","Título · eventos · fechas · texto · medios"],["true-false-question","Verdadero o falso","quiz","https://h5p.org/true-false","Afirmación con dos respuestas.","Afirmación · respuesta correcta · media · feedback"],["virtual-tour-360","Tour virtual 360","multimedia","https://h5p.org/virtual-tour-360","Escenas panorámicas con hotspots.","Escenas · panoramas · hotspots · destinos"],["complex-fill-the-blanks","Completar espacios avanzado","quiz","https://h5p.org/advanced-fill-the-blanks","Huecos con errores típicos y feedback específico.","Texto · huecos · respuestas · errores · feedback"]].map(([t,a,o,s,r,n])=>({id:t,name:a,group:o,demo:s,description:r,fields:n,status:t==="find-the-words"?"ready":"construction"})),X={quiz:"Cuestionarios",presentation:"Presentaciones",game:"Juegos",multimedia:"Multimedia",writing:"Escritura",survey:"Encuestas",other:"Otros"};let k="find-the-words",W="",H="all",I="",V={instructions:"",difficulty:"media",time:0,showScore:!0,randomize:!1,mediaUrl:""};const me=[{id:1,word:"BOSQUE",clue:"Lugar lleno de árboles y vida."},{id:2,word:"SEMILLA",clue:"Parte de la planta que puede germinar."},{id:3,word:"RAÍZ",clue:"Sujeta la planta y absorbe agua."},{id:4,word:"HOJA",clue:"Parte verde que capta la luz."},{id:5,word:"LLUVIA",clue:"Agua que cae de las nubes."},{id:6,word:"ABEJA",clue:"Pequeño insecto que poliniza flores."}],e={mode:"wordsearch",difficulty:"medium",title:"Descubre la naturaleza",instructions:"Encuentra las palabras escondidas en la cuadrícula.",gridSize:12,entries:me.map(t=>({...t})),grid:[],placements:[],found:new Set,selectedStart:null,selectedCells:[],pointerPos:null,pointerSelecting:!1,suppressNextCellClick:!1,crosswordRevealed:!1,crosswordInputs:new Map,crosswordSelected:null,crosswordDirection:"across",crosswordChecked:!1,nextId:7},h={url:"https://www.w3schools.com/html/mov_bbb.mp4",interactions:[{id:1,time:3,question:"¿Qué parte de la planta capta la luz?",options:["La hoja","La raíz","La semilla"],correct:0},{id:2,time:9,question:"¿Qué insecto ayuda a polinizar?",options:["La abeja","La hormiga","La mariposa"],correct:0}],bookmarks:[{id:1,time:0,label:"Inicio"},{id:2,time:6,label:"Las hojas"},{id:3,time:12,label:"Polinización"}],nextId:3},O=t=>{const a=Math.max(0,Math.floor(t||0));return`${String(Math.floor(a/60)).padStart(2,"0")}:${String(a%60).padStart(2,"0")}`},A=t=>{const a=document.querySelector(t);if(!a)throw new Error(`No se encontró ${t}`);return a},S=t=>t.toLocaleUpperCase("es-ES").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-ZÑ]/g,""),p=t=>t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),_={quiz:"☑",presentation:"▤",game:"♞",multimedia:"◉",writing:"✎",survey:"☷",other:"◆"};function R(){const t=document.querySelector("[data-h5p-catalog]");if(!t)return;const a=W.trim().toLocaleLowerCase("es-ES"),o=$.filter(r=>(!a||`${r.name} ${r.description} ${r.fields}`.toLocaleLowerCase("es-ES").includes(a))&&(H==="all"||r.group===H)),s=$.find(r=>r.id===k)||$.find(r=>r.id==="find-the-words");t.innerHTML=`
    <div class="catalog-selected"><div><span class="section-kicker">TIPO SELECCIONADO</span><h3><span class="selected-type-icon">${_[s.group]}</span>${p(s.name)}</h3><p>${p(s.description)}</p><small>${p(s.fields)}</small></div><div class="catalog-selected-actions"><button class="button button-dark" data-action="download-selected"><span class="icon">↓</span> ${D()?"Descargar .h5p para Aules":"Descargar borrador"}</button><button class="button button-ghost" data-action="animate-selected"><span class="icon">✦</span> Animar</button><a class="button button-ghost catalog-demo" href="${s.demo}" target="_blank" rel="noreferrer">Ver demo oficial ↗</a></div></div>
    <div class="catalog-toolbar"><label class="catalog-search"><span>⌕</span><input data-catalog-search type="search" value="${p(W)}" placeholder="Buscar entre 54 tipos H5P..." /></label><select data-catalog-group class="select-input"><option value="all">Todos los tipos</option>${Object.entries(X).map(([r,n])=>`<option value="${r}" ${H===r?"selected":""}>${n}</option>`).join("")}</select></div>
    <div class="catalog-grid">${o.map(r=>`<button class="catalog-card ${r.id===k?"is-selected":""} ${r.status==="construction"?"is-construction":""}" data-h5p-id="${r.id}" ${r.status==="construction"?'disabled aria-disabled="true" title="En construcción"':""}><span class="catalog-card-top"><span class="catalog-type-icon type-${r.group}">${_[r.group]}</span><span>${X[r.group]}</span><span class="catalog-arrow">${r.status==="construction"?"⏳":"↗"}</span></span><strong>${p(r.name)}</strong><small>${p(r.description)}</small><span class="catalog-status ${r.status==="construction"?"is-construction":"is-ready"}">${r.status==="construction"?"EN CONSTRUCCIÓN":"DISPONIBLE"}</span></button>`).join("")}</div>
    <p class="catalog-count">Mostrando ${o.length} de ${$.length} tipos · Solo la sopa de letras está disponible; el resto se irá publicando poco a poco.</p>`}function oe(){return k==="find-the-words"||k==="crossword"}function D(){return oe()||k==="interactive-video"}function E(){const t=document.querySelector(".editor-panel"),a=document.querySelector("[data-catalog-editor]");if(!t||!a)return;const o=$.find(r=>r.id===k)||$[0],s=oe();t.classList.toggle("is-catalog-mode",!s),a.innerHTML=s?"":k==="interactive-video"?fe():`<div class="generic-editor-card"><span class="section-kicker">CREADOR H5P</span><h3>Crear ${p(o.name)}</h3><p>${p(o.description)}</p><label class="field-label">Título de la actividad<input data-generic-title type="text" value="${p(e.title)}" /></label><label class="field-label">Contenido principal<textarea data-generic-content rows="5" placeholder="Escribe aquí el contenido de tu actividad...">${p(I)}</textarea></label><label class="field-label">Instrucciones para el alumnado<textarea data-generic-instructions rows="3" placeholder="Explica qué debe hacer el alumnado...">${p(V.instructions)}</textarea></label><div class="generic-config-grid"><label class="field-label">Dificultad<select data-generic-difficulty><option value="facil" >Fácil</option><option value="media" selected>Media</option><option value="dificil" >Difícil</option></select></label><label class="field-label">Tiempo (minutos)<input data-generic-time type="number" min="0" value="${V.time}" /></label></div><div class="generic-checks"><label><input data-generic-score type="checkbox" checked /> Mostrar puntuación</label><label><input data-generic-random type="checkbox"  /> Orden aleatorio</label></div><label class="field-label">Vídeo, imagen o recurso (URL)<input data-generic-media type="url" value="${p(V.mediaUrl)}" placeholder="https://..." /></label><div class="generic-fields"><strong>Campos principales de este formato</strong><span>${p(o.fields)}</span></div><div class="generic-editor-actions"><button class="button button-dark" data-action="generate-generic"><span class="icon">✦</span> Generar actividad</button><button class="button button-ghost" data-action="download-selected"><span class="icon">↓</span> Descargar borrador</button><a class="button button-ghost" href="${o.demo}" target="_blank" rel="noreferrer">Ver demo oficial</a></div><small>La configuración se guarda en el borrador y se refleja en la vista previa. La exportación específica H5P se implementa por formato.</small></div>`}function ve(){const t=$.find(a=>a.id===k)||$[0];return`<div class="generic-preview"><div class="preview-header"><div class="preview-label"><span class="preview-icon">✦</span> ${p(t.name.toUpperCase())}</div><span class="preview-number">VISTA PREVIA</span></div><div class="generic-preview-body"><span class="section-kicker">ACTIVIDAD CREADA</span><h3>${p(e.title||t.name)}</h3><p>${p(t.description)}</p><div class="generic-content-preview">${p(I||"Escribe contenido en el editor para verlo aquí.")}</div><div class="generic-fields"><strong>Configuración</strong><span>Dificultad: ${p(V.difficulty)} · Tiempo: sin límite · con puntuación · orden fijo</span></div></div></div>`}function fe(){const t=h.interactions.map((o,s)=>`
    <div class="video-item" data-video-interaction="${o.id}">
      <div class="video-item-head"><strong>Pregunta ${s+1}</strong><button class="remove-entry" data-action="remove-video-interaction" data-video-id="${o.id}" aria-label="Eliminar pregunta ${s+1}">×</button></div>
      <div class="video-item-grid">
        <label class="field-label">Aparece en (segundos)<input data-video-field="time" data-video-id="${o.id}" type="number" min="0" step="1" value="${o.time}" /></label>
        <label class="field-label">Opción correcta<select data-video-field="correct" data-video-id="${o.id}">${o.options.map((r,n)=>`<option value="${n}" ${n===o.correct?"selected":""}>Opción ${n+1}</option>`).join("")}</select></label>
      </div>
      <label class="field-label">Pregunta<input data-video-field="question" data-video-id="${o.id}" type="text" value="${p(o.question)}" maxlength="140" /></label>
      <label class="field-label">Opciones (separadas con |)<input data-video-field="options" data-video-id="${o.id}" type="text" value="${p(o.options.join(" | "))}" /></label>
    </div>`).join(""),a=h.bookmarks.map((o,s)=>`
    <div class="video-item video-item-compact" data-video-bookmark="${o.id}">
      <span class="entry-index">${String(s+1).padStart(2,"0")}</span>
      <input data-bookmark-field="time" data-video-id="${o.id}" type="number" min="0" step="1" value="${o.time}" aria-label="Segundo del marcador ${s+1}" />
      <input data-bookmark-field="label" data-video-id="${o.id}" type="text" value="${p(o.label)}" aria-label="Etiqueta del marcador ${s+1}" />
      <button class="remove-entry" data-action="remove-video-bookmark" data-video-id="${o.id}" aria-label="Eliminar marcador ${s+1}">×</button>
    </div>`).join("");return`<div class="generic-editor-card video-editor-card">
    <span class="section-kicker">CREADOR H5P</span>
    <h3>Vídeo interactivo</h3>
    <p>Sube un vídeo por URL, programa preguntas que aparecen en un segundo concreto y añade marcadores para saltar a los puntos clave.</p>
    <label class="field-label">Título de la actividad<input data-video-title type="text" value="${p(e.title)}" maxlength="60" /></label>
    <label class="field-label">Instrucciones<textarea data-video-instructions rows="2" maxlength="140">${p(e.instructions)}</textarea></label>
    <label class="field-label">URL del vídeo (MP4 o WebM)<input data-video-url type="url" value="${p(h.url)}" placeholder="https://ejemplo.com/video.mp4" /></label>
    <div class="content-divider"></div>
    <div class="content-heading"><div><span class="section-kicker">CONTENIDO</span><h3>Preguntas temporizadas</h3></div><span class="counter">${h.interactions.length} preguntas</span></div>
    <div class="video-item-list">${t||'<p class="video-empty">Sin preguntas todavía.</p>'}</div>
    <button class="add-entry" data-action="add-video-interaction"><span>＋</span> Añadir pregunta</button>
    <div class="content-divider"></div>
    <div class="content-heading"><div><span class="section-kicker">NAVEGACIÓN</span><h3>Marcadores</h3></div><span class="counter">${h.bookmarks.length} marcadores</span></div>
    <div class="video-item-list">${a||'<p class="video-empty">Sin marcadores todavía.</p>'}</div>
    <button class="add-entry" data-action="add-video-bookmark"><span>＋</span> Añadir marcador</button>
    <div class="generic-editor-actions"><button class="button button-dark" data-action="generate-video"><span class="icon">✦</span> Actualizar vista previa</button></div>
    <small>El vídeo debe estar accesible públicamente por HTTPS. Si tu plataforma no reproduce MP4 externo, sube el archivo a Moodle y pega su URL.</small>
  </div>`}function he(){const t=[...h.bookmarks.map(n=>({time:n.time,label:n.label,kind:"bookmark"})),...h.interactions.map(n=>({time:n.time,label:n.question,kind:"question"}))].sort((n,i)=>n.time-i.time),a=Math.max(30,...t.map(n=>n.time)),o=t.map(n=>`<span class="video-marker ${n.kind}" style="left:${Math.min(100,n.time/a*100)}%" title="${O(n.time)} · ${p(n.label)}"></span>`).join(""),s=h.interactions.map(n=>`<li><span class="video-time">${O(n.time)}</span><span>${p(n.question)}</span><small>${n.options.length} opciones</small></li>`).join(""),r=h.bookmarks.map(n=>`<button class="video-bookmark-chip" type="button">${O(n.time)} · ${p(n.label)}</button>`).join("");return`<div class="generic-preview video-preview">
    <div class="preview-header"><div class="preview-label"><span class="preview-icon">◉</span> VÍDEO INTERACTIVO</div><span class="preview-number">VISTA PREVIA</span></div>
    <div class="generic-preview-body">
      <span class="section-kicker">ACTIVIDAD CREADA</span>
      <h3>${p(e.title||"Vídeo interactivo")}</h3>
      <p>${p(e.instructions||"Responde a las preguntas mientras ves el vídeo.")}</p>
      <div class="video-screen">
        ${h.url?`<video controls preload="metadata" src="${p(h.url)}"></video>`:'<div class="video-placeholder">◉ Pega una URL de vídeo para verlo aquí</div>'}
      </div>
      <div class="video-timeline"><div class="video-timeline-track">${o}</div><span>00:00</span><span>${O(a)}</span></div>
      <div class="video-chip-list">${r||'<span class="video-empty">Sin marcadores</span>'}</div>
      <div class="video-question-list"><strong>Preguntas programadas</strong><ul>${s||'<li><span class="video-time">--:--</span><span>Sin preguntas todavía</span></li>'}</ul></div>
    </div>
  </div>`}function ge(){document.querySelector("#app").innerHTML=`
    <div class="app-shell">
      <header class="topbar">
        <a class="brand" href="#" aria-label="SopaCrea inicio">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
          <span class="brand-name">Sopa<span>Crea</span></span>
        </a>
        <div class="topbar-actions">
          <span class="save-state"><span class="save-dot"></span> Guardado localmente</span>
          <button class="button button-ghost" data-action="scroll-preview"><span class="icon">◉</span> Vista previa</button>
          <button class="avatar" aria-label="Perfil de usuario">AM</button>
        </div>
      </header>

      <main>
        <section class="hero-section">
          <div class="hero-copy">
            <div class="eyebrow"><span class="sparkle">✦</span> Creador de actividades H5P</div>
            <h1>Crea actividades<br /><em>que despiertan</em> curiosidad.</h1>
            <p class="hero-text">Diseña sopas de letras listas para Aules. Pronto llegarán más formatos: el resto de la biblioteca está en construcción.</p>
          </div>
          <div class="hero-note">
            <div class="note-line"><span class="note-number">01</span><span>Elige tu formato</span></div>
            <div class="note-line"><span class="note-number">02</span><span>Añade el contenido</span></div>
            <div class="note-line"><span class="note-number">03</span><span>Descarga y comparte</span></div>
          </div>
        </section>

        <div class="mode-switcher" role="tablist" aria-label="Tipo de actividad">
          <button class="mode-tab is-active" data-mode="wordsearch" role="tab"><span class="tab-icon">⌕</span><span><strong>Sopa de letras</strong><small>Disponible · exporta para Aules</small></span><span class="tab-arrow">↗</span></button>
          <button class="mode-tab is-construction" data-mode="crossword" role="tab" disabled aria-disabled="true" title="En construcción"><span class="tab-icon tab-icon-cross">＋</span><span><strong>Crucigrama</strong><small>En construcción</small></span><span class="tab-status">PRONTO</span></button>
        </div>

        <section class="catalog-section">
          <div class="catalog-heading"><div><span class="section-kicker">BIBLIOTECA H5P</span><h2>Explora los 54 tipos oficiales</h2><p>La sopa de letras ya está disponible. El resto de formatos está en construcción.</p></div><span class="catalog-badge">1 disponible · 53 en construcción</span></div>
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
            <button class="button button-primary generate-button" data-action="generate"><span>✦</span> Generar actividad <span class="button-arrow">↗</span></button>
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
  `}function B(){const t=A("[data-entry-list]"),a=e.mode==="crossword";t.innerHTML=e.entries.map((o,s)=>`
    <div class="entry-card" data-entry-card="${o.id}">
      <span class="entry-index">${String(s+1).padStart(2,"0")}</span>
      <div class="entry-fields">
        <input class="entry-input entry-word" data-entry-id="${o.id}" data-field="word" type="text" value="${p(o.word)}" placeholder="PALABRA" maxlength="18" aria-label="Palabra ${s+1}" />
        <input class="entry-input entry-clue" data-entry-id="${o.id}" data-field="clue" type="text" value="${p(o.clue)}" placeholder="${a?"Escribe una pista...":"Añade una pista opcional..."}" maxlength="80" aria-label="Pista ${s+1}" />
      </div>
      <button class="remove-entry" data-action="remove-entry" data-entry-id="${o.id}" aria-label="Eliminar ${p(o.word)}">×</button>
    </div>
  `).join(""),A("[data-counter]").textContent=`${e.entries.length} ${e.entries.length===1?"palabra":"palabras"}`,A("[data-content-title]").textContent=a?"Palabras y pistas":"Palabras escondidas",document.querySelectorAll(".wordsearch-setting").forEach(o=>{o.style.display=a?"none":"flex"})}function be(){return e.difficulty==="easy"?[[0,1],[1,0]]:e.difficulty==="medium"?[[0,1],[1,0],[1,1],[1,-1]]:[[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]]}function we(t,a,o,s,r,n){for(let i=0;i<a.length;i+=1){const c=o+r*i,d=s+n*i;if(c<0||c>=e.gridSize||d<0||d>=e.gridSize)return!1;const l=t[c][d];if(l&&l!==a[i])return!1}return!0}function J(t,a,o,s,r,n){for(let i=0;i<a.length;i+=1)t[o+r*i][s+n*i]=a[i]}function se(){const t=e.gridSize;e.grid=Array.from({length:t},()=>Array.from({length:t},()=>"")),e.placements=[],e.found.clear(),e.selectedStart=null,e.selectedCells=[],e.pointerPos=null;const a=be(),o=e.entries.map(r=>({entry:r,word:S(r.word)})).filter(r=>r.word.length>=2&&r.word.length<=t).sort((r,n)=>n.word.length-r.word.length);for(const r of o){let n=!1;for(let i=0;i<600&&!n;i+=1){const[c,d]=a[Math.floor(Math.random()*a.length)],l=Math.floor(Math.random()*t),m=Math.floor(Math.random()*t);we(e.grid,r.word,l,m,c,d)&&(J(e.grid,r.word,l,m,c,d),e.placements.push({id:r.entry.id,word:r.word,row:l,col:m,dr:c,dc:d}),n=!0)}}const s="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";for(let r=0;r<t;r+=1)for(let n=0;n<t;n+=1)e.grid[r][n]||(e.grid[r][n]=s[Math.floor(Math.random()*s.length)])}function ye(t,a,o,s,r,n){for(let i=0;i<a.length;i+=1){const c=o+r*i,d=s+n*i;if(c<0||c>=e.gridSize||d<0||d>=e.gridSize)return!1;const l=t[c][d];if(l&&l!==a[i])return!1}return!0}function P(t,a){return`${t}-${a}`}function ke(){let t=e.gridSize,a=-1,o=e.gridSize,s=-1;return e.placements.forEach(r=>{q(r).forEach(n=>{t=Math.min(t,n.row),a=Math.max(a,n.row),o=Math.min(o,n.col),s=Math.max(s,n.col)})}),a<t?{minRow:0,maxRow:0,minCol:0,maxCol:0}:{minRow:t,maxRow:a,minCol:o,maxCol:s}}function Ce(){const t=new Map;return[...e.placements].sort((o,s)=>o.row-s.row||o.col-s.col||o.dc-s.dc).forEach(o=>{const s=P(o.row,o.col);t.has(s)||t.set(s,t.size+1)}),t}function xe(t,a,o,s,r){var l;let n=0,i=0;for(let m=0;m<t.length;m+=1){const C=a+s*m,u=o+r*m;((l=e.grid[C])==null?void 0:l[u])===t[m]&&(n+=1),[[C-1,u],[C+1,u],[C,u-1],[C,u+1]].forEach(([z,T])=>{z>=0&&z<e.gridSize&&T>=0&&T<e.gridSize&&e.grid[z][T]&&(i+=1)})}const c=(e.gridSize-1)/2,d=Math.abs(a-c)+Math.abs(o-c);return n*30+Math.min(i,8)*3+t.length-d*.15}function Se(t){let a=null;const o=(s,r,n,i)=>{if(!ye(e.grid,t,s,r,n,i))return;const c=xe(t,s,r,n,i);(!a||c>a.score)&&(a={row:s,col:r,dr:n,dc:i,score:c})};for(const s of e.placements)for(let r=0;r<s.word.length;r+=1){const n=s.row+s.dr*r,i=s.col+s.dc*r;for(let c=0;c<t.length;c+=1){if(t[c]!==s.word[r])continue;const d=s.dr===0?1:0,l=s.dc===0?1:0;o(n-d*c,i-l*c,d,l)}}if(!a)for(let s=0;s<e.gridSize;s+=1)for(let r=0;r<e.gridSize;r+=1)o(s,r,0,1),o(s,r,1,0);return a}function $e(){const t=e.gridSize;e.grid=Array.from({length:t},()=>Array.from({length:t},()=>"")),e.placements=[],e.found.clear(),e.crosswordRevealed=!1,e.crosswordInputs.clear(),e.crosswordSelected=null,e.crosswordDirection="across",e.crosswordChecked=!1;const a=e.entries.map(n=>({entry:n,word:S(n.word)})).filter(n=>n.word.length>=2&&n.word.length<=t).sort((n,i)=>i.word.length-n.word.length);if(!a.length)return;const o=a[0],s=Math.max(0,Math.floor((t-o.word.length)/2)),r=Math.floor(t/2);J(e.grid,o.word,r,s,0,1),e.placements.push({id:o.entry.id,word:o.word,row:r,col:s,dr:0,dc:1});for(const n of a.slice(1)){const i=Se(n.word);i&&(J(e.grid,n.word,i.row,i.col,i.dr,i.dc),e.placements.push({id:n.entry.id,word:n.word,row:i.row,col:i.col,dr:i.dr,dc:i.dc}))}}function Y(t){return`${t.row}-${t.col}`}function q(t){return Array.from({length:t.word.length},(a,o)=>({row:t.row+t.dr*o,col:t.col+t.dc*o}))}function re(t,a){const o=a.row-t.row,s=a.col-t.col;if(!(o===0||s===0||Math.abs(o)===Math.abs(s)))return[];const n=Math.max(Math.abs(o),Math.abs(s)),i=n?o/n:0,c=n?s/n:0;return Array.from({length:n+1},(d,l)=>({row:t.row+i*l,col:t.col+c*l}))}function Ee(t,a){return e.selectedCells.some(o=>o.row===t&&o.col===a)}function Ae(t,a){return e.placements.some(o=>e.found.has(o.word)&&q(o).some(s=>s.row===t&&s.col===a))}function Z(t,a,o,s){const r=s?s.col:a.col+.5,n=s?s.row:a.row+.5;return`<line class="${o}" marker-end="url(#green-selection-arrow)" x1="${t.col+.5}" y1="${t.row+.5}" x2="${r}" y2="${n}" />`}function Pe(){const t=e.gridSize,a=e.grid.map((i,c)=>i.map((d,l)=>{const m=["preview-cell"];return Ee(c,l)&&m.push("is-selected"),Ae(c,l)&&m.push("is-found"),`<button class="${m.join(" ")}" data-cell-row="${c}" data-cell-col="${l}" aria-label="Fila ${c+1}, columna ${l+1}, letra ${d}">${d}</button>`}).join("")).join(""),o=e.found.size,s=e.entries.map(i=>{const c=S(i.word),d=e.found.has(c);return`<span class="word-chip ${d?"is-found":""}">${d?"✓":"○"} ${p(i.word||"Sin palabra")}</span>`}).join(""),r=e.placements.filter(i=>e.found.has(i.word)).map(i=>{const c=q(i);return Z(c[0],c[c.length-1],"found-line")}).join(""),n=e.selectedStart?Z(e.selectedStart,e.selectedCells[e.selectedCells.length-1]||e.selectedStart,"current-line",e.pointerPos||void 0):"";return`
    <div class="preview-header"><div class="preview-label"><span class="preview-icon">⌕</span> SOPA DE LETRAS</div><span class="preview-number">${String(e.entries.length).padStart(2,"0")} PALABRAS</span></div>
    <div class="preview-title-row"><div><h3>${p(e.title||"Sin título")}</h3><p>${p(e.instructions||"Encuentra las palabras escondidas.")}</p></div><span class="progress-badge">${o}/${e.placements.length} encontradas</span></div>
    <div class="wordsearch-layout"><div class="grid-frame"><div class="grid-board"><svg class="selection-overlay" viewBox="0 0 ${t} ${t}" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="green-selection-arrow" markerWidth="0.8" markerHeight="0.8" refX="0.68" refY="0.4" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 0.8 0.4 L 0 0.8 z" fill="#4f9678" /></marker></defs>${r}${n}</svg><div class="word-grid" style="--grid-size:${t}">${a}</div></div><div class="grid-hint"><span>1</span> Mantén pulsado y arrastra hasta la última letra</div></div><div class="word-list"><div class="word-list-title"><span>PALABRAS</span><span>${o}/${e.placements.length}</span></div>${s}</div></div>
    <div class="preview-activity-footer"><span><span class="timer-icon">◷</span> Tiempo: <strong>00:00</strong></span><span class="check-status">${o===e.placements.length&&e.placements.length?"¡Actividad completada!":"Selecciona una palabra para comprobar"}</span></div>
  `}function qe(t){var a,o;return((o=(a=e.entries.find(s=>s.id===t.id))==null?void 0:a.clue)==null?void 0:o.trim())||""}function G(t){const a=q(t),o=a.map(({row:r,col:n})=>e.crosswordInputs.get(P(r,n))||"").join(""),s=a.every(({row:r,col:n})=>!!e.crosswordInputs.get(P(r,n)));return{cells:a,guess:o,complete:s,correct:s&&o===t.word}}function ne(){if(!e.crosswordSelected)return;const{row:t,col:a}=e.crosswordSelected;return e.placements.find(o=>(e.crosswordDirection==="across"?o.dc!==0:o.dr!==0)&&q(o).some(r=>r.row===t&&r.col===a))}function Le(){var g,z,T;const t=ke(),a=Math.max(1,t.maxRow-t.minRow+1),o=Math.max(1,t.maxCol-t.minCol+1),s=Ce(),r=ne(),n=new Set(r?q(r).map(f=>Y(f)):[]),i=new Set,c=new Set;e.crosswordChecked&&(e.placements.forEach(f=>{const y=G(f);y.complete&&y.cells.forEach(L=>(y.correct?i:c).add(Y(L)))}),i.forEach(f=>c.delete(f)));const d=[];for(let f=t.minRow;f<=t.maxRow;f+=1)for(let y=t.minCol;y<=t.maxCol;y+=1){const L=((g=e.grid[f])==null?void 0:g[y])||"";if(!L){d.push('<span class="cross-cell cross-block" aria-hidden="true"></span>');continue}const N=P(f,y),pe=e.crosswordInputs.get(N)||"",M=["cross-cell"];((z=e.crosswordSelected)==null?void 0:z.row)===f&&((T=e.crosswordSelected)==null?void 0:T.col)===y&&M.push("is-selected"),n.has(N)&&M.push("is-active"),i.has(N)&&M.push("is-correct"),c.has(N)&&M.push("is-wrong"),e.crosswordRevealed&&M.push("is-revealed");const j=s.get(N),ue=e.crosswordRevealed?L:pe;d.push(`<button class="${M.join(" ")}" data-cross-row="${f}" data-cross-col="${y}" aria-label="Fila ${f-t.minRow+1}, columna ${y-t.minCol+1}${j?`, pista ${j}`:""}">${j?`<span class="cross-number">${j}</span>`:""}<span class="cross-letter">${ue}</span></button>`)}const l=e.placements.map(f=>({placement:f,number:s.get(P(f.row,f.col))||0,across:f.dc!==0,info:G(f)})).sort((f,y)=>f.number-y.number||(f.across===y.across?0:f.across?-1:1)),m=l.map(({placement:f,number:y,across:L,info:N})=>`
    <button class="clue-row ${N.correct?"is-solved":""}" data-crossword-id="${f.id}">
      <span class="clue-number">${y}</span>
      <span class="clue-direction" title="${L?"Horizontal":"Vertical"}">${L?"→":"↓"}</span>
      <span class="clue-text">${p(qe(f)||"Añade una pista para esta palabra.")}</span>
    </button>`).join(""),C=l.length>0&&l.every(f=>f.info.correct),u=e.crosswordRevealed?"Solución mostrada":C?"¡Crucigrama resuelto!":e.crosswordChecked?"Revisa las letras marcadas en rojo":"Haz clic en una casilla y escribe";return`
    <div class="preview-header"><div class="preview-label"><span class="preview-icon tab-icon-cross">＋</span> CRUCIGRAMA</div><span class="preview-number">${String(l.length).padStart(2,"0")} PISTAS</span></div>
    <div class="preview-title-row"><div><h3>${p(e.title||"Sin título")}</h3><p>${p(e.instructions||"Resuelve las pistas y completa la cuadrícula.")}</p></div>
      <div class="crossword-actions">
        <button class="mini-action" data-action="check-crossword">Comprobar</button>
        <button class="mini-action" data-action="reveal-crossword">${e.crosswordRevealed?"Ocultar solución":"Mostrar solución"}</button>
        <button class="mini-action" data-action="reset-crossword">Reiniciar</button>
      </div>
    </div>
    <div class="crossword-layout"><div class="crossword-grid" style="--cross-cols:${o};--cross-rows:${a};aspect-ratio:${o} / ${a}">${d.join("")}</div><div class="clue-list"><div class="word-list-title"><span>PISTAS</span><span>${l.length}</span></div>${m}</div></div>
    <div class="preview-activity-footer"><span><span class="timer-icon">◷</span> Tiempo: <strong>00:00</strong></span><span class="check-status">${u}</span></div>
  `}function v(){const t=A("[data-preview]");k==="interactive-video"?t.innerHTML=he():D()?t.innerHTML=e.mode==="wordsearch"?Pe():Le():t.innerHTML=ve()}function ee(t,a,o){var n,i,c;if(!((n=e.grid[t])!=null&&n[a]))return;const s=e.placements.filter(d=>q(d).some(l=>l.row===t&&l.col===a));if(!s.length)return;let r=o;r||(((i=e.crosswordSelected)==null?void 0:i.row)===t&&((c=e.crosswordSelected)==null?void 0:c.col)===a?r=e.crosswordDirection==="across"?"down":"across":r=s.some(l=>l.dc!==0)?"across":"down"),s.some(d=>r==="across"?d.dc!==0:d.dr!==0)||(r=r==="across"?"down":"across"),e.crosswordSelected={row:t,col:a},e.crosswordDirection=r,e.crosswordChecked=!1,v()}function Q(t){var i;if(!e.crosswordSelected)return;const a=ne();if(a){const c=q(a),d=c.findIndex(m=>m.row===e.crosswordSelected.row&&m.col===e.crosswordSelected.col),l=c[d+t];l&&(e.crosswordSelected={row:l.row,col:l.col});return}const o=e.crosswordDirection==="down"?t:0,s=e.crosswordDirection==="across"?t:0,r=e.crosswordSelected.row+o,n=e.crosswordSelected.col+s;(i=e.grid[r])!=null&&i[n]&&(e.crosswordSelected={row:r,col:n})}function Ne(t){if(t){if(!e.crosswordSelected){const a=e.placements[0];if(!a)return;e.crosswordSelected={row:a.row,col:a.col},e.crosswordDirection=a.dc!==0?"across":"down"}e.crosswordInputs.set(P(e.crosswordSelected.row,e.crosswordSelected.col),t),e.crosswordChecked=!1,Q(1),v()}}function ze(){if(!e.crosswordSelected)return;const t=P(e.crosswordSelected.row,e.crosswordSelected.col);e.crosswordInputs.has(t)?e.crosswordInputs.delete(t):(Q(-1),e.crosswordSelected&&e.crosswordInputs.delete(P(e.crosswordSelected.row,e.crosswordSelected.col))),e.crosswordChecked=!1,v()}function Te(){if(!e.placements.length)return;e.crosswordChecked=!0;const t=e.placements.every(a=>G(a).correct);v(),w(t?"¡Crucigrama resuelto! 🎉":"Revisa las letras marcadas en rojo.")}function Me(){e.crosswordInputs.clear(),e.crosswordRevealed=!1,e.crosswordChecked=!1,e.crosswordSelected=null,e.crosswordDirection="across",v(),w("Crucigrama reiniciado.")}function w(t,a="normal"){const o=A("[data-toast]");o.textContent=t,o.className=`toast is-visible ${a==="error"?"is-error":""}`,window.setTimeout(()=>o.classList.remove("is-visible"),3200)}function ie(){const t=e.entries.filter(o=>S(o.word).length<2);return e.title.trim()?e.entries.length<2?(w("Añade al menos dos palabras para generar la actividad.","error"),!1):t.length?(w("Cada palabra debe tener al menos 2 letras.","error"),!1):e.mode==="wordsearch"&&e.entries.some(o=>S(o.word).length>e.gridSize)?(w(`Hay una palabra más larga que la cuadrícula de ${e.gridSize} × ${e.gridSize}.`,"error"),!1):!0:(w("Añade un título para tu actividad.","error"),!1)}function U(t=!0){ie()&&(e.mode==="wordsearch"?se():$e(),v(),t&&w(e.mode==="wordsearch"?"Sopa de letras generada.":"Crucigrama actualizado."))}function ce(){document.querySelectorAll("[data-difficulty]").forEach(a=>{a.classList.toggle("is-selected",a.dataset.difficulty===e.difficulty)});const t={easy:"Solo horizontal y vertical",medium:"Horizontal, vertical y diagonal",hard:"En todas las direcciones"};A("[data-difficulty-description]").textContent=t[e.difficulty]}function Re(t){let a=4294967295;for(const o of t){a^=o;for(let s=0;s<8;s+=1)a=a>>>1^(a&1?3988292384:0)}return(a^4294967295)>>>0}function x(t,a,o){t[a]=o&255,t[a+1]=o>>>8&255,t[a+2]=o>>>16&255,t[a+3]=o>>>24&255}function b(t,a,o){t[a]=o&255,t[a+1]=o>>>8&255}function te(t){const a=new Uint8Array(t.reduce((s,r)=>s+r.length,0));let o=0;return t.forEach(s=>{a.set(s,o),o+=s.length}),a}function K(t){const a=new TextEncoder,o=[],s=[];let r=0;t.forEach(d=>{const l=a.encode(d.name),m=a.encode(d.data),C=Re(m),u=new Uint8Array(30+l.length+m.length);x(u,0,67324752),b(u,4,20),b(u,6,0),b(u,8,0),b(u,10,0),b(u,12,0),x(u,14,C),x(u,18,m.length),x(u,22,m.length),b(u,26,l.length),b(u,28,0),u.set(l,30),u.set(m,30+l.length),o.push(u);const g=new Uint8Array(46+l.length);x(g,0,33639248),b(g,4,20),b(g,6,20),b(g,8,0),b(g,10,0),b(g,12,0),b(g,14,0),x(g,16,C),x(g,20,m.length),x(g,24,m.length),b(g,28,l.length),b(g,30,0),b(g,32,0),b(g,34,0),b(g,36,0),x(g,38,0),x(g,42,r),g.set(l,46),s.push(g),r+=u.length});const n=te(o),i=te(s),c=new Uint8Array(22);return x(c,0,101010256),b(c,4,0),b(c,6,0),b(c,8,t.length),b(c,10,t.length),x(c,12,i.length),x(c,16,n.length),b(c,20,0),new Blob([n.buffer,i.buffer,c.buffer],{type:"application/zip"})}function F(t,a){const o=URL.createObjectURL(t),s=document.createElement("a");s.href=o,s.download=a,s.click(),window.setTimeout(()=>URL.revokeObjectURL(o),1e3)}function Ie(t){return`(function () {
  H5P.${t.replace(/^H5P\./,"")} = function (params, contentId) {
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
})();`}function De(){if(!h.url.trim()){w("Pega primero una URL de vídeo (MP4 o WebM).","error");return}const t="H5P.SopaCreaVideo",a=1,o=0,s=h.interactions.filter(u=>u.question.trim()&&u.options.length>=2).map(u=>({time:u.time,question:u.question.trim(),options:u.options,correct:u.correct})),r=h.bookmarks.filter(u=>u.label.trim()).map(u=>({time:u.time,label:u.label.trim()})),n=`${t}-${a}.${o}`,i={title:"Vídeo interactivo SopaCrea",description:"Vídeo con preguntas temporizadas y marcadores para Moodle y Aules",machineName:t,majorVersion:a,minorVersion:o,patchVersion:0,author:"SopaCrea",license:"cc-by",runnable:1,preloadedJs:[{path:"interactive-video.js"}],preloadedCss:[{path:"interactive-video.css"}],semantics:"semantics.json",coreApi:{majorVersion:1,minorVersion:24}},c=[{name:"taskDescription",type:"text",label:"Instrucciones",optional:!0},{name:"videoUrl",type:"text",label:"URL del vídeo"},{name:"interactionsData",type:"text",label:"Preguntas",optional:!0},{name:"bookmarksData",type:"text",label:"Marcadores",optional:!0}],d={title:e.title,taskDescription:e.instructions,videoUrl:h.url.trim(),interactionsData:JSON.stringify(s),bookmarksData:JSON.stringify(r)},l={title:e.title,language:"es",mainLibrary:t,embedTypes:["div"],preloadedDependencies:[{machineName:t,majorVersion:a,minorVersion:o}]},C=K([{name:"h5p.json",data:JSON.stringify(l,null,2)},{name:"content/content.json",data:JSON.stringify(d,null,2)},{name:`${n}/library.json`,data:JSON.stringify(i,null,2)},{name:`${n}/semantics.json`,data:JSON.stringify(c,null,2)},{name:`${n}/interactive-video.js`,data:Ie(t)},{name:`${n}/interactive-video.css`,data:".h5p-sopavideo{font-family:Arial,sans-serif;color:#1c3530}.h5p-sopavideo-desc{margin:0 0 12px;font-size:13px}.h5p-sopavideo-player{position:relative;max-width:720px}.h5p-sopavideo-screen{position:relative;background:#102b27;aspect-ratio:16/9;display:grid;place-items:center;overflow:hidden;border-radius:6px}.h5p-sopavideo-screen video{width:100%;height:100%;object-fit:contain}.h5p-sopavideo-placeholder{color:#c9e2d6;font-size:14px}.h5p-sopavideo-timeline{margin-top:10px}.h5p-sopavideo-track{position:relative;height:6px;background:#d8e5dd;border-radius:3px}.h5p-sopavideo-fill{position:absolute;top:0;bottom:0;left:0;width:0;background:#4f9678;border-radius:3px}.h5p-sopavideo-mark{position:absolute;top:50%;width:10px;height:10px;padding:0;border:0;border-radius:50%;transform:translate(-50%,-50%);background:#4f9678;cursor:pointer}.h5p-sopavideo-mark.bookmark{background:#e08b62}.h5p-sopavideo-times{display:flex;justify-content:space-between;font-size:11px;color:#5a6f66;margin-top:4px}.h5p-sopavideo-question{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(10,32,28,.78)}.h5p-sopavideo-question-card{background:#fff;border-radius:8px;padding:20px;max-width:420px;width:90%;box-shadow:0 12px 30px rgba(0,0,0,.3)}.h5p-sopavideo-question-card h4{margin:0 0 12px;font-size:16px}.h5p-sopavideo-options{display:grid;gap:7px}.h5p-sopavideo-options button{border:1px solid #c6ddcf;background:#f4faf5;border-radius:5px;padding:9px;text-align:left;cursor:pointer}.h5p-sopavideo-options button.correct{background:#c8e4d2;border-color:#4f9678}.h5p-sopavideo-options button.wrong{background:#f6d7cd;border-color:#d88a70}.h5p-sopavideo-options button:disabled{cursor:default;opacity:.85}.h5p-sopavideo-feedback{margin:10px 0;font-size:13px;color:#315a49}.h5p-sopavideo-continue{border:0;background:#4f9678;color:#fff;border-radius:5px;padding:8px 14px;cursor:pointer}.h5p-sopavideo-list{margin:14px 0 0;padding-left:20px;font-size:12px;line-height:1.7}.h5p-sopavideo-list li.done{color:#4f9678;text-decoration:line-through}.h5p-sopavideo-time{display:inline-block;min-width:38px;font-family:monospace;color:#6d8b7c}.h5p-sopavideo-score{margin-top:10px;font-weight:600;color:#315a49}"},{name:`${n}/language/es.json`,data:JSON.stringify({libraryStrings:{correct:"Correcto",wrong:"Incorrecto",continue:"Continuar"}},null,2)}]);F(C,`${S(e.title).toLowerCase().replaceAll(" ","-")||"actividad"}-video.h5p`),w("Paquete H5P de vídeo descargado. Listo para importar.")}function je(){const t=[...new Set(e.entries.map(n=>S(n.word)).filter(Boolean))];if(t.length<2){w("Añade al menos dos palabras para crear la sopa de letras.","error");return}const a={title:e.title,taskDescription:e.instructions||"Encuentra las palabras escondidas en la sopa de letras.",wordList:t.join(","),behaviour:{orientations:{horizontal:!0,horizontalBack:!0,vertical:!0,verticalUp:!0,diagonal:!0,diagonalBack:!0,diagonalUp:!0,diagonalUpBack:!0},fillPool:"abcdefghijklmnopqrstuvwxyz",preferOverlap:!0,showVocabulary:!0,enableShowSolution:!0,enableRetry:!0},l10n:{check:"Comprobar",tryAgain:"Reintentar",showSolution:"Mostrar solución",found:"@found de @totalWords encontradas",timeSpent:"Tiempo",score:"Has encontrado @score de @total palabras",wordListHeader:"Encuentra las palabras"}},o={title:e.title,language:"es",mainLibrary:"H5P.FindTheWords",embedTypes:["iframe"],preloadedDependencies:[{machineName:"H5P.FindTheWords",majorVersion:1,minorVersion:4}]},s=K([{name:"h5p.json",data:JSON.stringify(o,null,2)},{name:"content/content.json",data:JSON.stringify(a,null,2)}]),r=S(e.title).toLowerCase().replaceAll(" ","-")||"actividad";F(s,`${r}-sopa-aules.h5p`),w("Paquete H5P para Aules descargado. Usa la librería oficial H5P.FindTheWords, sin instalar nada.")}function Oe(){const t=e.entries.map(n=>({clue:n.clue.trim()||"Sin pista",answer:S(n.word)})).filter(n=>n.answer.length>=2);if(t.length<2){w("Añade al menos dos palabras con pista para crear el crucigrama.","error");return}const a={title:e.title,taskDescription:e.instructions||"Resuelve el crucigrama con las pistas.",words:t,overallFeedback:[{from:0,to:49,feedback:"Sigue intentándolo. Revisa las pistas y las letras que ya has escrito."},{from:50,to:99,feedback:"¡Casi lo tienes! Corrige las palabras que estén incompletas."},{from:100,to:100,feedback:"¡Perfecto! Has resuelto el crucigrama completo."}],behaviour:{enableInstantFeedback:!1,scoreWords:!0,applyPenalties:!1,enableRetry:!0,enableSolutionsButton:!0,keepCorrectAnswers:!1},l10n:{title:"Crucigrama",across:"Horizontal",down:"Vertical",checkAnswer:"Comprobar",submitAnswer:"Enviar",tryAgain:"Reintentar",showSolution:"Mostrar solución",couldNotGenerateCrossword:"No se pudo generar el crucigrama con estas palabras. Prueba con menos palabras o con palabras que compartan más letras.",couldNotGenerateCrosswordTooFewWords:"No se pudo generar el crucigrama. Necesitas al menos dos palabras.",probematicWords:"Algunas palabras no se pudieron colocar: @words",problematicWords:"Algunas palabras no se pudieron colocar: @words",extraClue:"Pista extra",closeWindow:"Cerrar"},a11y:{crosswordGrid:"Cuadrícula de crucigrama. Usa las flechas para moverte y el teclado para escribir. También puedes usar Tab para escribir las respuestas en los campos de texto.",column:"Columna",row:"Fila",across:"Horizontal",down:"Vertical",empty:"Vacío",listLabel:"Respuestas del crucigrama",resultFor:"Resultado para: @clue",correct:"Correcto",wrong:"Incorrecto",point:"punto",solutionFor:"Para @clue la solución es: @solution",extraClueFor:"Abrir pista extra para @clue",letterSevenOfNine:"Letra @position de @length",lettersWord:"palabra de @length letras",check:"Comprueba las letras. Las respuestas se marcarán como correctas, incorrectas o sin contestar.",showSolution:"Muestra la solución y rellena el crucigrama con las respuestas correctas.",retry:"Vuelve a intentar la tarea. Borra tus respuestas y empieza de nuevo.",yourResult:"Has conseguido @score de un total de @total puntos."}},o={title:e.title,language:"es",mainLibrary:"H5P.Crossword",embedTypes:["iframe"],preloadedDependencies:[{machineName:"H5P.Crossword",majorVersion:0,minorVersion:5}]},s=K([{name:"h5p.json",data:JSON.stringify(o,null,2)},{name:"content/content.json",data:JSON.stringify(a,null,2)}]),r=S(e.title).toLowerCase().replaceAll(" ","-")||"actividad";F(s,`${r}-crucigrama-aules.h5p`),w("Paquete de crucigrama para Aules descargado. Usa la librería oficial H5P.Crossword, sin instalar nada.")}function le(){if(!D()){w("Este tipo H5P está seleccionado como plantilla. Abre su demo para construirlo.","error");return}if(k==="interactive-video"){De();return}if(ie()){if(e.mode==="wordsearch"){je();return}Oe()}}function He(){document.body.classList.add("is-printing"),window.setTimeout(()=>window.print(),80),window.setTimeout(()=>document.body.classList.remove("is-printing"),1e3)}function Ve(){if(D()){le();return}const t=$.find(s=>s.id===k)||$[0],a={type:t.name,typeId:t.id,title:e.title,content:I,fields:t.fields,demo:t.demo},o=`${S(e.title||t.name).toLowerCase().replaceAll(" ","-")||"actividad"}-${t.id}.json`;F(new Blob([JSON.stringify(a,null,2)],{type:"application/json"}),o),w("Borrador descargado.")}function Ue(){const t=document.querySelector(".catalog-section");t==null||t.classList.remove("is-animating"),window.requestAnimationFrame(()=>t==null?void 0:t.classList.add("is-animating")),window.setTimeout(()=>t==null?void 0:t.classList.remove("is-animating"),650)}function de(t,a){if(!e.selectedStart)return;e.selectedCells=re(e.selectedStart,{row:t,col:a});const o=e.selectedCells.map(n=>{var i;return((i=e.grid[n.row])==null?void 0:i[n.col])||""}).join(""),s=o.split("").reverse().join(""),r=e.placements.find(n=>n.word===o||n.word===s);r?(e.found.add(r.word),w(`¡Encontraste «${r.word}»!`)):(w("Casi. Prueba con otra combinación.","error"),e.selectedCells=[]),e.selectedStart=null,e.pointerSelecting=!1,e.pointerPos=null,v()}function Be(t,a){if(e.mode!=="crossword"){if(e.suppressNextCellClick){e.suppressNextCellClick=!1;return}if(!e.selectedStart){e.selectedStart={row:t,col:a},e.selectedCells=[{row:t,col:a}],e.pointerPos={row:t+.5,col:a+.5},v(),w("Ahora haz clic en la última letra.");return}de(t,a)}}function Fe(t,a){if(t==="scroll-preview"&&A("[data-preview]").scrollIntoView({behavior:"smooth",block:"center"}),t==="add-entry"){e.entries.push({id:e.nextId++,word:"",clue:""}),B();const o=document.querySelector(".entry-card:last-child .entry-word");o==null||o.focus()}if(t==="remove-entry"){if(e.entries.length<=2){w("Mantén al menos dos palabras.","error");return}const o=Number(a.dataset.entryId);e.entries=e.entries.filter(s=>s.id!==o),B(),v()}t==="add-video-interaction"&&(h.interactions.push({id:h.nextId++,time:Math.max(0,...h.interactions.map(o=>o.time))+5,question:"Nueva pregunta",options:["Opción 1","Opción 2","Opción 3"],correct:0}),E(),v()),t==="remove-video-interaction"&&(h.interactions=h.interactions.filter(o=>o.id!==Number(a.dataset.videoId)),E(),v()),t==="add-video-bookmark"&&(h.bookmarks.push({id:h.nextId++,time:Math.max(0,...h.bookmarks.map(o=>o.time))+5,label:"Nuevo marcador"}),E(),v()),t==="remove-video-bookmark"&&(h.bookmarks=h.bookmarks.filter(o=>o.id!==Number(a.dataset.videoId)),E(),v()),t==="generate-video"&&(E(),v(),w("Vista previa del vídeo actualizada.")),t==="generate"&&U(),t==="update-generic"&&(v(),w("Vista previa actualizada.")),t==="download-selected"&&Ve(),t==="animate-selected"&&Ue(),t==="export-h5p"&&le(),t==="print"&&He(),t==="reveal-crossword"&&(e.crosswordRevealed=!e.crosswordRevealed,e.crosswordChecked=!1,v()),t==="check-crossword"&&Te(),t==="reset-crossword"&&Me()}function ae(t){const a=document.querySelector(".grid-board");if(!a)return null;const o=a.getBoundingClientRect();if(!o.width||!o.height)return null;const s=r=>Math.max(0,Math.min(e.gridSize,r));return{col:s((t.clientX-o.left)/o.width*e.gridSize),row:s((t.clientY-o.top)/o.height*e.gridSize)}}function We(){const t=document.querySelector(".current-line");t&&e.pointerPos&&(t.setAttribute("x2",String(e.pointerPos.col)),t.setAttribute("y2",String(e.pointerPos.row)));const a=document.querySelector(".word-grid");a&&(a.querySelectorAll(".preview-cell.is-selected").forEach(o=>o.classList.remove("is-selected")),e.selectedCells.forEach(o=>{var s;(s=a.querySelector(`[data-cell-row="${o.row}"][data-cell-col="${o.col}"]`))==null||s.classList.add("is-selected")}))}function Je(){document.addEventListener("pointerdown",t=>{const a=t.target.closest("[data-cell-row]");!a||e.mode==="crossword"||(t.preventDefault(),e.pointerSelecting=!0,e.selectedStart={row:Number(a.dataset.cellRow),col:Number(a.dataset.cellCol)},e.selectedCells=[e.selectedStart],e.pointerPos=ae(t)||{row:e.selectedStart.row+.5,col:e.selectedStart.col+.5},v())}),document.addEventListener("pointermove",t=>{var s;if(!e.pointerSelecting||!e.selectedStart)return;const a=ae(t);if(!a)return;e.pointerPos=a;const o=(s=document.elementFromPoint(t.clientX,t.clientY))==null?void 0:s.closest("[data-cell-row]");o&&(e.selectedCells=re(e.selectedStart,{row:Number(o.dataset.cellRow),col:Number(o.dataset.cellCol)})),We()}),document.addEventListener("pointerup",t=>{var r;if(!e.pointerSelecting||!e.selectedStart)return;const a=(r=document.elementFromPoint(t.clientX,t.clientY))==null?void 0:r.closest("[data-cell-row]");if(!a){e.pointerSelecting=!1,e.selectedStart=null,e.selectedCells=[],e.pointerPos=null,v();return}const o=Number(a.dataset.cellRow),s=Number(a.dataset.cellCol);e.pointerPos={row:o+.5,col:s+.5},e.suppressNextCellClick=!0,de(o,s)}),document.addEventListener("pointercancel",()=>{e.pointerSelecting&&(e.pointerSelecting=!1,e.selectedStart=null,e.selectedCells=[],e.pointerPos=null,v())}),document.addEventListener("click",t=>{var l;const a=t.target,o=a.closest("[data-action]");o!=null&&o.dataset.action&&Fe(o.dataset.action,o);const s=a.closest("[data-mode]");s!=null&&s.dataset.mode&&(e.mode=s.dataset.mode,k=e.mode==="wordsearch"?"find-the-words":"crossword",document.querySelectorAll("[data-mode]").forEach(m=>m.classList.toggle("is-active",m===s)),R(),E(),B(),U(!1));const r=a.closest("[data-h5p-id]");r!=null&&r.dataset.h5pId&&!r.disabled&&(k=r.dataset.h5pId,I="",k==="crossword"&&(e.mode="crossword"),k==="find-the-words"&&(e.mode="wordsearch"),R(),E(),v(),(l=document.querySelector(".catalog-section"))==null||l.scrollIntoView({behavior:"smooth",block:"center"}));const n=a.closest("[data-difficulty]");n!=null&&n.dataset.difficulty&&(e.difficulty=n.dataset.difficulty,ce(),U(!1));const i=a.closest("[data-crossword-id]");if(i&&e.mode==="crossword"){const m=e.placements.find(C=>C.id===Number(i.dataset.crosswordId));m&&ee(m.row,m.col,m.dc!==0?"across":"down");return}const c=a.closest("[data-cell-row]");c&&Be(Number(c.dataset.cellRow),Number(c.dataset.cellCol));const d=a.closest("[data-cross-row]");d&&ee(Number(d.dataset.crossRow),Number(d.dataset.crossCol))}),document.addEventListener("keydown",t=>{if(e.mode!=="crossword"||!D())return;const a=t.target;if(a&&(a.tagName==="INPUT"||a.tagName==="TEXTAREA"||a.tagName==="SELECT"||a.isContentEditable)||t.ctrlKey||t.metaKey||t.altKey)return;const o=t.key;if(o==="ArrowLeft"||o==="ArrowRight"||o==="ArrowUp"||o==="ArrowDown"){if(!e.crosswordSelected)return;const s=o==="ArrowLeft"||o==="ArrowRight"?"across":"down";e.crosswordDirection!==s?(e.crosswordDirection=s,e.crosswordChecked=!1,v()):(Q(o==="ArrowLeft"||o==="ArrowUp"?-1:1),e.crosswordChecked=!1,v()),t.preventDefault();return}if(o==="Backspace"||o==="Delete"){ze(),t.preventDefault();return}if(o==="Enter"){e.crosswordDirection=e.crosswordDirection==="across"?"down":"across",e.crosswordChecked=!1,v(),t.preventDefault();return}if(o==="Escape"){e.crosswordSelected=null,v();return}o.length===1&&/[a-zñáéíóúü]/i.test(o)&&(Ne(S(o)),t.preventDefault())}),document.addEventListener("input",t=>{const a=t.target;if(a.id==="activity-title"&&(e.title=a.value,v()),a.id==="activity-instructions"&&(e.instructions=a.value,v()),a.matches("[data-generic-title]")&&(e.title=a.value,v()),a.matches("[data-generic-content]")&&(I=a.value,v()),a.matches("[data-video-title]")&&(e.title=a.value,v()),a.matches("[data-video-instructions]")&&(e.instructions=a.value,v()),a.matches("[data-video-url]")&&(h.url=a.value,v()),a.matches("[data-video-field]")){const o=h.interactions.find(s=>s.id===Number(a.dataset.videoId));if(o){const s=a.dataset.videoField;s==="time"&&(o.time=Math.max(0,Number(a.value)||0)),s==="question"&&(o.question=a.value),s==="correct"&&(o.correct=Math.max(0,Number(a.value)||0)),s==="options"&&(o.options=a.value.split("|").map(r=>r.trim()).filter(Boolean),o.correct>=o.options.length&&(o.correct=0)),v()}}if(a.matches("[data-bookmark-field]")){const o=h.bookmarks.find(s=>s.id===Number(a.dataset.videoId));o&&(a.dataset.bookmarkField==="time"&&(o.time=Math.max(0,Number(a.value)||0)),a.dataset.bookmarkField==="label"&&(o.label=a.value),v())}if(a.dataset.entryId&&a.dataset.field){const o=e.entries.find(s=>s.id===Number(a.dataset.entryId));o&&(o[a.dataset.field]=a.value)}a.matches("[data-catalog-search]")&&(W=a.value,R())}),document.addEventListener("change",t=>{const a=t.target;a.matches("[data-catalog-group]")&&(H=a.value,R())}),A("#grid-size").addEventListener("change",t=>{e.gridSize=Number(t.target.value),U(!1)})}ge();R();E();B();se();v();ce();Je();
