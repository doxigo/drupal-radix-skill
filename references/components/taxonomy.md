# taxonomy

Renders a Drupal taxonomy term with vocabulary- and view-mode-aware classes plus customizable title and content blocks.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | string | — | URL of the current taxonomy term |
| `name` | string | — | Display name of the term |
| `content` | render | — | Items for the term content (fields, description) |
| `attributes` | Attribute | — | Attributes for the wrapper |
| `title_attributes` | Attribute | — | Attributes for the title element |
| `content_attributes` | Attribute | — | Attributes for the content element |
| `page` | boolean | `false` | Flag indicating full-page term view |
| `term` | Term entity | — | The taxonomy term entity |
| `view_mode` | string | — | Active view mode — `'full'`, `'teaser'`, etc. |

## Slots

- `taxonomy_title_prefix` — markup before the term title
- `taxonomy_title` — the term title block (overrideable)
- `taxonomy_title_suffix` — markup after the term title
- `taxonomy_content` — the main content block for fields/description

## Example

```twig
{# In templates/taxonomy/taxonomy-term.html.twig #}
{% include 'radix:taxonomy' with {
  name: term_name,
  url: term_url,
  content: term_content,
  attributes: attributes,
  title_attributes: title_attributes,
  content_attributes: content_attributes,
  view_mode: view_mode,
  term: term,
  page: page,
} %}
```

## Gotchas

- Classes are auto-applied based on `view_mode` and vocabulary — override via `attributes` rather than hand-rolling class strings.
- When extending, use the documented Twig blocks (`taxonomy_title_prefix`, `taxonomy_title`, `taxonomy_title_suffix`, `taxonomy_content`) inside `{% embed %}` rather than raw HTML.

## Underlying Bootstrap

N/A — Drupal taxonomy term wrapper.
