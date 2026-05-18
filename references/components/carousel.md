# carousel

Bootstrap carousel/slider with controls, indicators, captions, optional crossfade, and per-slide intervals.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `carousel_theme` | string | `'light'` | `'light'` or `'dark'` |
| `id` | int | `random(1000)` | Unique identifier (auto-generated if omitted) |
| `crossfade` | boolean | `false` | Use crossfade instead of slide |
| `show_carousel_control` | boolean | `true` | Show prev/next controls |
| `show_carousel_indicators` | boolean | `true` | Show indicator dots |
| `show_carousel_caption` | boolean | `true` | Show captions |
| `carousel_utility_classes` | array | `[]` | Classes on the carousel wrapper |
| `carousel_item_utility_classes` | array | `[]` | Classes on each slide item |
| `carousel_caption_utility_classes` | array | `[]` | Classes on captions |
| `carousel_indicator_utility_classes` | array | `[]` | Classes on indicators |
| `media_attributes` | array | `[]` | Attributes for the slide media wrapper |
| `item_image_attributes` | array | `[]` | Attributes for slide `<img>` elements |
| `caption_title_tag` | string | `'h5'` | HTML tag for caption titles |
| `caption_content_tag` | string | `'p'` | HTML tag for caption body |
| `items` | array | `[]` | Slides (see *Item shape*) |

### Item shape

```yaml
caption_title:    string         # default ''
caption_content:  string         # default ''
image_src:        string         # default '' — slide image URL
media:            render array   # default []  — Drupal media (overrides image_src)
interval:         int            # default 5000 — ms before auto-advancing
```

## Slots

None — slides defined via `items`.

## Examples

### Three-slide carousel

```twig
{% include 'radix:carousel' with {
  show_carousel_control: true,
  show_carousel_indicators: true,
  show_carousel_caption: true,
  caption_title_tag: 'h1',
  caption_content_tag: 'h4',
  items: [
    {
      caption_title: 'Welcome',
      interval: 3000,
      image_src: '/themes/custom/acme/images/hero-1.jpg',
      caption_content: 'Lead-in copy for slide one.',
    },
    {
      caption_title: 'Plans',
      interval: 5000,
      image_src: '/themes/custom/acme/images/hero-2.jpg',
      caption_content: 'Pricing summary.',
    },
    {
      caption_title: 'Contact',
      media: content.field_media,
      caption_content: 'Get in touch.',
    },
  ],
} %}
```

## Gotchas

- Per-slide `interval` is in **milliseconds** (default 5000). Omitting it falls back to the default.
- An item can use either `image_src` (URL string) or `media` (Drupal media render array). If both are passed, `media` wins.
- `id` is auto-randomized — pin it explicitly when you need stable anchors, test selectors, or referenced controls elsewhere on the page.

## Underlying Bootstrap

Bootstrap 5.3 Carousel — https://getbootstrap.com/docs/5.3/components/carousel/
