# form-element-radio-checkbox

Specialized form-element wrapper for radio and checkbox inputs. Applies Bootstrap's `form-check` markup around the control.

**Include name uses double-dash: `radix:form-element--radiocheckbox`** (no hyphen between "radio" and "checkbox").

## Props

Inherits from `radix:form-element` — see [form-element.md](form-element.md). No props of its own are documented.

## Slots

None.

## Example

```twig
{% include "radix:form-element--radiocheckbox" %}
```

```twig
{# Typical usage — Drupal supplies these variables for radio/checkbox elements #}
{% include "radix:form-element--radiocheckbox" with {
  attributes: attributes,
  label: { title: label, attributes: title_attributes },
  required: required,
  children: children,
} %}
```

## Gotchas

- **Double-dash in the SDC name**: `radix:form-element--radiocheckbox`, not `radix:form-element-radio-checkbox`.
- No "radio" or "checkbox" segmentation in the name — both inputs share this component.
- Renders Bootstrap's form-check pattern: label *after* input, with `.form-check-input` and `.form-check-label` classes.
- For inline radios/checkboxes, add `.form-check-inline` via `form_element_utility_classes` on the parent.

## Underlying Bootstrap

Bootstrap 5.3 Checks & radios — https://getbootstrap.com/docs/5.3/forms/checks-radios/
