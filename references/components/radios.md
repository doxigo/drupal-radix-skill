# radios

Wrapper component for a group of radio buttons. Lets you apply utility classes and customize wrapper attributes.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `radios_utility_classes` | array | `[]` | Utility classes applied to the wrapper |
| `children` | mixed | `''` | Rendered radio button elements placed inside the wrapper |

## Slots

`children` is passed as a prop rather than a Twig block.

## Example

```twig
{% include 'radix:radios' with {
  radios_utility_classes: ['mb-3'],
  children: rendered_radio_buttons,
} %}
```

## Gotchas

- This is a **wrapper only** — pre-render the individual radio inputs (via Drupal form rendering or `radix:form-element--radiocheckbox`) and pass them via `children`.
- For the individual radio inputs themselves, use `radix:form-element--radiocheckbox`.
- For grouped button-style radios (toggle UI), use `radix:button-group` with `type: 'input', input_type: 'radio', toggle: true`.

## Underlying Bootstrap

Bootstrap 5.3 Form check / radios — https://getbootstrap.com/docs/5.3/forms/checks-radios/
