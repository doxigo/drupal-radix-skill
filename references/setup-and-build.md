# Setup and build pipeline

Everything you need to install Radix, generate a subtheme, configure DDEV/Lando, and run the dev server. Source: https://docs.trydrupal.com/radix/installation/.

## Requirements

| Tool | Version | Notes |
| --- | --- | --- |
| Drupal core | `^10.1` or higher | Radix 6.x is Drupal-10.1-compatible. Radix 5.x supports older cores; see `migration.md`. |
| Drush | `^12` or higher | `composer require drush/drush` if not already installed. |
| PHP | `^8.1` | Inherits from Drupal 10.1+. |
| Node.js | LTS (currently `lts/jod`) | Use [nvm](https://github.com/nvm-sh/nvm). Each subtheme ships an `.nvmrc`. |
| npm | latest | `npm install -g npm` to upgrade globally. |
| Composer | `^2` | Standard Drupal install. |
| BiomeJS | bundled via npm | Optional but recommended VSCode extension: [biomejs.biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome). |

Start from a working Drupal install ([Installing Drupal](https://www.drupal.org/docs/getting-started/installing-drupal)) before adding Radix.

## Install Radix and generate a subtheme

```bash
# 1) Add Radix as a dependency
composer require 'drupal/radix:^6.0'

# 2) Generate your subtheme. Lowercase, no spaces. SUBTHEME_NAME below = your name.
drush --include="web/themes/contrib/radix" radix:create SUBTHEME_NAME

# 3) Enable and set as default
drush theme:enable SUBTHEME_NAME
drush config:set system.theme default SUBTHEME_NAME -y

# 4) Move into the subtheme directory
cd web/themes/custom/SUBTHEME_NAME

# 5) Use the Node version pinned by the subtheme's .nvmrc
nvm use   # if it errors with "no version installed", run `nvm install` first

# 6) Install JS dependencies
npm install

# 7) Configure local URL for BrowserSync
cp .env.example .env.local
# Edit .env.local — set DRUPAL_BASE_URL to your local Drupal URL
# Examples:
#   DRUPAL_BASE_URL=http://localhost:8888
#   DRUPAL_BASE_URL=https://mysite.ddev.site
#   DRUPAL_BASE_URL=https://mysite.lndo.site

# 8) Run the dev watcher
npm run watch
```

Notes:
- If your Drupal install isn't at the standard `web/` docroot (e.g. `docroot/` or root), adjust the `--include` path in step 2.
- For DDEV: prefix the drush commands with `ddev drush ...`. For Lando: `lando drush ...`.
- Step 2 creates everything in `web/themes/custom/SUBTHEME_NAME/` — including `webpack.mix.js`, `package.json`, `src/`, `components/`, an empty `templates/`, and the `.env.example` referenced in step 7.

## DDEV setup

Two parts: (1) make Node available inside the DDEV web container, (2) optionally wrap `npm run watch` as a DDEV custom command.

### Node in DDEV

In your DDEV `config.yaml` (or via `ddev config`):

```yaml
nodejs_version: "20"   # or whatever your .nvmrc requires
```

Then:

```bash
ddev restart
ddev nvm install lts/jod    # or `ddev nvm install <version>` matching your .nvmrc
```

### `ddev theme:watch` custom command (optional but nice)

Create `.ddev/commands/web/watch` (no file extension) with:

```bash
#!/bin/bash
## Description: Run npm watch in a theme directory
## Usage: theme:watch THEME_NAME
## Example: ddev theme:watch acme

if [ -z "$1" ]; then
  echo "Error: theme name required. Usage: ddev theme:watch THEME_NAME"
  exit 1
fi

THEME_PATH="web/themes/custom/$1"

if [ ! -d "$THEME_PATH" ]; then
  echo "Error: theme not found at $THEME_PATH"
  exit 1
fi

cd "$THEME_PATH"

# Honor the subtheme's .nvmrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
nvm use

npm run watch
```

Make it executable: `chmod +x .ddev/commands/web/watch`. Then:

```bash
ddev theme:watch SUBTHEME_NAME
```

For the original write-up: https://www.kentr.net/post/drupal-radix-sub-theme-browsersync-ddev.

## npm scripts

Defined in `package.json`. The exact set may shift between Radix patches, but these are the conventional ones:

| Script | What it does |
| --- | --- |
| `npm run watch` | Laravel Mix watches `src/` and `components/`, compiles SCSS → `build/css/`, JS → `build/js/`. BrowserSync proxies `DRUPAL_BASE_URL` and live-reloads on save. |
| `npm run production` | One-shot minified, hashed build. Use for deploys. |
| `npm run dev` | One-shot non-minified build (no watcher). Use when you want fresh assets without a long-running process. |
| `npm run biome` *(if defined)* | Run BiomeJS lint + format checks. |

## webpack.mix.js (Laravel Mix)

The shipped `webpack.mix.js` is intentionally small. It typically:

1. Sets a public path (`build/`).
2. Compiles `src/scss/style.scss` → `build/css/style.css`.
3. Compiles `src/js/main.scripts.js` → `build/js/main.scripts.js`.
4. Iterates over `components/*/` to compile each component's `.scss` and `_*.js` into the component folder.
5. Copies static assets (fonts, images) from `src/assets/` to `build/`.

You rarely need to edit this. Common edits when you do:

- **Add a new entry file:** call `mix.sass()` or `mix.js()` for the new source path.
- **Add cache-busting hashes in production:** `mix.version()` (off by default — interacts with Drupal's own cache layer).
- **Add a PostCSS plugin:** chain `.options({ postCss: [...] })`.

If you make changes, restart `npm run watch`.

## .env.local

```
DRUPAL_BASE_URL=https://mysite.ddev.site
# BROWSERSYNC_PORT=3000    # optional override
# BROWSERSYNC_PROXY_TIMEOUT=60000   # optional
```

`.env.example` is committed; `.env.local` is gitignored. The Mix config reads `.env.local` for BrowserSync's proxy target. Mismatching `http`/`https` or port causes the browser tab to load but stop auto-reloading — the most common BrowserSync gotcha.

## BiomeJS

`biome.json` ships pre-configured. The shipped defaults are sensible — don't reach for `.eslintrc` or Prettier unless you have a reason. To run manually:

```bash
npx biome check src/        # lint
npx biome format --write src/   # format
```

Install the VSCode extension and Biome will lint/format on save automatically. JetBrains has a [Biome plugin](https://plugins.jetbrains.com/plugin/22761-biome) too.

## Development mode (Twig debug + cache off)

Run these once per Drupal install when you start active subtheme work:

```bash
# 1) Copy default services to a local override
cp web/sites/default/default.services.yml web/sites/default/services.yml

# 2) Enable Twig debug + disable Twig cache
# Edit web/sites/default/services.yml — under `parameters: twig.config:`
#   debug: true
#   auto_reload: true
#   cache: false

# 3) Optionally disable render and dynamic_page caches in settings.local.php
# (See sites/example.settings.local.php for the canonical snippets.)

# 4) Clear caches
drush cr
```

With debug on, every rendered element shows up in HTML comments with template suggestions:

```html
<!-- FILE NAME SUGGESTIONS:
   * card--article.html.twig
   * card--node.html.twig
   x card.html.twig
-->
```

Turn debug *off* before deploying to production — it adds overhead.

## Production build

```bash
cd web/themes/custom/SUBTHEME_NAME
npm ci                 # install exactly what's in package-lock.json
npm run production     # minified, hashed assets in build/
```

Commit `build/` to your repo if your deploy pipeline doesn't run npm. Otherwise add `build/` to `.gitignore` and run `npm ci && npm run production` in CI/CD.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `drush radix:create` says command not found | Drush can't see the Radix package | Use the full `--include=` path or run after `drush cc drush` |
| `nvm use` errors with "no version" | The pinned Node isn't installed | Run `nvm install` first |
| BrowserSync loads but doesn't reload | `DRUPAL_BASE_URL` mismatch | Compare the URL in your address bar character-by-character with `.env.local` |
| `Cannot find module '...'` after npm install | Stale `node_modules` | `rm -rf node_modules package-lock.json && npm install` |
| Component changes don't appear | Drupal cache | `drush cr`; check Twig debug suggestions |
| 500 on enable | PHP version too low | Confirm PHP `^8.1` |

## See also

- `subtheme-anatomy.md` — what each file/folder in your new subtheme does
- `components-guide.md` — how SDC components work
- `migration.md` — moving from Radix 5.x to 6.x
