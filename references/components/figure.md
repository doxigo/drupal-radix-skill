# figure

Semantic `<figure>`/`<figcaption>` wrapper around an image (or arbitrary media) with optional alignment, caption, and utility classes.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `figure_utility_classes` | array | `[]` | Utility classes on the `<figure>` |
| `align` | string | — | `'center'`, `'start'`, or `'end'` |
| `caption` | string | — | Caption text rendered in the `<figcaption>` |
| `attributes` | Attribute | — | Additional HTML attributes on the `<figure>` |

## Slots

- `image` — block holding the `<img>` (or other media). Use `{% embed %}` + `{% block image %}`.

## Example

```twig
{% embed 'radix:figure' with {
  figure_utility_classes: ['my-3'],
  align: 'center',
  caption: 'A caption describing the context of the image.'|t,
  attributes: attributes.setAttribute('class', ['additional-class']),
} %}
  {% block image %}
    <img src="path/to/image.jpg" alt="Descriptive text" class="img-fluid">
  {% endblock %}
{% endembed %}
```

## Gotchas

- Must use `{% embed %}` (not `{% include %}`) to fill the `image` block.
- Pair with Bootstrap's `img-fluid` on the inner `<img>` for responsive scaling.

## Underlying Bootstrap

Bootstrap 5.3 Figures — https://getbootstrap.com/docs/5.3/content/figures/
