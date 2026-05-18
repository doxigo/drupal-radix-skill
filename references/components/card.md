# card

Flexible content container with optional header, footer, body, media, and link. Used for teasers, summaries, and feature blocks.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `card_header` | string\|markup | — | Header content |
| `card_footer` | string\|markup | — | Footer content |
| `card_title` | string | — | Title text |
| `card_subtitle` | string | — | Subtitle text |
| `card_body` | string\|markup | — | Body content |
| `card_text` | string | — | Paragraph text rendered with `card_text_tag` |
| `card_link_url` | string | — | URL for the card's primary link |
| `card_link_text` | string | — | Label for the card link |
| `card_media` | render array | — | Drupal media render array (overrides `card_image_*` if provided) |
| `card_image_src` | string | — | Image URL (when not using `card_media`) |
| `card_image_alt` | string | — | Image alt text |
| `card_image_cap` | string | — | `'top'` or `'bottom'` |
| `card_image_overlays` | boolean | `false` | Render image as background overlay instead of cap |
| `card_body_tag` | string | — | HTML tag for the body container |
| `card_title_tag` | string | — | HTML tag for the title |
| `card_subtitle_tag` | string | — | HTML tag for the subtitle |
| `card_text_tag` | string | — | HTML tag for the text element (typically `'p'`) |
| `card_border` | boolean | `true` | `false` for borderless |
| `card_utility_classes` | array | `[]` | Classes on the card wrapper |
| `card_link_utility_classes` | array | `[]` | Classes on the card link |
| `card_title_prefix` | render | — | Drupal `title_prefix` (preserve for contextual links) |
| `card_title_suffix` | render | — | Drupal `title_suffix` (preserve for contextual links) |

## Slots

None — all content provided via props. Use `card_media` (render array) or `card_body` (markup) for rich content.

## Examples

### Article teaser from a node template

```twig
{% include 'radix:card' with {
  card_title_tag: 'h4',
  card_title: label,
  card_header: 'Featured'|t,
  card_footer: 'Updated ' ~ date,
  card_body_tag: 'div',
  card_body: 'This is the card body.'|t,
  card_text_tag: 'p',
  card_link_url: url,
  card_link_text: 'Read more...'|t,
  card_border: false,
  card_utility_classes: [
    'col-4',
    title_suffix.contextual_links ? 'contextual-region',
  ],
  card_link_utility_classes: ['btn-primary'],
  card_media: content.field_media,
  card_image_cap: 'bottom',
  card_title_prefix: title_prefix,
  card_title_suffix: title_suffix,
} %}
```

### Simple card with image cap

```twig
{% include 'radix:card' with {
  card_title: 'Plan A'|t,
  card_title_tag: 'h3',
  card_image_src: '/themes/custom/acme/images/plan-a.jpg',
  card_image_alt: 'Plan A illustration',
  card_image_cap: 'top',
  card_body: '$29/mo with everything you need.',
  card_link_url: '/signup?plan=a',
  card_link_text: 'Get started'|t,
} %}
```

## Gotchas

- `card_media` **overrides** `card_image_src` / `card_image_alt` when both are passed. Pick one.
- When rendering from a node template, always pass `card_title_prefix: title_prefix` and `card_title_suffix: title_suffix` to preserve contextual links and admin overlays.
- `card_image_cap` only accepts `'top'` or `'bottom'`. For an overlay, set `card_image_overlays: true` instead.

## Underlying Bootstrap

Bootstrap 5.3 Card — https://getbootstrap.com/docs/5.3/components/card/
