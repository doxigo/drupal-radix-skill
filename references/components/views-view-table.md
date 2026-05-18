# views-view-table

Drupal Views table-style display with optional sticky headers, responsive wrapping, and accessibility metadata.

**Include name uses double-dash: `radix:views-view--table`.**

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string\|markup | — | Optional caption/heading text |
| `header` | array\|render | — | Header cell elements with their HTML attributes |
| `rows` | array\|render | — | Row elements with per-row HTML attributes |
| `responsive` | boolean | — | Wraps the table for responsive overflow behavior |
| `sticky` | boolean | — | Applies a sticky-header treatment |
| `views_view__table_utility_classes` | array | `[]` | Utility classes on the `<table>` element (note **double underscore**) |
| `attributes` | Attribute | — | Additional attributes on the table |

## Slots

None.

## Example

```twig
{# In templates/views/views-view-table.html.twig #}
{% include 'radix:views-view--table' with {
  title: 'Active users'|t,
  header: header,
  rows: rows,
  responsive: true,
  sticky: true,
  views_view__table_utility_classes: ['table-striped', 'table-hover'],
} %}
```

## Gotchas

- `header` and `rows` must be structured as collections containing both content *and* `attributes` so per-cell/per-row attributes survive rendering — don't flatten to plain strings.
- `responsive: true` and `sticky: true` are independent — combine for typical data-heavy tables.
- `views_view__table_utility_classes` is an **array** with a **double underscore** — pass `['table-striped', 'table-hover']`, not a space-separated string.
- For accessibility, populate `title` (caption) — `aria-label` alone on the wrapper isn't sufficient.

## Underlying Bootstrap

Bootstrap 5.3 Tables — https://getbootstrap.com/docs/5.3/content/tables/
