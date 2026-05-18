# local-tasks

Renders Drupal's primary tabs (as Bootstrap tabs) and secondary tabs (as Bootstrap pills) for local task navigation. Includes screen-reader-only section headings for accessibility.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `primary` | render array | — | Primary local tasks (Bootstrap tabs) |
| `secondary` | render array | — | Secondary local tasks (Bootstrap pills) |

## Slots

None.

## Example

```twig
{# In templates/navigation/menu-local-tasks.html.twig #}
{% include 'radix:local-tasks' with {
  primary: primary,
  secondary: secondary,
} %}
```

## Gotchas

- `primary` and `secondary` should be the render arrays Drupal already builds for local tasks — pass them through unchanged.
- Visually-hidden headings are emitted for screen readers — don't strip them.
- This is typically rendered on admin/edit pages (e.g. View / Edit / Delete tabs on a node).

## Underlying Bootstrap

Bootstrap 5.3 Navs / Tabs and pills — https://getbootstrap.com/docs/5.3/components/navs-tabs/
