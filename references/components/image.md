# image

Renders an HTML `<img>` with Bootstrap responsive/alignment/rounded/thumbnail helpers and arbitrary utility classes or attributes.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | string | — | **Required.** Image source URL |
| `alt` | string | — | Alt text |
| `title` | string | — | `title` attribute |
| `align` | string | — | Positioning: `'float-start'`, `'mx-auto d-block'`, `'float-end'` |
| `responsive` | boolean | — | Adds `.img-fluid` (max-width:100%, auto height) |
| `rounded` | boolean | — | Adds rounded corners |
| `thumbnails` | boolean | — | Thumbnail appearance (rounded border) |
| `width` | string\|int | — | `width` attribute |
| `height` | string\|int | — | `height` attribute |
| `loading` | string | — | Native lazy loading — pass `'lazy'` |
| `image_utility_classes` | array | `[]` | Bootstrap/custom utility classes |
| `attributes` | object | `{}` | Additional raw HTML attributes |

## Slots

None — `<img>` is a void element.

## Examples

### Basic

```twig
{% include 'radix:image' with {
  src: '/path/to/image.jpg',
  alt: 'A description',
} %}
```

### Lazy-loaded hero

```twig
{% include 'radix:image' with {
  src: '/path/to/hero.jpg',
  alt: 'Hero image',
  title: 'Hero',
  align: 'mx-auto d-block',
  responsive: true,
  rounded: true,
  thumbnails: true,
  width: 1200,
  height: 600,
  loading: 'lazy',
  image_utility_classes: ['my-4'],
  attributes: { crossorigin: 'anonymous' },
} %}
```

## Gotchas

- For responsive content, set `responsive: true` (or pass `'img-fluid'` via `image_utility_classes`).
- `loading: 'lazy'` is the cheapest perf win — set it on below-the-fold images.
- For Drupal-managed images (responsive image styles, derivatives), prefer Drupal's image field rendering instead of building `radix:image` manually — let Drupal's image system handle srcset.

## Underlying Bootstrap

Bootstrap 5.3 Images — https://getbootstrap.com/docs/5.3/content/images/
