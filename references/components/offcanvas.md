# offcanvas

Bootstrap 5.3 offcanvas (slide-in panel) with a toggle button, title, body, optional close button, and backdrop.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `offcanvas_title` | string | `''` | Title text |
| `offcanvas_title_tag` | string | `'h5'` | HTML tag for the title |
| `offcanvas_content` | string | `''` | Main content text |
| `offcanvas_button_content` | string | `''` | Toggle button label |
| `close_button` | boolean | `true` | Show the close button |
| `body_scrolling` | boolean | `false` | Allow page body to scroll while offcanvas is open |
| `backdrop` | string | `'true'` | Backdrop behavior — `'true'`, `'false'`, or `'static'` |
| `offcanvas_utility_classes` | array | `[]` | Classes on the offcanvas container |
| `offcanvas_title_utility_classes` | array | `[]` | Classes on the title |
| `offcanvas_content_utility_classes` | array | `[]` | Classes on the content body |
| `offcanvas_button_utility_classes` | array | `[]` | Classes on the toggle button |
| `offcanvas_title_attributes` | array | `[]` | Extra attrs for the title |
| `offcanvas_content_attributes` | array | `[]` | Extra attrs for the content body |
| `offcanvas_button_attributes` | array | `[]` | Extra attrs for the toggle button |
| `offcanvas_attributes` | array | `[]` | Extra attrs for the container |

## Slots

None — content passed via `offcanvas_content`.

## Example

```twig
{% include 'radix:offcanvas' with {
  offcanvas_title_tag: 'h4',
  offcanvas_title: 'Offcanvas'|t,
  offcanvas_content: 'Some text as placeholder.',
  offcanvas_button_content: 'Toggle'|t,
  close_button: true,
  body_scrolling: true,
} %}
```

### Disable backdrop and force open

```twig
{% include 'radix:offcanvas' with {
  offcanvas_title: 'Filters'|t,
  offcanvas_content: filter_html,
  backdrop: 'static',
  body_scrolling: false,
} %}
```

## Gotchas

- `backdrop` is a **string** (default `'true'`), not a boolean. Pass `'false'` to disable, `'static'` for a non-dismissable backdrop.
- `offcanvas_content` is treated as a string in docs. For rich HTML, render the content separately upstream and pass markup.
- Placement (start/end/top/bottom) is controlled via Bootstrap classes — pass `'offcanvas-end'`, `'offcanvas-top'`, etc. through `offcanvas_utility_classes`.

## Underlying Bootstrap

Bootstrap 5.3 Offcanvas — https://getbootstrap.com/docs/5.3/components/offcanvas/
