# page-footer

Site footer wrapper. Supports attribute management, utility-class styling, and flexible footer content blocks.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `footer_utility_classes` | array | `[]` | Utility classes appended to the footer wrapper |

## Slots

- Footer content block — where region blocks / footer content render

## Example

```twig
{% include 'radix:page-footer' with {
  footer_utility_classes: ['mt-5', 'bg-dark', 'text-white'],
} %}
```

## Gotchas

- Documentation enumerates only `footer_utility_classes`. Additional attribute props likely exist following Radix conventions (e.g. `footer_attributes`) but are not listed in the public page. Check the shipped component source if you need attribute control.

## Underlying Bootstrap

N/A — site-level footer wrapper.
