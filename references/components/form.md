# form

Drupal form wrapper (`<form>`) with support for inline layout, custom HTML attributes, utility classes, and dynamic child form elements.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `is_inline` | boolean | `false` | Enables Bootstrap's inline form layout |
| `form_utility_classes` | array | `[]` | Utility classes on the `<form>` element |
| `attributes` | Attribute | — | Custom HTML attributes on the `<form>` |
| `children` | string\|render | — | Rendered form children/elements (populated by Drupal's form renderer) |

## Slots

None documented in the published example — children arrive via the `children` prop, which Drupal's form renderer typically supplies automatically.

## Example

```twig
{% include 'radix:form' with {
  is_inline: true,
} %}
```

```twig
{# Typical usage from form.html.twig — Drupal supplies `children` automatically #}
{% include 'radix:form' with {
  is_inline: false,
  attributes: attributes,
  children: children,
  form_utility_classes: ['mt-3'],
} %}
```

## Gotchas

- In normal Drupal flow, `children` is populated by Drupal's form renderer — you don't pass it manually.
- `is_inline: true` toggles Bootstrap's inline form layout (use for compact search/filter bars).
- For per-field control, override `form-element.html.twig` (uses `radix:form-element`) rather than this component.

## Underlying Bootstrap

Bootstrap 5.3 Forms overview — https://getbootstrap.com/docs/5.3/forms/overview/
