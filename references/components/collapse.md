# collapse

Toggleable content region with a button (or anchor) trigger. Supports vertical or horizontal collapse direction.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | — | **Required.** Trigger button label |
| `content` | string\|block | — | **Required.** Revealed content (string or `{% block content %}` via `embed`) |
| `button_html_tag` | string | `'button'` | `'button'` or `'a'` for the trigger element |
| `id` | string\|int | — | Unique identifier — required when more than one collapse is on a page |
| `direction` | string | `'vertical'` | `'vertical'` or `'horizontal'` |
| `collapsed` | boolean | `true` | Initial state — `true` means content starts hidden |

## Slots

- `content` — can be provided as a prop on `{% include %}`, or as `{% block content %}` when using `{% embed %}`.

## Examples

### String content

```twig
{% include 'radix:collapse' with {
  title: 'Toggle details'|t,
  id: 'collapse-1',
  collapsed: true,
  content: 'This content is revealed when the user expands the panel.',
} %}
```

### Block override with nested component

```twig
{% embed 'radix:collapse' with {
  title: 'Toggle card'|t,
  id: 'collapse-card',
  direction: 'vertical',
  collapsed: true,
} %}
  {% block content %}
    {% include 'radix:card' with {
      card_title: 'Inside the collapse',
      card_body: 'Any Radix component (or arbitrary markup) works here.',
    } %}
  {% endblock %}
{% endembed %}
```

## Gotchas

- Pass a unique `id` when several collapses exist on one page — otherwise Bootstrap's `data-bs-target` selectors collide.
- `direction: 'horizontal'` requires Bootstrap's horizontal-collapse CSS (`.collapse-horizontal`). Verify it's compiled in your subtheme.
- `collapsed: false` starts the panel open (adds `.show`); the trigger button still needs the correct `aria-expanded` state — verify in browser DevTools.

## Underlying Bootstrap

Bootstrap 5.3 Collapse — https://getbootstrap.com/docs/5.3/components/collapse/
