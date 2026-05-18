---
name: drupal-radix-skill
description: Use the Radix theme for Drupal in Drupal 11 projects that use Radix 6.x. It covers Bootstrap 5 subthemes, Single Directory Components (SDC), 50+ pre-built components, and the `drupal-radix-cli` tool. Trigger on subtheme creation with `drush radix:create`, Twig includes like `{% include 'radix:component' with {...} %}`, custom SDC scaffolding, shipped-component overrides, `_variables.scss` and Bootswatch work, `webpack.mix.js` and BrowserSync setup, and 5.x to 6.x migration work. Also trigger on mentions of `drupal-radix-cli`, Radix subthemes, `radix:create`, `*_utility_classes`, or any Radix shipped component in a Drupal context. Not for Radix UI or Radix Themes for React.
---

# Drupal Radix Theme

Radix is a contributed Drupal base theme for Drupal 11 that ships Bootstrap 5.3, a `drush radix:create` subtheme generator, a `drupal-radix-cli` npm tool, and 50+ Single Directory Components (SDC) you compose in Twig. This skill teaches Claude how to scaffold subthemes, use and override shipped components, build new SDC components in the Radix style, and migrate older subthemes forward.

The project lives at https://www.drupal.org/project/radix; docs are at https://docs.trydrupal.com/radix. The maintainer is Ramsalt; the issue queue is on drupal.org.

## When you're working on…

Pick the branch that matches the user's request. Each one points at the reference file with the actual content.

