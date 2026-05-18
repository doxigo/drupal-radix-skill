# block

Generic Drupal block wrapper. Emits a configurable container with title, content area, and per-block attributes/classes.

Intended for use from `block.html.twig` and similar block-level templates. Most of the variables are supplied by Drupal's render pipeline.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `html_tag` | string | — | Root element tag for the block container |
| `block_utility_classes` | array | `[]` | Utility classes on the wrapper |
| `label` | string | — | Block label / title |
| `label_display` | boolean\|string | — | Whether the label renders |
| `provider` | string | — | Block plugin provider (used for class generation) |
| `attributes` | Attribute | — | Wrapper attributes (Drupal Attribute object) |
| `title_attributes` | Attribute | — | Title element attributes |
| `content_attributes` | Attribute | — | Content element attributes |
| `title_prefix` | render | — | Drupal-managed render array before the title (needed for contextual links) |
| `title_suffix` | render | — | Drupal-managed render array after the title (needed for contextual links) |
| `block_classes` | set | — | Dynamic class set built from block config + plugin ID |

## Slots

None documented. Block content is supplied by Drupal's render pipeline through the standard `content` variable in `block.html.twig`.

## Example

```twig
{# In templates/block/block.html.twig #}
{% include 'radix:block' with {
  html_tag: 'div',
  block_utility_classes: ['mb-4'],
  label: label,
  label_display: label_display,
  attributes: attributes,
  title_attributes: title_attributes,
  content_attributes: content_attributes,
  title_prefix: title_prefix,
  title_suffix: title_suffix,
} %}
```

## Gotchas

- Always preserve `title_prefix` and `title_suffix` — they carry contextual-link render arrays. Drop them and you lose admin edit overlays.
- Each block instance has a unique Drupal-generated ID via `attributes` — don't hard-code an `id`.
- Visually hidden labels still need a value so screen readers can announce them.

## Underlying Bootstrap

N/A — Drupal block wrapper, not a Bootstrap component.
