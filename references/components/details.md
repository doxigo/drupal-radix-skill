# details

Wraps content in a native HTML `<details>`/`<summary>` disclosure with optional title, description, required indicator, and error message.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | — | Display label shown in the `<summary>` |
| `description` | string | — | Explanatory text shown alongside/under the summary |
| `children` | string\|render | — | Main content revealed when expanded |
| `value` | string | — | Data value associated with the details |
| `required` | boolean | `false` | Marks the disclosure as required |
| `errors` | string\|render | — | Error messages |
| `attributes` | Attribute | — | Attributes on the root `<details>` element |
| `summary_attributes` | Attribute | — | Attributes on the `<summary>` element |
| `content_attributes` | Attribute | — | Attributes on the inner content wrapper |

## Slots

None — content arrives via the `children` prop.

## Example

```twig
{% include 'radix:details' with {
  title: 'More Information'|t,
  description: 'Additional details about the topic can be found here.'|t,
  children: 'Some important value',
  value: 'Some important value',
  required: false,
  errors: '',
  attributes: attributes.setAttribute('id', 'details-1'),
  summary_attributes: summary_attributes.setAttribute('class', ['text-success']),
} %}
```

## Gotchas

- This is a thin wrapper around the native HTML disclosure pattern — most behavior comes from the browser.
- For accordion-like multi-section UIs, prefer `radix:accordion` instead — it's designed for that pattern.

## Underlying Bootstrap

Native HTML `<details>`/`<summary>`. Closest Bootstrap equivalent is Accordion — https://getbootstrap.com/docs/5.3/components/accordion/
