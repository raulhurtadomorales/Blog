# raulhurtadomorales.com

Sitio personal y blog "Casos" de Raúl Hurtado Morales. Construido en **Astro** (sitio estático), deployado en **Netlify** desde **GitHub**, con dominio en GoDaddy.

## Qué hay aquí

```
src/
├── components/         (vacío por ahora — para componentes reutilizables a futuro)
├── content/
│   └── casos/          ← AQUÍ VIVEN LOS POSTS del blog (cada uno = un .md)
│       └── bienvenido.md
├── content.config.ts   (define el schema de los posts)
├── layouts/
│   ├── BaseLayout.astro    (head, fonts, meta — base de todas las páginas)
│   └── PostLayout.astro    (layout específico para post de blog)
├── pages/
│   ├── index.astro         (home — raulhurtadomorales.com)
│   └── casos/
│       ├── index.astro     (/casos/ — lista de posts)
│       └── [...slug].astro (/casos/[slug]/ — post individual)
└── styles/
    └── global.css      (paleta, fuentes, atmósfera compartida)
```

## Para publicar un caso nuevo (flujo después del setup inicial)

1. En GitHub web, navega a `src/content/casos/`
2. Click "Add file" → "Create new file"
3. Nombre del archivo: `slug-del-caso.md` (ej. `sognare-buen-fin-2025.md`). Este slug es la URL del post.
4. Pega tu contenido. Debe empezar con frontmatter:
   ```
   ---
   title: "Título del caso"
   date: 2026-07-15
   dek: "Una línea o dos explicando de qué va el caso (aparece en /casos/)."
   ---
   
   Aquí empieza el cuerpo del post en markdown...
   ```
5. Scroll al final, "Commit changes" → "Commit directly to main branch"
6. Netlify detecta el commit y rebuilda en ~60 segundos
7. El post aparece automáticamente en `/casos/` y como `/casos/slug-del-caso/`

## Setup inicial (una sola vez)

### Paso 1 — Crear repo en GitHub

