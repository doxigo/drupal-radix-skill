# select

Renders an HTML `<select>` form control with optgroup and selected-state support.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | Attribute | — | HTML attributes for the `<select>`; supports `.addClass()` chaining |
| `options` | array | — | List of options to render; supports nested optgroups |

## Slots

None.

## Example

```twig
{% include 'radix:select' with {
  attributes: attributes.addClass(['form-control']),
  options: options,
} %}
```

## Gotchas

- The Bootstrap class for selects is `.form-select` (not `.form-control`). Many Drupal forms pass `form-control` by default — consider replacing it with `.form-select` for proper Bootstrap 5 styling: `attributes.removeClass('form-control').addClass('form-select')`.
- Optgroups are supported in the `options` array. The exact shape mirrors Drupal's standard select form-element options.

## Underlying Bootstrap

Bootstrap 5.3 Select — https://getbootstrap.com/docs/5.3/forms/select/
