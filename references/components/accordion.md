# accordion

Collapsible content sections with optional title heading, flush styling, and per-item expand/collapse control.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | — | Accordion heading text rendered above the items |
| `title_tag` | string | `'h2'` | HTML element wrapping the title |
| `title_link` | string | — | URL to wrap the title in |
| `items` | array | — | **Required.** Array of accordion sections (see *Item shape* below) |
| `accordion_utility_classes` | array | `[]` | Utility classes on the accordion container |
| `accordion_item_utility_classes` | array | `[]` | Utility classes applied to every item |
| `flush` | boolean | `false` | Borderless / flush style |
| `open_item_id` | int | — | 1-indexed item to display expanded initially |
| `id` | string | — | Unique identifier for the accordion (required when more than one is on a page) |
| `stay_open` | boolean | `false` | Whether items remain open when others expand (per-item override available) |

### Item shape

Each entry in `items` accepts:

```yaml
title:      string         # required
title_tag:  string         # default 'h3'
content:    string|markup  # required
stay_open:  boolean        # optional; overrides parent default
```

## Slots

None — content arrives via the `items` array.

## Examples

### Basic

```twig
{% include 'radix:accordion' with {
  title: 'FAQ',
  title_tag: 'h2',
  flush: true,
  open_item_id: 1,
  accordion_item_utility_classes: ['custom-item'],
  items: [
    { title: 'Item 1', title_tag: 'h3', content: 'Content 1', stay_open: true },
    { title: 'Item 2', title_tag: 'h3', content: 'Content 2' },
    { title: 'Item 3', title_tag: 'h3', content: 'Content 3' },
  ],
} %}
```

### From a Views unformatted display

```twig
{% embed "radix:views-view--unformatted" %}
  {% block views_unformatted_rows %}
    {% set accordion_items = [] %}
    {% for row in rows %}
      {% set node = row.content['#node'] %}
      {% set accordion_items = accordion_items|merge([{
        title_tag: 'h3',
        title: node.getTitle(),
        content: node.body.processed,
      }]) %}
    {% endfor %}

    {% include 'radix:accordion' with {
      id: 'faq',
      flush: true,
      items: accordion_items,
    } %}
  {% endblock %}
{% endembed %}
```

## Gotchas

- `items` is required — passing nothing renders an empty shell.
- `open_item_id` is **1-indexed**, not 0-indexed.
- `stay_open` is set per-item inside the `items` array, not on the parent.
- Always pass a unique `id` when several accordions live on the same page — otherwise their collapse state collides.

## Underlying Bootstrap

Bootstrap 5.3 Accordion — https://getbootstrap.com/docs/5.3/components/accordion/
