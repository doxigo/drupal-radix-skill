# pagination

Bootstrap-style pagination control for multi-page navigation. Supports size, alignment, and accessibility.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `pagination_utility_classes` | array | `[]` | Utility classes on the pagination wrapper |
| `size` | string | `''` | `'sm'` or `'lg'` |
| `alignment` | string | `''` | `'start'`, `'end'`, `'center'`, `'vertical'` |
| `items` | array | `[]` | Pagination items (page links, prev/next, ellipsis) |

## Slots

None — items arrive via the `items` prop.

## Example

```twig
{% include 'radix:pagination' with {
  pagination_utility_classes: ['my-4'],
  size: 'lg',
  alignment: 'center',
  items: items,
} %}
```

## Gotchas

- Each entry in `items` is expected to align with Drupal's pager render array — entries typically have `href`, `text`, `active`, `disabled`. The exact shape isn't documented in detail; align with what Drupal's pager block emits.
- `alignment: 'vertical'` is supported in addition to start/end/center — useful for sidebar pagers.
- For Drupal's standard pager (e.g. `templates/navigation/pager.html.twig`), pass the existing `items` variable directly.

## Underlying Bootstrap

Bootstrap 5.3 Pagination — https://getbootstrap.com/docs/5.3/components/pagination/
