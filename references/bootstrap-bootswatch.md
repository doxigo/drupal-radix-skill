# Bootstrap variables & Bootswatch

Radix ships Bootstrap 5.3. You customize the look via `src/scss/_variables.scss` overrides, optionally augmented with a Bootswatch theme. This page covers both, plus the supporting tools.

## How variable overrides work

Bootstrap is a Sass library. Every color, spacing value, border radius, shadow — all of it is a Sass variable. To change the look without forking Bootstrap, you override the variables *before* Bootstrap's source is `@import`-ed.

The order matters: variable assignments must come *before* the Bootstrap `@import` in your main entry SCSS. The shipped `src/scss/style.scss` already wires this up — you just edit `_variables.scss`.

### A minimal customization

```scss
// src/scss/_variables.scss

// Brand colors
$primary:   #0a58ca;
$secondary: #6c757d;
$success:   #198754;
$danger:    #dc3545;
$warning:   #ffc107;
$info:      #0dcaf0;

// Typography
$font-family-sans-serif: "Inter", system-ui, sans-serif;
$font-family-monospace:  "JetBrains Mono", monospace;
$font-size-base:         1rem;

// Spacing scale
$spacer: 1.25rem;

// Border radius
$border-radius:    .375rem;
$border-radius-sm: .25rem;
$border-radius-lg: .5rem;

// Enable / disable features
$enable-shadows:       true;
$enable-gradients:     false;
$enable-rounded:       true;
$enable-rfs:           true;
$enable-dark-mode:     true;
```

After saving, the watcher rebuilds `build/css/style.css` and BrowserSync reloads. If you don't see changes, hard-reload (Cmd-Shift-R) and check `npm run watch` is still running.

The canonical list of all Bootstrap 5.3 variables lives in `node_modules/bootstrap/scss/_variables.scss`. Copy any you need into `_variables.scss` and change the value.

## Bootstrap Build (bootstrap.build)

[bootstrap.build](https://bootstrap.build/) is a free web tool that generates a `_variables.scss` file from a visual editor. Useful when:

- You have a design system spec and want to plug in colors/typography quickly.
- You're prototyping multiple looks and want to swap whole variable sets.
- You're not comfortable hand-editing SCSS yet.

Workflow:

1. Open https://bootstrap.build/.
2. Use the UI to tweak colors, fonts, spacing, etc.
3. Export the SCSS variables file.
4. Paste into `src/scss/_variables.scss` (or save it directly).

Limitation: it only sets variables. Theme-specific patterns that depend on utility classes or markup (like a custom navbar layout) still need component-level work.

## Bootswatch

[Bootswatch](https://bootswatch.com/) is a collection of pre-built Bootstrap variable themes — Cerulean, Cosmo, Cyborg, Darkly, Flatly, Journal, Litera, Lumen, Lux, Materia, Minty, Morph, Pulse, Quartz, Sandstone, Simplex, Sketchy, Slate, Solar, Spacelab, Superhero, United, Vapor, Yeti, Zephyr.

### How to apply a Bootswatch theme to your Radix subtheme

1. **Browse to a theme on bootswatch.com.**
2. **Download `_variables.scss`** (click the chevron menu on the theme's page).
3. **Paste its contents into your `src/scss/_variables.scss`**, replacing what's there. Or merge selectively.
4. **Optionally also download `_bootswatch.scss`** (some additional rules beyond just variables). Place it in `src/scss/` and import it from `style.scss` *after* Bootstrap:

   ```scss
   // src/scss/style.scss (excerpt)
   @import 'variables';                              // your _variables.scss
   @import '../../node_modules/bootstrap/scss/bootstrap';
   @import 'bootswatch';                             // _bootswatch.scss (Bootswatch extras)
   @import 'base/typography';
   // ...
   ```

5. **Run `drush cr`** if cached aggressively. Hard-refresh the browser.

### Bootswatch caveat

Bootswatch variables set colors and generate utility classes. They **do not** alter markup. If you compare a Bootswatch demo to your site and find the navbar looks different, it's usually because the demo HTML uses extra utility classes that your Drupal output doesn't. Solution: pass those classes via the appropriate `*_utility_classes` prop:

```twig
{% include 'radix:navbar' with {
  navbar_utility_classes: ['navbar-dark', 'bg-primary', 'shadow-sm'],
  ...
} %}
```

Or — if it's structural — override the navbar component (`references/components-guide.md` → *Overriding*).

## Dark mode

Bootstrap 5.3 ships first-class dark-mode support via `data-bs-theme="dark"` on a parent element (often `<html>`).

```scss
// _variables.scss
$enable-dark-mode: true;
```

Toggle via JS or a Drupal preference:

```javascript
document.documentElement.setAttribute('data-bs-theme', userPrefersDark ? 'dark' : 'light');
```

You can also scope it: `<div data-bs-theme="dark">...</div>` flips just that subtree.

For full theming control, override the `[data-bs-theme="dark"]` variable map:

```scss
[data-bs-theme="dark"] {
  --bs-body-bg: #0d1117;
  --bs-body-color: #c9d1d9;
}
```

## Utility classes vs. variable overrides

Decision matrix:

| Change | Best approach |
| --- | --- |
| Pick a primary color | `$primary` in `_variables.scss` |
| Make all buttons larger | `$btn-padding-y-lg` / `$btn-padding-x-lg` (and use `size: 'lg'`) |
| One specific button needs `mt-4` | `button_utility_classes: ['mt-4']` |
| Change spacing scale | `$spacer` in `_variables.scss` |
| One card needs a shadow | `card_utility_classes: ['shadow']` |
| All cards always need a shadow | `$card-box-shadow` if defined, else override the `card` component |
| Custom layout pattern | Compose with utility classes; if reused 3+ times, make a component |

## PostCSS and autoprefixer

Mix runs PostCSS with autoprefixer by default — vendor prefixes are added automatically based on the `browserslist` in `package.json`. If yours is missing:

```json
{
  "browserslist": [
    "> 0.5%",
    "last 2 versions",
    "Firefox ESR",
    "not dead"
  ]
}
```

## Cache busting (`mix.version()`)

If you want hashed asset filenames in production:

```javascript
// webpack.mix.js
if (mix.inProduction()) {
  mix.version();
}
```

Trade-off: hashed filenames bypass aggressive browser caches, but they also interact with Drupal's render cache. If you toggle this on after launch, do a full `drush cr` and a CDN purge if applicable.

## Common pitfalls

- **Variables not applying:** assignments must come *before* the Bootstrap `@import`. Check `style.scss`.
- **Bootswatch looks wrong:** make sure you also imported `_bootswatch.scss` if the theme ships one.
- **Dark mode colors stuck:** Bootstrap CSS variables are scoped to `[data-bs-theme]`. The toggle has to set that attribute, not just a class.
- **Variable change requires a `drush cr`:** unlikely — variables affect compiled CSS, not Drupal's render layer. If you see this, the issue is browser cache, not Drupal.

## See also

- `setup-and-build.md` — Mix pipeline details
- `subtheme-anatomy.md` — where `_variables.scss` lives in the tree
- [Bootstrap 5.3 customize docs](https://getbootstrap.com/docs/5.3/customize/sass/)
- [Bootswatch repo](https://github.com/thomaspark/bootswatch)
- [bootstrap.build](https://bootstrap.build/)
