# table

Bootstrap-styled HTML table with caption, colgroups, header, rows, footer, and empty-state support.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `table_utility_classes` | array | `[]` | Utility classes applied to the `<table>` |
| `caption` | string\|markup | — | Optional `<caption>` content |
| `colgroups` | array | — | Column group definitions for `<colgroup>` / `<col>` |
| `header` | array | — | Header cells rendered inside `<thead>` |
| `rows` | array | — | Row data rendered inside `<tbody>` |
| `footer` | array | — | Footer cells rendered inside `<tfoot>` |
| `empty` | string\|markup | — | Fallback content shown when `rows` is empty |

## Slots

None — all content arrives via props.

## Example

```twig
{% include 'radix:table' with {
  table_utility_classes: ['table-striped', 'table-hover'],
  caption: 'List of users'|t,
  colgroups: colgroups,
  header: header,
  rows: rows,
  footer: footer,
  empty: 'No records found.'|t,
} %}
```

### Responsive striped table

```twig
{% include 'radix:table' with {
  table_utility_classes: ['table-striped', 'table-sm', 'table-responsive'],
  header: [['Name'|t, 'Email'|t, 'Role'|t]],
  rows: rows,
  empty: 'No users yet.'|t,
} %}
```

## Gotchas

- `table_utility_classes` is an **array**, not a space-separated string — pass `['table-striped', 'table-hover']`, not `'table-striped table-hover'`.
- Use Bootstrap table modifier classes via `table_utility_classes`: `table-striped`, `table-hover`, `table-bordered`, `table-sm`, `table-responsive`, contextual `table-*` color variants.
- For Drupal Views table displays, prefer `radix:views-view--table` (which adds sticky/responsive props).

## Underlying Bootstrap

Bootstrap 5.3 Tables — https://getbootstrap.com/docs/5.3/content/tables/
