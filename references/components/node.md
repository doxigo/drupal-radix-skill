# node

Renders a Drupal node with dynamic classes reflecting content type, view mode, and node status (promoted, sticky, unpublished).

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `node` | Node entity | — | The full node object |
| `attributes` | Attribute | — | Attributes for the wrapper element |
| `content` | render array | — | Rendered node content/fields |
| `label` | string | — | Node title/label |
| `url` | string | — | Canonical URL for the node |
| `display_submitted` | boolean | — | Whether to show author + date submission metadata |
| `author` | mixed | — | Author info (rendered or render array) |
| `date` | mixed | — | Publication date |

## Slots

None — content arrives via the `content` prop.

## Example

```twig
{# In templates/node/node.html.twig — Drupal already supplies these #}
{% include 'radix:node' with {
  node: node,
  attributes: attributes,
  content: content,
  label: label,
  url: url,
  display_submitted: display_submitted,
  author: author,
  date: date,
} %}
```

## Gotchas

- Intended to be used from a Drupal node template (`node.html.twig`) where these variables are already in scope.
- Classes are applied dynamically based on content type (`node--type-article`), view mode (`node--view-mode-full`), and status flags (`node--promoted`, `node--sticky`, `node--unpublished`).
- For per-content-type templates, create `node--<type>.html.twig` and include this component with the same props.
- To override the markup entirely, override the SDC component in your subtheme rather than skipping it.

## Underlying Bootstrap

N/A — Drupal node rendering wrapper.
