# Component reference index

All 55 components shipped by Radix 6.x, alphabetical. One file per component with props, slots, Twig examples, and gotchas. Load only the file(s) you need.

## How to use

Each file is structured the same way:

1. **Props** — typed table with name, type, default, description.
2. **Slots** — Twig blocks (used via `{% embed %}`).
3. **Examples** — copy-pasteable Twig.
4. **Gotchas** — naming quirks (e.g. `radix:alert` is singular even though the page is `alerts.md`), required JS init, etc.
5. **Underlying Bootstrap** — link to the Bootstrap 5.3 docs.

When the docs are thin for a component, the file says so and points you at the SDC source (`web/themes/contrib/radix/components/<name>/`) or the docs `?ask=` endpoint.

## Naming gotchas (READ THIS FIRST)

The docs page name and the SDC include name don't always match:

| Docs page | Actual include |
| --- | --- |
| `alerts.md` | `radix:alert` (singular) |
| `buttons.md` | `radix:button` (singular) |
| `spinners.md` | `radix:spinner` (singular) |
| `form-element-label.md` | `radix:form-element--label` (double-dash) |
| `form-element-radio-checkbox.md` | `radix:form-element--radiocheckbox` (double-dash, no hyphen between "radio" and "checkbox") |
| `views-view.md` | check `ls web/themes/contrib/radix/components/` — name varies between `view-view` and `views-view` |
| `views-view-grid.md` | `radix:views-view--grid` (double-dash) |
| `views-view-table.md` | `radix:views-view--table` (double-dash) |
| `views-view-unformatted.md` | `radix:views-view--unformatted` (double-dash) |
| `tooltips.md` | **No SDC** — use data attributes directly |

## Index by category

### Layout & structure

- [page](page.md) — top-level page wrapper
- [page-content](page-content.md) — main content area with container controls
- [page-footer](page-footer.md) — site footer wrapper
- [page-navigation](page-navigation.md) — header navigation region (wraps `radix:navbar`)
- [page-title](page-title.md) — Drupal page-title heading
- [region](region.md) — Drupal region wrapper
- [html](html.md) — top-level HTML document scaffold
- [block](block.md) — Drupal block wrapper
- [node](node.md) — Drupal node wrapper
- [heading](heading.md) — h1–h6 with optional display styling

### Forms

- [form](form.md) — `<form>` wrapper with inline option
- [form-element](form-element.md) — generic form-element wrapper (label, description, errors)
- [form-element-label](form-element-label.md) — standalone `<label>` (note `--label` double-dash)
- [form-element-radio-checkbox](form-element-radio-checkbox.md) — radio/checkbox wrapper (note `--radiocheckbox` double-dash)
- [fieldset](fieldset.md) — `<fieldset>` with legend, description, disabled cascading
- [field](field.md) — Drupal field renderer
- [field-comment](field-comment.md) — comment-form field variant of `radix:field`
- [input](input.md) — `<input>` with controlled class management
- [select](select.md) — `<select>` with optgroup support
- [textarea](textarea.md) — `<textarea>` with `form-control` styling
- [radios](radios.md) — wrapper for a group of radio inputs

### Navigation

- [navbar](navbar.md) — Bootstrap navbar with branding/left/right blocks
- [navbar-brand](navbar-brand.md) — logo + site name inside navbar
- [nav](nav.md) — tabs or pills with alignment/fill/justify
- [nav-item](nav-item.md) — individual nav item (limited public docs — read source)
- [breadcrumb](breadcrumb.md) — `{ text, url }` trail with active item
- [pagination](pagination.md) — multi-page pager
- [dropdown-menu](dropdown-menu.md) — dropdown menu for nav children
- [local-tasks](local-tasks.md) — primary + secondary admin tabs

### Content display

