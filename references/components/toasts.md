# toasts

Renders one or more Bootstrap toast notifications with header, body, autohide, and optional action buttons.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `toasts` | array | — | **Required.** Array of toast definitions (see *Item shape*) |
| `container_classes` | string | — | Container positioning classes — e.g. `'position-fixed bottom-0 end-0 p-3'` |

### Item shape (per-toast)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `header` | object | — | `{ title, subtitle, classes }` |
| `body` | string | — | Toast body content |
| `role` | string | — | ARIA role for the toast |
| `autohide` | boolean | `true` | Toast hides automatically after `delay` |
| `delay` | int | — | Auto-hide delay in milliseconds |
| `with_body_wrapper` | boolean | — | Wraps body content in an additional wrapper |
| `with_close` | boolean | — | Renders a close button |
| `attributes` | object | — | Custom HTML attributes (`id`, classes, etc.) |
| `additional_buttons` | array | — | Action buttons: `{ text, color, outline, button_utility_classes }` |

## Slots

None — content passed via props.

## Examples

### Basic success toast

```twig
{% include 'radix:toasts' with {
  toasts: [
    {
      header: { title: 'Success'|t, subtitle: 'just now'|t, classes: '' },
      body: 'Your invoice was sent.'|t,
      autohide: false,
      with_close: true,
    },
  ],
  container_classes: 'position-fixed bottom-0 end-0 p-3',
} %}
```

### Toast with action buttons

```twig
{% include 'radix:toasts' with {
  toasts: [{
    body: 'Save your changes?'|t,
    autohide: false,
    with_close: true,
    additional_buttons: [
      { text: 'Save'|t,   color: 'primary',   outline: false },
      { text: 'Cancel'|t, color: 'secondary', outline: true },
    ],
  }],
} %}
```

## Gotchas

- Toasts **auto-hide** by default — set `autohide: false` for sticky toasts.
- JavaScript initialization is required. Uncomment the toast init in `src/js/_bootstrap.js` (or call `Toast.getOrCreateInstance()` manually after the toast is in the DOM).
- For trigger-button patterns the trigger's `data-bs-target` and the toast `id` must match.
- For showing toasts at page load, query `.toast` elements and call `.show()` on each.

## Underlying Bootstrap

Bootstrap 5.3 Toasts — https://getbootstrap.com/docs/5.3/components/toasts/
