# views-view-grid

Renders a Drupal Views display as a responsive grid with configurable alignment, columns, and item rendering.

**Include name uses double-dash: `radix:views-view--grid`.**

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string\|markup | — | Grid heading |
| `view` | object | — | The view object (some sources call this `view_object`) |
| `rows` | array | — | Row content (some sources call this `view_rows`) |
| `options` | object | — | Grid configuration — alignment, column count, etc. (some sources `grid_options`) |
| `items` | array | — | Individual grid items (some sources `grid_items`) |
| `view_view__grid_utility_classes` | array | `[]` | Utility classes on the grid wrapper (note **double underscore**) |

## Slots

None.

## Example

```twig
{# In templates/views/views-view-grid.html.twig #}
{% include 'radix:views-view--grid' with {
  title: title,
  view: view,
  rows: rows,
  options: options,
  items: items,
  view_view__grid_utility_classes: ['gx-3', 'gy-4'],
} %}
```

## Gotchas

- The docs reference two naming conventions for the same props (`view`/`view_object`, `rows`/`view_rows`, `options`/`grid_options`, `items`/`grid_items`). Check the SDC source for the canonical names in your installed version.
- The utility-class prop uses a **double underscore**: `view_view__grid_utility_classes`.
- Inherits the outer wrapper from the parent `views-view` component — focus your override on the grid-specific layout.

## Underlying Bootstrap

Bootstrap 5.3 Grid — https://getbootstrap.com/docs/5.3/layout/grid/