- [card](card.md) — header/body/footer/image/link container
- [accordion](accordion.md) — collapsible content sections
- [alerts](alerts.md) — contextual feedback (note `radix:alert` singular)
- [badge](badge.md) — count/label indicator
- [list-group](list-group.md) — list with numbering/horizontal layout/variants
- [table](table.md) — Bootstrap-styled `<table>`
- [figure](figure.md) — `<figure>` + `<figcaption>` for images
- [image](image.md) — `<img>` with responsive/rounded/thumbnail helpers
- [media](media.md) — Drupal media entity renderer
- [progress](progress.md) — progress bar (striped/animated/stacked)
- [spinners](spinners.md) — loading spinner (note `radix:spinner` singular)

### Interactive

- [modal](modal.md) — dialog with size/centering/scrollable/backdrop options
- [offcanvas](offcanvas.md) — slide-in panel
- [carousel](carousel.md) — slider with controls/indicators/captions
- [collapse](collapse.md) — toggleable content region
- [details](details.md) — native `<details>`/`<summary>` wrapper
- [button](button.md) — Bootstrap button (note `radix:button` singular)
- [button-group](button-group.md) — grouped buttons + radio toggles
- [close-button](close-button.md) — `.btn-close` for modals/toasts/alerts
- [tooltips](tooltips.md) — data-attribute integration (no SDC component)
- [toasts](toasts.md) — toast notifications with header/body/actions

### Drupal-specific

- [comment](comment.md) — Drupal comment wrapper
- [taxonomy](taxonomy.md) — taxonomy term renderer
- [user](user.md) — user profile renderer
- [views-view](views-view.md) — outer Views wrapper
- [views-view-grid](views-view-grid.md) — grid style plugin
- [views-view-table](views-view-table.md) — table style plugin
- [views-view-unformatted](views-view-unformatted.md) — unformatted list style plugin

## Alphabetical index

- [accordion](accordion.md)
- [alerts](alerts.md) → `radix:alert`
- [badge](badge.md)
- [block](block.md)
- [breadcrumb](breadcrumb.md)
- [button](button.md) → `radix:button`
- [button-group](button-group.md)
- [card](card.md)
- [carousel](carousel.md)
- [close-button](close-button.md)
- [collapse](collapse.md)
- [comment](comment.md)
- [details](details.md)
- [dropdown-menu](dropdown-menu.md)
- [field](field.md)
- [field-comment](field-comment.md)
- [fieldset](fieldset.md)
- [figure](figure.md)
- [form](form.md)
- [form-element](form-element.md)
- [form-element-label](form-element-label.md) → `radix:form-element--label`
- [form-element-radio-checkbox](form-element-radio-checkbox.md) → `radix:form-element--radiocheckbox`
- [heading](heading.md)
- [html](html.md)
- [image](image.md)
- [input](input.md)
- [list-group](list-group.md)
- [local-tasks](local-tasks.md)
- [media](media.md)
- [modal](modal.md)
- [nav](nav.md)
- [nav-item](nav-item.md)
- [navbar](navbar.md)
- [navbar-brand](navbar-brand.md)
- [node](node.md)
- [offcanvas](offcanvas.md)
- [page](page.md)
- [page-content](page-content.md)
- [page-footer](page-footer.md)
- [page-navigation](page-navigation.md)
- [page-title](page-title.md)
- [pagination](pagination.md)
- [progress](progress.md)
- [radios](radios.md)
- [region](region.md)
- [select](select.md)
- [spinners](spinners.md) → `radix:spinner`
- [table](table.md)
- [taxonomy](taxonomy.md)
- [textarea](textarea.md)
- [toasts](toasts.md)
- [tooltips](tooltips.md) → no SDC, use data-attributes
- [user](user.md)
- [views-view](views-view.md)
- [views-view-grid](views-view-grid.md) → `radix:views-view--grid`
- [views-view-table](views-view-table.md) → `radix:views-view--table`
- [views-view-unformatted](views-view-unformatted.md) → `radix:views-view--unformatted`