1. Entra a [github.com](https://github.com) con tu cuenta `raulhurtadomorales`
2. Arriba a la derecha, click el "+" → "New repository"
3. **Repository name:** `raulhurtadomorales-com` (o como prefieras — `personal-site`, etc.)
4. **Description:** "Sitio personal y blog" (opcional)
5. **Public** o **Private** — yo recomiendo **Public** (es código de tu sitio, sin secretos, y los repos públicos son los que GitHub muestra en tu perfil — un plus profesional sutil)
6. **NO marques** "Add a README", "Add .gitignore", o "Choose a license" — ya vienen incluidos en el zip
7. Click "Create repository"
8. GitHub te muestra una pantalla con instrucciones. **Ignora esas instrucciones**, sigue los siguientes pasos.

### Paso 2 — Subir los archivos al repo

La forma más sencilla (sin terminal):

1. En la pantalla del repo recién creado, click el link **"uploading an existing file"** (aparece en el medio de la pantalla)
2. Descomprime el zip que te entregué en tu computadora
3. **Importante:** entra a la carpeta descomprimida. Selecciona TODOS los archivos y carpetas DE ADENTRO (no la carpeta exterior). Esto incluye:
   - `src/` (carpeta)
   - `public/` (carpeta — puede estar vacía, no la subas si no tiene contenido)
   - `astro.config.mjs`
   - `netlify.toml`
   - `package.json`
   - `.gitignore`
   - `README.md`
4. Arrástralos todos juntos a la zona de drag & drop en GitHub
5. Espera a que carguen (puede tomar unos segundos)
6. Scroll al final, escribe en el mensaje del commit: `Initial commit`
7. Click "Commit changes"

**NO subas la carpeta `node_modules/`** si aparece — Netlify la genera automáticamente cuando builda. El `.gitignore` ya la excluye.

### Paso 3 — Conectar Netlify con el repo (sin tocar el sitio en vivo aún)

Aquí es importante: vamos a crear un proyecto Netlify **nuevo y temporal** para verificar que todo builda bien antes de mover el dominio. Esto evita riesgo de que el sitio en vivo se caiga.

1. Entra a [netlify.com](https://netlify.com) con tu cuenta (la misma donde está el sitio actual)
2. En el dashboard, click "Add new site" → "Import an existing project"
3. Click "Deploy with GitHub"
4. Autoriza Netlify para acceder a GitHub si te lo pide (es seguro — es el flujo OAuth estándar)
5. Selecciona el repo `raulhurtadomorales-com` que acabas de crear
6. Netlify lee el `netlify.toml` y autopopula la configuración:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. NO toques nada más. Click "Deploy site"
8. Netlify empieza a buildar. Toma 1-2 minutos la primera vez (instala dependencies, builda Astro, deploya).
9. Cuando termine, Netlify te da una URL tipo `https://random-name-xxx.netlify.app`
10. **Abre esa URL y verifica que todo se vea bien:**
    - Home (`/`) — idéntico al actual, con la nueva row "Casos"
    - `/casos/` — index del blog con el post de ejemplo
    - `/casos/bienvenido/` — post individual del ejemplo

Si todo se ve bien, sigue al Paso 4. Si algo está roto, dime exactamente qué ves y lo diagnosticamos.

### Paso 4 — Mover el dominio raulhurtadomorales.com al nuevo proyecto

Ahora que confirmaste que el repo + Netlify nuevo funcionan, hay dos formas de hacer la transición. Te recomiendo la **B** porque es menos invasiva.

**Opción A: Eliminar el sitio Netlify actual y mover el dominio al nuevo.**
Más limpio pero más pasos. Si quieres ir por aquí, dime y te guío.

**Opción B (recomendada): Cambiar el sitio Netlify actual para que builde desde el repo de GitHub.**
Mantienes el mismo proyecto Netlify, el mismo dominio, el mismo SSL. Solo cambias el source.

Pasos para B:

1. Ve al proyecto Netlify **antiguo** (el que tiene conectado raulhurtadomorales.com — `jade-biscuit-d07b00.netlify.app`)
2. Site configuration → Build & deploy → Continuous deployment
3. "Link to Git repository" → conecta GitHub → selecciona el repo `raulhurtadomorales-com`
4. Build settings se autopopulan desde `netlify.toml`. Confirma.
5. Trigger deploy → "Deploy site"
6. Netlify builda desde GitHub y publica. El sitio en raulhurtadomorales.com ahora es el nuevo (con `/casos/` funcionando).
7. El proyecto temporal del Paso 3 puedes borrarlo (Site configuration → Danger zone → Delete this site). Ya no lo necesitas.

### Verificación final

Después del Paso 4, prueba en una pestaña incógnita:

- `raulhurtadomorales.com/` — home con la row Casos
- `raulhurtadomorales.com/casos/` — index del blog
- `raulhurtadomorales.com/casos/bienvenido/` — post de ejemplo

Si los tres cargan bien, listo. Setup completo.

## Para desarrollo local (opcional, no necesario)

Si en algún momento quieres probar cambios localmente antes de subir a GitHub:

```bash
npm install
npm run dev
```

Eso abre el sitio en `http://localhost:4321` con hot reload. Pero honestamente, para 1 post al mes, editar directo en GitHub web es más sencillo.

## Mantenimiento

- **Actualizar dependencias:** ocasionalmente Astro saca versiones nuevas. Si quieres actualizar: en GitHub web, editas `package.json` y cambias la versión. Mejor déjalo estable salvo que haya razón concreta para actualizar.
- **Backup:** GitHub es el backup. Mientras el repo exista, tu sitio se puede reconstruir desde cero.
- **Dominio:** el dominio vive en GoDaddy, no en Netlify ni GitHub. Su renovación es separada (próxima en 2029, según el plan de 3 años).
- **SSL:** Let's Encrypt auto-renueva cada 3 meses, manejado por Netlify automáticamente.
