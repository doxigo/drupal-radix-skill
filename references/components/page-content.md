# page-content

Main content area wrapper. Splits the page into header and inner content blocks with configurable containers and utility classes.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `content_attributes` | Attribute | — | Attributes for the main content element |
| `page_main_utility_classes` | array | `[]` | Classes on the main content wrapper |
| `page_header_container_type` | string\|false | `false` | Bootstrap container type for the header section (`'xxl'`, `'fluid'`, etc.); `false` skips the container |
| `page_header_container_utility_classes` | array | `[]` | Classes on the header container |
| `page_content_container_type` | string\|false | `false` | Bootstrap container type for inner content; `false` skips |

## Slots

- Page header block — for breadcrumbs, page title, tabs (above main content)
- Inner content block — the actual page body

## Example

```twig
{% include 'radix:page-content' with {
  content_attributes: content_attributes.setAttribute('class', ['custom-class']),
  page_main_utility_classes: ['utility-class'],
  page_header_container_type: false,
  page_header_container_utility_classes: ['my-5'],
  page_content_container_type: 'xxl',
} %}
```

## Gotchas

- `*_container_type: false` skips the `.container*` wrapper entirely — useful for full-bleed sections.
- Container type values mirror Bootstrap modifiers: `'xxl'`, `'xl'`, `'lg'`, `'md'`, `'sm'`, `'fluid'`. The exact accepted set isn't enumerated in docs — check the shipped component source if in doubt.

## Underlying Bootstrap

Bootstrap 5.3 Containers — https://getbootstrap.com/docs/5.3/layout/containers/
