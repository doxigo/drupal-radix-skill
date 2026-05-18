# input

Renders a Bootstrap-styled `<input>` with controlled class management. Supports removing the default `form-control` class for checkbox/radio inputs and arbitrary HTML attributes.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | Attribute | `{}` | HTML attributes for the `<input>`; supports `.removeClass()` chaining |
| `remove_form_control` | boolean | `false` | Omits the default `form-control` class (use for checkbox/radio inputs) |
| `input_utility_classes` | array | `[]` | Extra Bootstrap or custom utility classes |

## Slots

The docs mention optional child elements alongside the input, but no specific named slot is published.

## Example

```twig
{% include 'radix:input' with {
  attributes: attributes.removeClass('button'),
  remove_form_control: false,
  input_utility_classes: ['the-class', 'the-other-class'],
} %}
```

## Gotchas

- For checkbox/radio markup, set `remove_form_control: true` so Bootstrap's `.form-check-input` takes over instead of `.form-control`.
- The `attributes` parameter is a Drupal `Attribute` object — use `.removeClass()`, `.addClass()`, `.setAttribute()` chains rather than building a raw associative array.

## Underlying Bootstrap

Bootstrap 5.3 Form controls — https://getbootstrap.com/docs/5.3/forms/form-control/
