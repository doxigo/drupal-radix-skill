# badge

Small count or label indicator. Can render as a `span`, `div`, or anchor with contextual color styling.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `badge_html_tag` | string | `'span'` | Element used: `span`, `div`, or `a` |
| `color` | string | `'secondary'` | Background-and-text combo via `.text-bg-{color}` — `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark` |
| `content` | string | — | Inner text/HTML |
| `badge_url` | string | — | When provided, renders as an anchor to this URL |
| `badge_utility_classes` | array | `[]` | Additional Bootstrap or custom classes |

## Slots

None — content arrives via the `content` prop.

## Examples

### Link badge

```twig
{% include 'radix:badge' with {
  badge_html_tag: 'a',
  color: 'primary',
  badge_url: forum.new_url,
  content: forum.new_text,
} %}
```

### Pill badge

```twig
{% include 'radix:badge' with {
  badge_html_tag: 'span',
  content: 'Success',
  badge_utility_classes: ['rounded-pill', 'bg-success', 'text-white'],
} %}
```

## Gotchas

- The actual prop names in shipped examples are **`badge_html_tag`** and **`badge_url`** (prefixed). Some documentation prose calls them `html_tag`/`url` — use the prefixed forms.
- For a pill, omit `color` and pass `rounded-pill` + `bg-*` + `text-*` via `badge_utility_classes`. Otherwise the default `.text-bg-*` helper class conflicts with your custom background.

## Underlying Bootstrap

Bootstrap 5.3 Badge — https://getbootstrap.com/docs/5.3/components/badge/
