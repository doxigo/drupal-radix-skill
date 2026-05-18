# field

Renders a Drupal field with its label, items, and contextual attributes. The SDC equivalent of `field.html.twig`.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label_hidden` | boolean | — | Whether the label is visually hidden |
| `multiple` | boolean | — | Whether the field allows multiple values |
| `label` | string | — | Field label text |
| `items` | array | — | Array of field item objects, each with a `content` key |
| `entity_type` | string | — | The entity type the field belongs to (`'node'`, `'taxonomy_term'`, etc.) |
| `field_name` | string | — | Machine name of the field |
| `field_type` | string | — | Type of the field (`'image'`, `'text_long'`, etc.) |
| `label_display` | string | — | Label display mode: `'above'`, `'inline'`, `'hidden'`, `'visually_hidden'` |
| `attributes` | Attribute | — | Attributes for the field wrapper |
| `title_attributes` | Attribute | — | Attributes for the label element |
| `field_item_utility_classes` | array | `[]` | Utility classes applied to each field item |

## Slots

None — items arrive via the `items` prop.

## Examples

### Multi-value text field

```twig
{% include 'radix:field' with {
  label_hidden: false,
  multiple: true,
  label: 'My field'|t,
  items: [
    { content: 'Item 1' },
    { content: 'Item 2' },
    { content: 'Item 3' },
  ],
  entity_type: 'node',
  field_name: 'field_example',
  field_type: 'text_long',
  label_display: 'above',
  attributes: attributes,
  title_attributes: title_attributes,
} %}
```

### Image field with aspect ratio

```twig
{% include 'radix:field' with {
  label_hidden: true,
  multiple: false,
  items: [{ content: image }],
  entity_type: 'node',
  field_name: 'field_image',
  field_type: 'image',
  field_item_utility_classes: ['ratio', 'ratio-16x9'],
} %}
```

## Gotchas

- `items` must always be an **array of objects**, each containing a `content` key — even for single-value fields. Don't pass a raw value.
- `field_item_utility_classes` follows the standard `*_utility_classes` Radix convention but applies per-item, not to the wrapper.

## Underlying Bootstrap

No direct Bootstrap equivalent — Drupal field abstraction. Pair with Bootstrap utility classes via `field_item_utility_classes` (e.g. `ratio`, spacing).
