# heading

Renders semantic HTML headings (`h1`–`h6`) with optional Bootstrap display styles, utility classes, and optional link wrapping.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `html_tag` | string | `'h1'` | Element: `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| `display` | string | — | Display heading style: `display-1` through `display-6` |
| `attributes` | Attribute | `{}` | HTML attributes for the heading |
| `heading_utility_classes` | array | `[]` | Utility classes on the heading element |
| `heading_link_utility_classes` | array | `[]` | Utility classes on the anchor when `title_link` is set |
| `title_link` | string\|URL | — | URL destination — when set, wraps the heading in an anchor |
| `content` | string\|markup | — | Heading text (often piped through `\|render\|striptags\|trim`) |

## Slots

- `content` — passed as a prop (often used via `{% include %}` with the prop, or via `{% embed %}` for richer content).

## Examples

### Page title (h1)

```twig
{% include 'radix:heading' with {
  html_tag: 'h1',
  attributes: title_attributes,
  heading_utility_classes: ['page-title'],
  content: title|render|striptags|trim,
} %}
```

### Block heading with dynamic tag

```twig
{% include 'radix:heading' with {
  html_tag: configuration.label_display ? 'h2' : 'span',
  content: label|render|striptags|trim,
} %}
```

### Display heading with hero styling

```twig
{% include 'radix:heading' with {
  html_tag: 'h2',
  display: 'display-1',
  heading_utility_classes: ['rich-heading', 'mb-2'],
  content: 'Featured updates'|t,
} %}
```

### Linked heading (typical for card titles)

```twig
{% include 'radix:heading' with {
  html_tag: 'h3',
  title_link: node.toUrl(),
  heading_utility_classes: ['card-title'],
  heading_link_utility_classes: ['stretched-link', 'text-decoration-none'],
  content: label|render|striptags|trim,
} %}
```

## Gotchas

- Always pipe Drupal render arrays through `|render|striptags|trim` when feeding `content` — otherwise you get stray markup or whitespace inside the heading.
- `html_tag` controls **semantics**; `display` controls **visual size**. They're independent. An `h2` with `display: 'display-1'` is valid and often desired for visual hierarchy without sacrificing the outline.
- `title_link` expects a plain URL string. Pass `node.toUrl()` or a route helper, not a fully-rendered link render array.
- Use `display-*` sparingly — those are for true emphasis moments (hero headings, marketing blocks), not body section headings.

## Underlying Bootstrap

Bootstrap 5.3 Typography / Display headings — https://getbootstrap.com/docs/5.3/content/typography/#display-headings
