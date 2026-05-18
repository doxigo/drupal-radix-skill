# tooltips

Bootstrap tooltip integration triggered via data attributes and JavaScript initialization. **There is no Twig include for this component** — apply data attributes to your existing markup.

## Required attributes

| Attribute | Value | Description |
| --- | --- | --- |
| `data-bs-toggle` | `"tooltip"` | Marks the element as a tooltip trigger |
| `data-bs-title` | string | Tooltip text shown on hover/focus |

## Optional attributes

| Attribute | Value | Description |
| --- | --- | --- |
| `data-bs-placement` | `"top"` / `"right"` / `"bottom"` / `"left"` | Tooltip position |
| `data-bs-html` | `"true"` | Allow HTML inside the tooltip |
| `data-bs-delay` | int or `{show: N, hide: N}` | Show/hide delay (ms) |
| `data-bs-trigger` | `"hover focus"` (default) / `"click"` / `"manual"` | What triggers the tooltip |

## Example

```twig
<a href="#"
   data-bs-toggle="tooltip"
   data-bs-placement="top"
   data-bs-title="Helpful hint">
  {{ 'Hover me'|t }}
</a>
```

### Initialize in JavaScript

```javascript
// In src/js/_bootstrap.js (already present — uncomment to enable):
import Tooltip from 'bootstrap/js/dist/tooltip';

document.querySelectorAll('[data-bs-toggle="tooltip"]')
  .forEach((el) => new Tooltip(el));
```

Or as a Drupal behavior:

```javascript
((Drupal, once) => {
  Drupal.behaviors.tooltips = {
    attach(context) {
      once('tooltip', '[data-bs-toggle="tooltip"]', context).forEach((el) => {
        new bootstrap.Tooltip(el);
      });
    },
  };
})(Drupal, once);
```

## Gotchas

- Tooltips are **opt-in for performance** — they won't appear until you initialize them in JavaScript.
- There is **no `radix:tooltip` SDC component** — this is purely an HTML + JS integration.
- Positioning depends on Floating UI (formerly Popper). Verify it's bundled in your Bootstrap JS.
- For links with tooltips, always provide visible text as well — tooltips are *not* a substitute for accessible labels.

## Underlying Bootstrap

Bootstrap 5.3 Tooltips — https://getbootstrap.com/docs/5.3/components/tooltips/
