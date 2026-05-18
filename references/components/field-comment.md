# field-comment

Specialized variant of `radix:field` for rendering a comment form-element field. Inherits the parent field component's behavior.

## Props

Inherits from `radix:field` — see [field.md](field.md). No props of its own are documented.

## Slots

None.

## Example

```twig
{% include 'radix:field-comment' %}
```

## Gotchas

- No standalone prop list — refer to `radix:field` for behavior.
- Purpose is "a form element for inputting a comment" — i.e. the comment form's body textarea field rendered inside Drupal's field rendering pipeline.

## Underlying Bootstrap

Bootstrap 5.3 Form controls (textarea) — https://getbootstrap.com/docs/5.3/forms/overview/
