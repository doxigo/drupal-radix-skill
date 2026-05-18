# textarea

Renders an HTML `<textarea>` form control with Bootstrap `form-control` styling.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | string | — | Initial content displayed inside |
| `textarea_utility_classes` | array | `[]` | Additional utility classes |
| `attributes` | Attribute | — | HTML attributes for the `<textarea>` |

## Slots

None.

## Example

```twig
{% include 'radix:textarea' with {
  value: 'Initial content',
  textarea_utility_classes: ['additional-custom-class'],
} %}
```

## Gotchas

- The Bootstrap `form-control` class is applied by default — no need to add it manually.
- For `rows`/`cols`/`placeholder` attributes, pass via `attributes` (using `attributes.setAttribute('rows', 5)` style).

## Underlying Bootstrap

Bootstrap 5.3 Textarea — uses the standard `.form-control` styling — https://getbootstrap.com/docs/5.3/forms/form-control/
