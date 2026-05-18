# alerts

Contextual feedback messages (Bootstrap alerts) with optional heading and dismiss button.

**Include name is `radix:alert` (singular)**, even though the docs page is `alerts.md`.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | — | Variant: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` |
| `heading` | string | — | Optional heading rendered above the content |
| `dismissible` | boolean | `false` | Render a close button so the alert can be dismissed |
| `alert_utility_classes` | array | `[]` | Additional Bootstrap/utility classes |
| `content` | string | — | Main alert body (text or HTML) |

## Slots

None — content arrives via the `content` prop.

## Examples

### Basic

```twig
{% include 'radix:alert' with {
  type: 'danger',
  heading: 'Important Notice!',
  dismissible: true,
  alert_utility_classes: ['mb-4', 'shadow-sm'],
  content: 'This is an important alert message. Please pay attention!',
} %}
```

### Inline, non-dismissible

```twig
{% include 'radix:alert' with {
  type: 'info',
  content: 'You have new messages.',
} %}
```

## Gotchas

- Include name is **`radix:alert`** (singular), not `radix:alerts`.
- `dismissible: true` requires Bootstrap's JS to be loaded for the close button to actually dismiss.
- `content` is treated as raw HTML — sanitize untrusted input upstream (use `|t` or Twig's autoescape).

## Underlying Bootstrap

Bootstrap 5.3 Alerts — https://getbootstrap.com/docs/5.3/components/alerts/
