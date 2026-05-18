# navbar-brand

Renders a site's brand identifier in the navbar — text, slogan, and/or logo image — optionally wrapped in a link.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | string | `''` | Brand text (typically site name) |
| `slogan` | string | `''` | Supporting slogan text shown alongside |
| `image` | mixed | `''` | Brand logo file/render array |
| `width` | string | `''` | Image width (e.g. `'40px'`) |
| `height` | string | `''` | Image height (e.g. `'auto'`) |
| `path` | string | `''` | Link destination URL — use Drupal `path()` |
| `alt` | string | `''` | Alt text for the brand image |

## Slots

None — configured purely via props.

## Example

```twig
{% include 'radix:navbar-brand' with {
  text: site_name,
  slogan: site_slogan,
  image: site_logo,
  width: '40px',
  height: 'auto',
  path: path('<front>'),
  alt: site_name ~ ' logo',
} %}
```

## Gotchas

- `path` should be generated with Drupal's `path()` Twig function for proper routing (e.g. `path('<front>')` for the homepage).
- `alt` is an accessibility requirement when `image` is set — always provide meaningful text.
- Typically embedded as the `branding` prop of `radix:navbar`.

## Underlying Bootstrap

Bootstrap 5.3 Navbar brand — https://getbootstrap.com/docs/5.3/components/navbar/#brand
