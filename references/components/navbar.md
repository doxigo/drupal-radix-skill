# navbar

Bootstrap 5 navbar with configurable container width, placement (default/fixed/sticky), theme (light/dark), expand breakpoint, and dedicated content regions for branding, left, and right blocks.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `navbar_container_type` | string | — | `'fluid'` or `'fixed'` |
| `placement` | string | — | Default, `'fixed-top'`, `'fixed-bottom'`, `'sticky-top'` |
| `navbar_theme` | string | — | `'light'` or `'dark'` |
| `navbar_expand` | string | — | Responsive expand breakpoint: `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `navbar_utility_classes` | array | — | Custom utility classes |
| `branding` | render | — | Brand / logo content (often a `radix:navbar-brand` include) |
| `left` | render | — | Left content block |
| `right` | render | — | Right content block |

## Slots

`branding`, `left`, `right` are passed as renderable props rather than Twig blocks.

## Examples

### Minimal

```twig
{% include 'radix:navbar' with {
  branding: branding_content,
  left: left_block_content,
  right: right_block_content,
} %}
```

### Sticky dark navbar

```twig
{% include 'radix:navbar' with {
  navbar_container_type: 'fluid',
  placement: 'sticky-top',
  navbar_theme: 'dark',
  navbar_expand: 'md',
  navbar_utility_classes: ['bg-primary', 'shadow-sm'],
  branding: branding_content,
  left: left_block_content,
  right: right_block_content,
} %}
```

### With a Radix navbar-brand inside

```twig
{% set branding_html %}
  {% include 'radix:navbar-brand' with {
    text: site_name,
    image: site_logo,
    path: path('<front>'),
    alt: site_name ~ ' logo',
  } %}
{% endset %}

{% include 'radix:navbar' with {
  branding: branding_html,
  navbar_theme: 'light',
  navbar_expand: 'lg',
  left: main_menu_render_array,
  right: user_menu_render_array,
} %}
```

## Gotchas

- `navbar_theme: 'dark'` + `navbar_utility_classes: ['bg-light']` creates a contrast clash — pick a coordinated theme/background.
- For mobile responsiveness, set `navbar_expand` to the breakpoint at which the collapse toggle should disappear.
- The `branding`, `left`, and `right` props accept renderable strings or render arrays — render Twig blocks into them with `{% set ... %}{% endset %}` blocks if you need composition.

## Underlying Bootstrap

Bootstrap 5.3 Navbar — https://getbootstrap.com/docs/5.3/components/navbar/
