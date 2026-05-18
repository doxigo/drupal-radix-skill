# fieldset

Renders a semantic `<fieldset>` with legend, description, required indicator, optional disabled state, and prefix/suffix slots wrapping child form controls.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | Attribute | — | HTML attributes for the `<fieldset>` |
| `disabled` | boolean | `false` | Disables all child controls in the fieldset |
| `errors` | string\|render | — | Error messages for the fieldset |
| `required` | boolean | `false` | Renders a required indicator |
| `legend` | object | — | `{ title, attributes }` — visible legend label and its attributes |
| `description` | object | — | `{ content, attributes }` — helper text and its attributes |
| `prefix` | string\|render | — | Content rendered before the children |
| `suffix` | string\|render | — | Content rendered after the children |

## Slots

- `children` — block containing the form fields (inputs, selects, checkboxes, buttons). Use `{% embed %}` + `{% block children %}`.

## Example

```twig
{% embed 'radix:fieldset' with {
  attributes: attributes.addClass('my-fieldset'),
  disabled: false,
  errors: '',
  required: true,
  legend: {
    title: 'Personal information'|t,
    attributes: { class: 'fw-bold' },
  },
  description: {
    content: 'Please fill in your details.'|t,
    attributes: { class: 'text-muted small' },
  },
  prefix: '',
  suffix: '',
} %}
  {% block children %}
    <input type="text" name="first_name" class="form-control" />
    <select name="country" class="form-select">…</select>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="agree" />
      <label class="form-check-label" for="agree">{{ 'I agree'|t }}</label>
    </div>
    <button type="submit" class="btn btn-primary">{{ 'Submit'|t }}</button>
  {% endblock %}
{% endembed %}
```

## Gotchas

- Must use `{% embed %}` (not `{% include %}`) to populate the `children` block.
- `legend` and `description` are **objects**, not strings. Each takes both content/title and attributes.
- `disabled: true` cascades to all child form controls via the native `<fieldset disabled>` behavior.

## Underlying Bootstrap

Bootstrap 5.3 disabled fieldsets — https://getbootstrap.com/docs/5.3/forms/overview/#disabled-fieldsets
