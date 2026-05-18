# views-view-unformatted

Drupal Views "Unformatted list" display — outputs a title plus a flat iteration of rows with optional default row class and per-row utility classes.

**Include name uses double-dash: `radix:views-view--unformatted`.**

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string\|markup | — | Optional heading for the rendered group of rows |
| `rows` | array\|render | — | Collection of row render arrays; each row may carry its own `attributes` |
| `row_utility_classes` | array | `[]` | Utility classes applied to each row wrapper (commonly Bootstrap grid classes) |
| `default_row_class` | boolean | `true` | Apply Drupal/Radix's standard `views-row` class |
| `attributes` | Attribute | — | Attributes for the wrapper |

## Slots

None.

## Example

```twig
{# In templates/views/views-view-unformatted.html.twig #}
{% include 'radix:views-view--unformatted' with {
  title: 'Featured items'|t,
  rows: rows,
  row_utility_classes: ['col-12', 'col-md-6', 'col-lg-4'],
  default_row_class: true,
} %}
```

### Use with the accordion pattern

See `references/components/accordion.md` for the recipe — embed this component and pass an accordion include in the `views_unformatted_rows` block to render each row as an accordion item.

## Gotchas

- This component is intentionally minimal: **no card/list markup is added around rows**. To get a grid layout, the Views row wrapper needs `.row` (set via Views' "Row class" or surrounding markup) and feed responsive `col-*` via `row_utility_classes`.
- Per-row custom attributes (e.g. `data-row-color`) must be attached to the individual row render arrays — they pass through verbatim.
- `default_row_class: false` removes the `views-row` class entirely; verify CSS doesn't depend on it before disabling.

## Underlying Bootstrap

Bootstrap 5.3 Grid (when used with column classes) — https://getbootstrap.com/docs/5.3/layout/grid/
