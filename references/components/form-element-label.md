# form-element-label

Renders a `<label>` for a form control with configurable display mode and required indicator.

**Include name uses double-dash: `radix:form-element--label`.**

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | — | Label text |
| `title_display` | string | — | `'before'`, `'after'`, `'invisible'` |
| `required` | boolean | `false` | Whether the associated form element is required |
| `attributes` | Attribute | — | HTML attributes for the `<label>` |

## Slots

None.

## Example

```twig
{% include "radix:form-element--label" with {
  required: true,
  title: 'Label'|t,
  title_display: 'after',
  attributes: { class: 'form-label' },
} %}
```

## Gotchas

- **Double-dash in the SDC name**: `radix:form-element--label`, not `radix:form-element-label`.
- Pair with Bootstrap's `form-label` class for proper spacing/typography.
- Use `title_display: 'invisible'` for visually-hidden but screen-reader-accessible labels.

## Underlying Bootstrap

Bootstrap 5.3 Form labels — https://getbootstrap.com/docs/5.3/forms/overview/
