# region

Wraps Drupal region output in a themed container with attribute support.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | Attribute | — | HTML attributes for the wrapper; supports `setAttribute()` chaining |
| `children` | render | — | The rendered region content to display |

## Slots

None — content arrives via the `children` prop.

## Example

```twig
{# In templates/layout/region.html.twig #}
{% include 'radix:region' with {
  attributes: attributes.setAttribute('class', ['region--' ~ region]),
  children: content,
} %}
```

## Gotchas

- Documentation is minimal — only the two props are formally listed. For more sophisticated region styling, override the SDC component in your subtheme.
- Standard Drupal regions (sidebar, header, etc.) flow through this component by default in shipped Radix templates.

## Underlying Bootstrap

N/A — Drupal region wrapper, not a Bootstrap component.
