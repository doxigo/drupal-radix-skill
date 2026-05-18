# media

Renders a Drupal media entity with auto-generated CSS classes derived from media type, publication status, and view mode. Includes contextual links for editing.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `media` | Media entity | — | The media item being rendered |
| `content` | render array | — | Pre-built render array for the media's display |
| `view_mode` | string | — | The Drupal view mode (`'full'`, `'default'`, `'teaser'`, etc.) |

## Slots

None — content arrives via the `content` prop.

## Example

```twig
{# In templates/media/media.html.twig — Drupal already supplies these #}
{% include 'radix:media' with {
  media: media,
  content: content,
  view_mode: view_mode,
} %}
```

## Gotchas

- CSS classes are added automatically based on media type/status/view mode — avoid duplicating them manually.
- Contextual links surface only when the user has edit permissions.
- For unpublished media, the component adds a `.media--unpublished` class — style accordingly in your subtheme.

## Underlying Bootstrap

N/A — Drupal media wrapper, not a Bootstrap component.
