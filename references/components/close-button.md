# close-button

Bootstrap's `.btn-close` element used to dismiss alerts, toasts, modals, and offcanvas surfaces.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | string | `''` | Bootstrap size class (e.g. `'btn-sm'`) |
| `disabled` | boolean | `false` | Disabled state |
| `close_button_attributes` | Attribute | — | Create via `create_attribute()` and add Bootstrap dismiss attrs |

## Slots

None — the button is purely the close glyph.

## Example

### Dismiss a modal

```twig
{% include 'radix:close-button' with {
  size: 'btn-sm',
  disabled: false,
  close_button_attributes: create_attribute()
    .setAttribute('data-bs-dismiss', 'modal'),
} %}
```

### Dismiss a toast

```twig
{% include 'radix:close-button' with {
  close_button_attributes: create_attribute()
    .setAttribute('data-bs-dismiss', 'toast'),
} %}
```

## Gotchas

- You **must** set `data-bs-dismiss` (e.g. `'modal'`, `'toast'`, `'alert'`, `'offcanvas'`) via `close_button_attributes`. The component does not infer the dismiss target.
- The button has no visible label — rely on Bootstrap's built-in `aria-label="Close"`. Don't strip it.

## Underlying Bootstrap

Bootstrap 5.3 Close button — https://getbootstrap.com/docs/5.3/components/close-button/
