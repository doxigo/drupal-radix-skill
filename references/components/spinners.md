# spinners

Bootstrap loading spinner with configurable type, color, size, and accessibility status.

**Include name is `radix:spinner` (singular)**, even though the docs page is `spinners.md`.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `html_tag` | string | `'div'` | `'div'` or `'span'` |
| `type` | string | `'border'` | `'border'` or `'grow'` |
| `color` | string | `'primary'` | Bootstrap color name — `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` |
| `size` | string | — | Size modifier — e.g. `'sm'` |
| `hidden_status` | boolean | `false` | If true, hides the screen-reader status text visually |
| `spinner_utility_classes` | array | `[]` | Additional utility classes |
| `content` | string | `'Loading...'` | Accessible status text for screen readers |

## Slots

None.

## Examples

### Basic

```twig
{% include 'radix:spinner' with {
  html_tag: 'div',
  type: 'border',
  color: 'primary',
  size: 'sm',
  hidden_status: false,
  spinner_utility_classes: ['custom-spinner'],
  content: 'Loading...'|t,
} %}
```

### Inside a button (use `span`)

```twig
{% include 'radix:button' with {
  color: 'primary',
  content: '<span class="visually-hidden">Saving</span>',
  button_utility_classes: ['d-flex', 'align-items-center', 'gap-2'],
} %}
{# Then inject a spinner inside the button via override or wrap pattern. #}

{# Or inline in a custom button: #}
<button class="btn btn-primary" type="button" disabled>
  {% include 'radix:spinner' with {
    html_tag: 'span',
    color: 'light',
    size: 'sm',
    spinner_utility_classes: ['me-2'],
    content: 'Loading...'|t,
  } %}
  {{ 'Saving...'|t }}
</button>
```

## Gotchas

- Include name is **`radix:spinner`** (singular), not `radix:spinners`.
- Use `html_tag: 'span'` when nesting inside a button or inline within text — otherwise you'll get a line break.
- `color` expects the Bootstrap color name only (no `text-` prefix); the component handles class composition.
- Always provide meaningful `content` text. Set `hidden_status: true` only when the spinner is accompanied by other visible status text.

## Underlying Bootstrap

Bootstrap 5.3 Spinners — https://getbootstrap.com/docs/5.3/components/spinners/
