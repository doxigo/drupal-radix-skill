# form-element

Wraps an individual Drupal form control with its label, description, required indicator, error display, prefix/suffix, and configurable label/description positioning.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | Attribute | — | HTML attributes for the form element wrapper |
| `errors` | string\|render | — | Error messages displayed to the user |
| `prefix` | string\|render | — | Content rendered before the form element |
| `suffix` | string\|render | — | Content rendered after the form element |
| `label` | object | — | Label config (title, display position, required, attributes) |
| `description` | object | — | Description config (content, position, attributes) |
| `label_display` | string | — | Label position: `'before'`, `'after'`, `'invisible'` |
| `description_display` | string | — | Description position: `'before'`, `'after'`, `'invisible'` |
| `required` | boolean | `false` | Adds a required indicator |
| `disabled` | boolean | `false` | Disables the form control |
| `form_element_utility_classes` | array | `[]` | Utility classes on the wrapper |
| `children` | string\|render | — | The actual input/select/textarea control |

## Slots

None documented — children arrive via the `children` prop, supplied by Drupal's form renderer.

## Example

```twig
{# Usually rendered automatically by Drupal — typical override #}
{% include 'radix:form-element' with {
  attributes: attributes,
  label: { title: label, attributes: title_attributes },
  description: { content: description, attributes: description_attributes },
  label_display: label_display,
  description_display: description_display,
  required: required,
  disabled: disabled,
  errors: errors,
  prefix: prefix,
  suffix: suffix,
  children: children,
  form_element_utility_classes: ['mb-3'],
} %}
```

## Gotchas

- Use `label_display: 'invisible'` for accessible-but-screen-reader-only labels.
- For label-only output (e.g. when you need just the `<label>`), use the dedicated `radix:form-element--label` component.
- For radio/checkbox-specific markup, use `radix:form-element--radiocheckbox` instead.

## Underlying Bootstrap

Bootstrap 5.3 Forms / Form text — https://getbootstrap.com/docs/5.3/forms/overview/
