# dropdown-menu

Bootstrap-style dropdown menu, typically invoked from the Nav component to render a menu's child items.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | array | — | Array of menu items (usually `item.below` from a Drupal menu render array) |

## Slots

None.

## Example

```twig
{% include 'radix:dropdown-menu' with {
  items: item.below,
} %}
```

## Gotchas

- Most commonly used **inside** the `radix:nav` or `radix:navbar` component, not standalone.
- Bootstrap 5.3's data attributes (`data-bs-toggle="dropdown"`) are applied to the **trigger** element, not to this component. Make sure the trigger in the parent nav has them.
- The exact item shape mirrors Drupal's menu render arrays — each entry typically has `title`, `url`, `below` (for nested submenus).

## Underlying Bootstrap

Bootstrap 5.3 Dropdowns — https://getbootstrap.com/docs/5.3/components/dropdowns/
