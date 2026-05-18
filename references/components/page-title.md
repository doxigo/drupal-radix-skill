# page-title

Drupal page-title heading element with optional Bootstrap display heading styling and utility-class customization.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `display` | string | `''` | Bootstrap display heading class — `'display-1'` through `'display-6'` |
| `page_title_utility_classes` | array | `[]` | Bootstrap utility classes or custom CSS classes appended to the title |

## Slots

None — title text arrives from Drupal's `page-title.html.twig` render context.

## Examples

### Basic

```twig
{# In templates/page-title.html.twig #}
{% include 'radix:page-title' %}
```

### Display heading

```twig
{% include 'radix:page-title' with {
  display: 'display-1',
} %}
```

### Custom classes

```twig
{% include 'radix:page-title' with {
  page_title_utility_classes: ['custom-section-title', 'mb-4'],
} %}
```

## Gotchas

- Designed to be used inside Drupal's `page-title.html.twig` — the underlying title text comes from Drupal's render array, not from a prop.
- `display` only accepts the six Bootstrap display values (`display-1` through `display-6`). Arbitrary values won't produce a Bootstrap class.

## Underlying Bootstrap

Bootstrap 5.3 Display headings — https://getbootstrap.com/docs/5.3/content/typography/#display-headings
