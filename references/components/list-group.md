# list-group

Bootstrap list group rendered as `<ul>`, `<ol>`, or `<div>` with optional numbering, horizontal layout at a breakpoint, per-item variants, and full attribute/utility-class control.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `list_group_html_tag` | string | `'ul'` | HTML tag for the container |
| `list_group_item_html_tag` | string | `'li'` | HTML tag for items |
| `list_group_item_variants` | array | `[]` | Bootstrap variants per item: `'primary'`, `'danger'`, etc. |
| `list_group_utility_classes` | array | `[]` | Classes on the container |
| `list_group_item_utility_classes` | array | `[]` | Classes on each item |
| `list_group_attributes` | array | `[]` | Custom attributes on the container |
| `list_group_item_attributes` | array | `[]` | Custom attributes on items |
| `list_group_items` | array | `[]` | Items to display (one entry per row) |
| `numbered` | boolean | `false` | Ordered numbering — switches tag to `<ol>` |
| `horizontal` | boolean | `false` | Arrange items horizontally |
| `horizontal_breakpoint` | string | `'md'` | Breakpoint at which horizontal layout activates: `'sm'`, `'md'`, `'lg'`, etc. |

## Slots

None — items arrive via `list_group_items`.

## Examples

### Basic list

```twig
{% include 'radix:list-group' with {
  list_group_items: ['One', 'Two', 'Three'],
} %}
```

### Numbered, horizontal at lg

```twig
{% include 'radix:list-group' with {
  list_group_items: items,
  numbered: true,
  horizontal: true,
  horizontal_breakpoint: 'lg',
  list_group_item_variants: ['danger', 'danger', 'danger'],
  list_group_utility_classes: ['shadow-sm'],
} %}
```

## Gotchas

- `numbered: true` implies `<ol>`/`<li>` semantics — combine with appropriate `list_group_html_tag` if customizing further.
- `horizontal_breakpoint` only takes effect when `horizontal: true`.
- `list_group_item_variants` is positional — its length should match `list_group_items`.

## Underlying Bootstrap

Bootstrap 5.3 List group — https://getbootstrap.com/docs/5.3/components/list-group/
