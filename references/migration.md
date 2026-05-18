# Migration & upgrading

How to move a Radix subtheme to a newer major version. Most projects today are migrating **5.x → 6.x**, which is also a Bootstrap 4 → 5 jump and a Libsass → Dart Sass jump. This page focuses on that path.

For minor/patch upgrades (e.g. 6.0 → 6.1), `composer update drupal/radix` + `drush cr` is usually enough; the rest of this page doesn't apply.

## Strategy

Radix's official guidance: **do a fresh subtheme alongside the old one, port custom work over.** Don't try to mutate the 5.x subtheme in place — the directory layout, component model (SDC didn't exist in 5.x), and Bootstrap class names are all different enough that it's slower to fix than to rebuild.

Run both in parallel during the port:

```
web/themes/custom/
├── acme/        # old 5.x subtheme — keep running
└── acme_v6/     # new 6.x subtheme — built up incrementally
```

Switch the active theme at the end when `acme_v6` reaches parity.

## High-level checklist

1. **Bump Drupal core** to `^10.1`.
2. **`composer require 'drupal/radix:^6.0'`** alongside the old version (if Composer allows two majors, otherwise upgrade in one step).
3. **Generate a fresh subtheme:** `drush --include="web/themes/contrib/radix" radix:create acme_v6`.
4. **Move Bootstrap variables.** Copy your old `_variables.scss` into the new subtheme's `src/scss/_variables.scss`. Resolve deprecated variable names (see *Bootstrap 4 → 5* below).
5. **Re-create your custom components as SDC.** Each old custom component becomes a folder under `components/<name>/` with the five-file shape (see `components-guide.md`).
6. **Port `.theme` hooks.** Drop your old `preprocess_*`, `theme_suggestions_*_alter`, etc. into `includes/*.theme` files. PHP syntax is the same; double-check Drupal 10 API deprecations.
7. **Update Twig includes.** `{% include '@radix/component.twig' %}` → `{% include 'radix:component' with { props... } %}`. The namespace prefix and the `with { ... }` props pattern are SDC-style.
8. **Replace Bootstrap 4 classes with 5.** See cheat sheet below.
9. **Remove jQuery dependencies.** Bootstrap 5 dropped jQuery; ditch any `jQuery.*` code unless you genuinely need it.
10. **Switch from Libsass to Dart Sass.** Should happen automatically with a fresh `npm install` against the new `package.json`. If you have custom Sass that relies on Libsass-only syntax (rare), update it.
11. **Update `webpack.mix.js`** — the new shipped one already does the right thing. Diff your old custom Mix tweaks against it and re-apply only what's still needed.
12. **Test thoroughly,** then `drush config:set system.theme default acme_v6 -y` and disable the old theme.

## Bootstrap 4 → 5: class cheat sheet

| Bootstrap 4 | Bootstrap 5 |
| --- | --- |
| `ml-*`, `mr-*`, `pl-*`, `pr-*` | `ms-*`, `me-*`, `ps-*`, `pe-*` (start/end, RTL-friendly) |
| `float-left`, `float-right` | `float-start`, `float-end` |
| `text-left`, `text-right` | `text-start`, `text-end` |
| `border-left`, `border-right` | `border-start`, `border-end` |
| `rounded-left`, `rounded-right` | `rounded-start`, `rounded-end` |
| `dropleft`, `dropright` | `dropstart`, `dropend` |
| `data-toggle`, `data-target`, `data-dismiss`, etc. | `data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`, etc. (`bs-` prefix) |
| `.no-gutters` | `.g-0` |
| `.form-row` | `.row .g-2` (or another gutter) |
| `.form-group` | removed — use spacing utilities directly (`.mb-3`) |
| `.form-inline` | removed — use `.row` + grid |
| `.custom-control`, `.custom-checkbox`, `.custom-radio` | merged into standard `.form-check` |
| `.custom-select` | `.form-select` |
| `.custom-file` | `.form-control` with `type="file"` |
| `.input-group-prepend`, `.input-group-append` | removed — add `.input-group-text` directly inside `.input-group` |
| `.badge-*` (color variants) | `.badge.bg-*` and `.badge.text-bg-*` |
| `.close` | `.btn-close` |
| `.media` | removed — use flex utilities |
| `.jumbotron` | removed — use utilities (`.p-5 .bg-light .rounded`) |
| `.card-deck`, `.card-columns` | use grid (`.row-cols-*`) |
| `.font-weight-*` | `.fw-*` |
| `.font-italic` | `.fst-italic` |
| `.text-monospace` | `.font-monospace` |
| `.text-hide` | removed — use accessible alternative |
| `.embed-responsive` | `.ratio` |
| `.sr-only`, `.sr-only-focusable` | `.visually-hidden`, `.visually-hidden-focusable` |

For full coverage: https://getbootstrap.com/docs/5.3/migration/.

## Removing jQuery

Bootstrap 5 ships vanilla-JS components — no jQuery needed. Audit your old custom JS for jQuery usage and rewrite to modern DOM APIs:

```javascript
// Old
jQuery(document).on('click', '.my-button', function () {
  jQuery(this).toggleClass('active');
});

// New
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.my-button');
  if (btn) btn.classList.toggle('active');
});
```

If you genuinely need jQuery (some old contrib modules still bundle dependencies on it), add `core/jquery` to the relevant library — but don't add it globally if you don't have to.

## Twig include syntax changes

Radix 5 used template partials in `templates/_partials/`:

```twig
{# Radix 5 #}
{% include '@radix/components/button.twig' with { variant: 'primary', text: 'Submit' } %}
```

Radix 6 uses SDC namespacing:

```twig
{# Radix 6 #}
{% include 'radix:button' with {
  color: 'primary',
  content: 'Submit',
} %}
```

Differences to watch for:

- Namespace: `@radix/components/...` → `radix:...`
- Prop names: many shifted (e.g. `text` → `content`, `variant` → `color`). Check `references/components/<name>.md` for the current names.
- Slots: SDC slots are filled with `{% embed %}` + `{% block slotname %}` rather than passing markup as a prop.

## Component model

In 5.x, components were Twig partials with no schema validation. In 6.x they're SDC: a folder, a `.component.yml`, and validated props. Porting a custom 5.x component:

1. Create `components/<name>/` (in the new subtheme).
2. Move the old Twig markup into `components/<name>/<name>.twig`. Adjust references — slots become `{{ block_name }}` or named blocks via `{% block %}`, depending on whether they're called from `include` or `embed`.
3. Create `components/<name>/<name>.component.yml`. Declare each variable the component reads as either a `prop` (primitive) or a `slot` (markup). See `components-guide.md`.
4. Move CSS into `components/<name>/<name>.scss`.
5. Move JS into `components/<name>/_<name>.js`.
6. Write a brief `README.md`.
7. `drush cr`.

## Libsass → Dart Sass

The shipped 6.x `package.json` already uses `sass` (Dart Sass) rather than `node-sass` (Libsass binding). Fresh `npm install` against the new `package.json` is enough.

Syntax differences that can bite:

- `@import` is being phased out in favor of `@use` / `@forward`. Dart Sass still accepts `@import` so this isn't urgent, but new code should prefer `@use`.
- `/` division: Dart Sass deprecates `$a / $b` for division. Use `math.div($a, $b)` (requires `@use 'sass:math';`) or `$a * 0.5` instead of `$a / 2`.
- Some legacy Libsass-only modules don't exist in Dart Sass. If `npm run watch` errors out, the error message usually names the offending file.

## Subtheme info.yml differences

Old (5.x):

```yaml
name: ACME
type: theme
base theme: radix
core_version_requirement: ^9 || ^10
libraries:
  - acme/global-styling
```

New (6.x):

```yaml
name: ACME
type: theme
base theme: radix
core_version_requirement: ^10.1 || ^11
libraries:
  - acme/global-styling
components:
  namespaces:
    acme:
      - components
```

The `components.namespaces` block is the SDC namespace registration. On Drupal 10.3+ this is auto-detected and the block is optional, but keeping it explicit avoids surprises.

## Testing the port

1. **Visual regression first.** Run the old and new themes side-by-side on identical content and compare page-by-page. The biggest source of "looks broken" is Bootstrap 4 → 5 class drift in your custom templates.
2. **Twig debug on.** Use the FILE NAME SUGGESTIONS to confirm your overrides actually match the templates Drupal is rendering.
3. **Forms specifically.** Form markup changed more than anything else in Bootstrap 4 → 5. Re-test every form: inputs, validation states, radios/checkboxes, file uploads, select widgets.
4. **JS behaviors.** Without jQuery, any old behavior that relied on jQuery-specific selectors (`:contains()`, `.not()`, etc.) needs a rewrite.
5. **Dark mode.** If you weren't doing dark mode before, this is the easiest moment to add it — Bootstrap 5.3 supports it natively. See `bootstrap-bootswatch.md` → *Dark mode*.

## Roadmap & future migrations

The Radix roadmap is at https://docs.trydrupal.com/radix/misc/roadmap.md. Watch for:

- Bootstrap 5.x → 6 migration (when Bootstrap 6 ships).
- SDC ecosystem evolution in Drupal core.
- BiomeJS version bumps in the shipped tooling.

## See also

- `setup-and-build.md` — fresh-install workflow you'll repeat for the new subtheme
- `components-guide.md` — SDC structure for porting custom components
- `bootstrap-bootswatch.md` — variable system for the new subtheme
- [Bootstrap 5.3 migration docs](https://getbootstrap.com/docs/5.3/migration/)
- [Dart Sass migrator](https://sass-lang.com/documentation/cli/migrator/)
