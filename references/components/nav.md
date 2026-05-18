# nav

Bootstrap navigation list (tabs or pills) with configurable alignment, fill/justify distribution, container, color scheme, and utility-class hooks.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `alignment` | string | — | `'left'`, `'right'`, `'center'`, `'vertical'` |
| `style` | string | — | `'tabs'` or `'pills'` |
| `fill` | string | — | `'fill'` or `'justify'` for item distribution |
| `items` | array | — | Navigation link items |
| `container` | string | — | Container type (e.g. `'fixed'`) |
| `color` | string | — | Color scheme (e.g. `'light'`) |
| `navbar_utility_classes` | array | — | Classes on the wrapper (note shared naming with navbar) |
| `nav_link_utility_classes` | array | — | Classes on each nav link |
| `nav_item_utility_classes` | array | — | Classes on each nav item |

## Slots

None — items arrive via the `items` array.

## Examples

### Simple link list

```twig
{% include 'radix:nav' with {
  items: links,
} %}
```

### Right-aligned pills, fully justified

```twig
{% include 'radix:nav' with {
  alignment: 'right',
  style: 'pills',
  fill: 'justify',
  items: links,
  container: 'fixed',
  color: 'light',
  navbar_utility_classes: ['bg-light'],
  nav_link_utility_classes: ['text-dark'],
  nav_item_utility_classes: ['px-2'],
} %}
```

## Gotchas

- The wrapper-classes prop is named `navbar_utility_classes` (shared with the navbar styling system) — it applies to *this* nav's wrapper, not to a separate navbar.
- Item shape typically follows Drupal's menu render-array convention (`title`, `url`, `attributes`, `below`).
- For dropdown submenus inside nav items, use `radix:dropdown-menu` and feed it `item.below`.

## Underlying Bootstrap

Bootstrap 5.3 Navs & tabs — https://getbootstrap.com/docs/5.3/components/navs-tabs/
