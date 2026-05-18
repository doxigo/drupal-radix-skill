# breadcrumb

Hierarchical navigation trail rendered from an array of `{ text, url }` items. Use `url: null` to mark the active/current page.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `breadcrumb` | array | — | **Required.** Array of `{ text, url }`. `url: null` = active item |
| `breadcrumb_utility_classes` | array | `[]` | Utility classes on the `.breadcrumb` element |
| `breadcrumb_attributes` | Attribute | — | Additional wrapper attributes (Drupal Attribute object) |

## Slots

None.

## Examples

### Manual breadcrumb

```twig
{% include 'radix:breadcrumb' with {
  breadcrumb: [
    { text: 'Home'|t,  url: '/' },
    { text: 'Blog'|t,  url: '/blog' },
    { text: node.label, url: null },
  ],
  breadcrumb_utility_classes: ['mb-3'],
} %}
```

### From Drupal's breadcrumb block

```twig
{# In templates/navigation/breadcrumb.html.twig #}
{% include 'radix:breadcrumb' with {
  breadcrumb: breadcrumb,
} %}
```

## Gotchas

- The current/active item must have `url: null` — that flags it as the active crumb (rendered without a link, with Bootstrap's `.active` styling).
- Drupal's core breadcrumb data structure already matches the expected shape — you can pass `breadcrumb` directly.

## Underlying Bootstrap

Bootstrap 5.3 Breadcrumb — https://getbootstrap.com/docs/5.3/components/breadcrumb/
