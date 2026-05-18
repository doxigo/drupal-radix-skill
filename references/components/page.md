# page

Top-level page wrapper with header (navigation), content, and footer blocks plus attribute and utility-class handling.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `page_attributes` | Attribute | — | Attributes applied to the page wrapper `<div>` |
| `page_utility_classes` | array | `[]` | Utility classes appended to the page wrapper |

## Slots

- Header block — typically rendered via `radix:page-navigation`
- Content block — the main page content area
- Footer block — typically rendered via `radix:page-footer`

## Example

```twig
{# In templates/page.html.twig #}
{% include 'radix:page' with {
  page_attributes: attributes.setAttribute('class', ['custom-class']),
  page_utility_classes: ['utility-class'],
} %}
```

## Gotchas

- The component guarantees page attributes are applied even if not explicitly set — but you should still pass them through from `page.html.twig` so contextual classes (sidebar layout, theme variants) make it through.
- "Blocks" here refers to **Twig template blocks** (header/content/footer) — overriding them requires `{% embed %}`-ing this component and providing `{% block %}` overrides, not passing render arrays as props.

## Underlying Bootstrap

N/A — page-level scaffolding wrapper.