- **A new Radix subtheme (install, generate, dev server)** → [references/setup-and-build.md](references/setup-and-build.md)
- **Anatomy of a subtheme (what each file/folder does)** → [references/subtheme-anatomy.md](references/subtheme-anatomy.md)
- **Adding a shipped component to a template** → look up the component in [references/components/](references/components/) (alphabetical, one file each — start with [components/index.md](references/components/index.md) if you don't know the exact name)
- **Overriding a shipped component to change its markup** → [references/components-guide.md](references/components-guide.md) → _Overriding_ section
- **Scaffolding a new custom SDC component** → [references/components-guide.md](references/components-guide.md) → _Creating components_ section. Use `drupal-radix-cli generate` when possible; otherwise scaffold from [assets/component-template/](assets/component-template/)
- **Bootstrap variables or Bootswatch theming** → [references/bootstrap-bootswatch.md](references/bootstrap-bootswatch.md)
- **`drupal-radix-cli` commands and flags** → [references/cli.md](references/cli.md)
- **Migrating an older subtheme (5.x → 6.x)** → [references/migration.md](references/migration.md)
- **Anything else from the official docs** → `WebFetch` `https://docs.trydrupal.com/radix/<path>.md?ask=<your-question>` — the docs site exposes an LLM-backed Q&A endpoint via the `ask` query parameter

Don't load reference files speculatively. Load only the branch that matches the work.

## Core concepts

These are the four ideas the rest of the skill assumes you understand. Skim them once, then jump into the matching reference file.

### 1. Subtheme inheritance

A Radix project has two theme directories:

- `web/themes/contrib/radix/` — the parent theme installed via Composer. **Never edit.** Composer updates will overwrite it.
- `web/themes/custom/<SUBTHEME>/` — your subtheme, generated once via `drush radix:create`. **Edit here.**

Your subtheme's `.info.yml` declares `base theme: radix`, so anything you don't override is inherited from the parent. The same logic applies to SDC components: if a Twig template includes `radix:button`, Drupal looks first in your subtheme's `components/button/` folder; if it isn't there, it falls back to the parent's `components/button/`. That fallback is why overriding a component is "copy it into your subtheme, then edit." See `references/subtheme-anatomy.md` for the full file layout.

### 2. Single Directory Components (SDC)

Each component is a self-contained folder with five files:

```
components/<name>/
├── <name>.twig                # the template
├── <name>.component.yml       # name, props, slots, schema (REQUIRED, even if empty)
├── <name>.scss                # styles — compiled to <name>.css by Mix
├── _<name>.js                 # source JS (leading underscore) — built to <name>.js
└── README.md                  # docs + example usage
```

You include a component anywhere in Twig with `{% include 'radix:<name>' with { prop: value } %}`. The `radix:` namespace is registered by the parent theme; your subtheme registers `<SUBTHEME>:` for its own components. Don't try to call `radix:foo` and expect it to pick up your subtheme override — _the same name resolves to your subtheme automatically_ because SDC walks the theme inheritance chain. See `references/components-guide.md` for the full schema and override workflow.

### 3. The `*_utility_classes` convention

Every Radix component accepts an array prop like `button_utility_classes`, `card_utility_classes`, `accordion_utility_classes`, etc. This is how you pass Bootstrap utility classes (`mt-3`, `text-center`, `col-md-4`) _without_ editing the component itself. Always prefer this over copying-and-modifying the component just to add a class.

```twig
{% include 'radix:button' with {
  color: 'primary',
  content: 'Submit',
  button_utility_classes: ['mt-3', 'w-100'],
} %}
```

### 4. Build pipeline

The dev loop is Laravel Mix (`webpack.mix.js`) + BrowserSync + BiomeJS:

- `npm run watch` — compile SCSS/JS on save, auto-reload the browser at the URL in `.env.local`'s `DRUPAL_BASE_URL`.
- `npm run production` — minified, hashed assets for deploy. Output goes to `build/`.
- BiomeJS handles linting and formatting (`npm run biome` if configured). Set up the [Biome VSCode extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for the best DX.

You almost never edit `webpack.mix.js` for normal work — adding npm packages to `package.json` as `devDependency` and writing SCSS/JS in `src/` is enough. See `references/setup-and-build.md` for the full pipeline.

## Quick workflows

### Create a new subtheme (most common starting point)

```bash
# In your Drupal project root:
composer require 'drupal/radix:^6.0'
drush --include="web/themes/contrib/radix" radix:create acme   # creates web/themes/custom/acme/
drush theme:enable acme
drush config:set system.theme default acme -y

cd web/themes/custom/acme
nvm use                        # uses the .nvmrc shipped with the subtheme
npm install
cp .env.example .env.local     # edit DRUPAL_BASE_URL to your local site URL
npm run watch                  # dev mode with BrowserSync
```

For DDEV/Lando, prefix the drush commands (`ddev drush ...`). For DDEV-specific Node setup, see `references/setup-and-build.md`.

### Add a shipped component to a Drupal template

Find the component in `references/components/<name>.md` to get its props/slots. Then in any Twig template:

```twig
{# In templates/node--article.html.twig — render the article as a Radix card #}
{% include 'radix:card' with {
  card_title_tag: 'h2',
  card_title: label,
  card_body: content.body,
  card_image_src: content.field_image,
  card_image_cap: 'top',
  card_link_url: url,
  card_link_text: 'Read more'|t,
  card_utility_classes: ['mb-4'],
} %}
```

### Override a shipped component

```bash
cd web/themes/custom/acme
# Option A: use the CLI (recommended — auto-updates internal references)
npx drupal-radix-cli add
# select the component (e.g. navbar) from the interactive prompt

# Option B: manual
cp -r ../../contrib/radix/components/navbar components/
# Now edit components/navbar/navbar.twig however you need. SDC will pick up
# the override automatically because SDC walks the theme inheritance chain.
```

After overriding, run `drush cr` to clear caches. If you used a custom name (e.g. `navbar-acme`) instead of `navbar`, update Twig includes from `radix:navbar` to `acme:navbar-acme` in your templates.

### Scaffold a new custom component

```bash
cd web/themes/custom/acme
npx drupal-radix-cli generate
# follow prompts — produces components/<name>/ with all five files
```

Then `{% include 'acme:<name>' with { ... } %}` in any template. Full schema and best practices in `references/components-guide.md`.

## Working with the docs site

The official docs at `https://docs.trydrupal.com/radix/<path>.md` accept a `?ask=<question>` query parameter that returns an LLM-generated answer based on the page content. Use this as a fallback whenever the reference files in this skill don't cover what you need:

```
WebFetch https://docs.trydrupal.com/radix/components/modal.md?ask=how do I make a fullscreen modal on mobile only
WebFetch https://docs.trydrupal.com/radix/misc/migration-and-upgrading.md?ask=do I need to update my libsass to dart-sass
```

The `.md` suffix returns plain Markdown (cleaner for parsing). The `?ask=` parameter is the canonical Radix-docs-LLM interface.

## Component reference index

Quick lookup. Full per-component docs in `references/components/<name>.md`.

**Layout & structure:** page, page-content, page-footer, page-navigation, page-title, region, html, block, node, heading

**Forms:** form, form-element, form-element-label, form-element-radio-checkbox, fieldset, field, input, select, textarea, radios

**Navigation:** navbar, navbar-brand, nav, nav-item, breadcrumb, pagination, dropdown-menu, local-tasks

**Content display:** card, accordion, alerts, badge, list-group, table, figure, image, media, progress, spinners

**Interactive:** modal, offcanvas, carousel, collapse, details, button, button-group, close-button, tooltips, toasts

**Drupal-specific:** comment, field-comment, taxonomy, user, views-view, views-view-grid, views-view-table, views-view-unformatted

## Working notes

- **Always edit in `web/themes/custom/<SUBTHEME>/`.** Never touch `web/themes/contrib/radix/`. Composer overwrites the latter on update.
- **After Twig template changes:** `drush cr` (or `ddev drush cr`). Twig caches aggressively.
- **After `.component.yml` changes:** `drush cr` is required for SDC to pick up new props/slots.
- **For active dev:** enable Twig debug + disable render cache. See `references/setup-and-build.md` → _Development mode_.
- **`npm run watch` not reloading the browser?** Verify `DRUPAL_BASE_URL` in `.env.local` matches the URL you're actually visiting (including the port, e.g. `http://acme.ddev.site` vs `https://acme.ddev.site`).
- **Component utility classes vs. CSS overrides:** prefer `<name>_utility_classes: ['my-class']` for one-off tweaks. Drop to `.scss` only when the change is structural.

## See also

- **drupal-frontend skill** — generic Drupal theming (Twig syntax, preprocess functions, libraries, breakpoints) — use it for theme-agnostic work; use _this_ skill for anything Radix-specific
- **drupal-development skill** — module/backend development, hooks, services
- **drupal-security skill** — secure rendering, XSS-safe Twig, access checks
- **Official docs** — https://docs.trydrupal.com/radix
- **Issue queue** — https://www.drupal.org/project/issues/radix
- **drupal-radix-cli** — https://github.com/doxigo/drupal-radix-cli
