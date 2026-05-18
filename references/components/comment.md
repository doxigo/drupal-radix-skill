# comment

Renders a Drupal comment with user picture, metadata, title, content, and parent reference inside a card-style layout.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `user_picture` | string | — | Path to the author's avatar image |
| `user_picture_alt` | string | — | Alt text for the avatar |
| `submitted` | string\|render | — | Submission metadata (author + date) |
| `permalink` | string\|render | — | Permalink to the comment |
| `title` | string | — | Comment title/subject |
| `content` | string\|render | — | Main comment body |
| `parent` | string\|render | — | Parent comment reference |

## Slots

None — content arrives via props.

## Example

```twig
{# In templates/comment/comment.html.twig — Drupal already supplies these variables #}
{% include 'radix:comment' with {
  user_picture: user_picture,
  user_picture_alt: user_picture_alt,
  submitted: submitted,
  permalink: permalink,
  title: title,
  content: content,
  parent: parent,
} %}
```

## Gotchas

- The component adds extra classes for unpublished/JavaScript-hook styling — don't override the wrapper class entirely.
- Uses a Bootstrap row/column layout inside — make sure the surrounding theme provides the `.container` context.
- Designed to plug into Drupal's standard `comment.html.twig` variables; the documentation only enumerates names without formal type declarations.

## Underlying Bootstrap

Layout uses Bootstrap 5.3 Card patterns as the content container — https://getbootstrap.com/docs/5.3/components/card/
