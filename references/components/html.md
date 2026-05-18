# html

Top-level page template wrapper. Builds the full HTML document (head, body, skip-link, page_top/page/page_bottom regions) with state-aware classes for login status, root path, and node type.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `attributes` | object | — | HTML attributes on the root element (e.g. class array, id) |
| `logged_in` | boolean | — | Whether the current user is authenticated (toggles state classes) |
| `root_path` | string | — | Page root path category — `'node'`, `'admin'`, `'user'`, etc. |
| `node_type` | string | — | Node content-type machine name when on a node page |
| `head_title` | object | — | `{ title, name, slogan }` used to assemble the document title |

## Slots

- `page_top` — region rendered at the very top of `<body>` (admin toolbar, banners)
- `page` — main page region
- `page_bottom` — region rendered at the bottom of `<body>`
- `body_end` — block for JS or markup injected just before the closing `</body>` tag

## Example

```twig
{# In templates/html.html.twig #}
{% embed "radix:html" with {
  attributes: { class: ['custom-class'], id: 'custom-page-id' },
  logged_in: logged_in,
  root_path: root_path,
  node_type: node_type,
  head_title: { title: 'Example Page'|t, name: 'My Site', slogan: 'Welcome' },
} %}
  {% block body_end %}
    <script>/* run-at-end JS */</script>
  {% endblock %}
{% endembed %}
```

## Gotchas

- Use `{% embed %}` rather than `{% include %}` because the `body_end` block (and the page regions) are populated via Twig blocks.
- In a real subtheme this component is consumed from `html.html.twig`, which Drupal already provides standard variables for. The pattern is to forward those variables directly.
- The document title (`<title>` in `<head>`) is assembled from `head_title` — pass all three keys (`title`, `name`, `slogan`) to keep Drupal's default behavior.

## Underlying Bootstrap

N/A — top-level Drupal page template scaffold.
