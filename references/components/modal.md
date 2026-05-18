# modal

Bootstrap 5.3 modal dialog with configurable size, fullscreen behavior, centering, scrollability, backdrop/keyboard behavior, animations, and slot-based header/body/footer.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | string | — | `'sm'`, `'lg'`, `'xl'`, `'fullscreen'` |
| `fullscreen_responsive` | string | — | Fullscreen at breakpoint: `'sm'`, `'md'`, `'lg'`, `'xl'`, `'xxl'` |
| `vertically_centered` | boolean | — | Center dialog vertically in viewport |
| `id` | string | random | Modal element ID (auto-generated if omitted) |
| `title_id` | string | random | ID for the title element (used by `aria-labelledby`) |
| `header` | render | — | Modal header content |
| `body` | render | — | Modal body content |
| `footer` | render | — | Modal footer content |
| `title_tag` | string | `'h5'` | HTML tag for the title |
| `static_backdrop` | boolean | — | When true, backdrop clicks do **not** close the modal |
| `scrollable` | boolean | — | Enables scrolling inside the modal body on overflow |
| `keyboard` | boolean | — | Allow Escape key to close |
| `close_button` | boolean | — | Show the close (×) button in the header |
| `animation` | string | — | `'fade'`, `'slide'`, `'none'` |
| `modal_attributes` | object | — | Attributes on the outer `.modal` element |
| `modal_dialog_attributes` | object | — | Attributes on `.modal-dialog` |
| `modal_header_attributes` | object | — | Attributes on the header |
| `modal_title_attributes` | object | — | Attributes on the title |
| `modal_body_attributes` | object | — | Attributes on the body |
| `close_button_attributes` | object | — | Attributes on the close button |
| `modal_utility_classes` | array | — | Classes on the outer modal |
| `modal_dialog_utility_classes` | array | — | Classes on the dialog |
| `modal_header_classes` | array | — | Classes on the header |
| `modal_title_utility_classes` | array | — | Classes on the title |
| `modal_body_utility_classes` | array | — | Classes on the body |
| `modal_footer_utility_classes` | array | — | Classes on the footer |

## Slots

- `modal_header` — header markup (alternative to passing `header` prop)
- `modal_body` — body markup (alternative to passing `body` prop)
- `modal_footer` — footer markup (alternative to passing `footer` prop)

## Examples

### Basic

```twig
{% include 'radix:modal' with {
  id: 'exampleModal',
  header: 'Hello'|t,
  body: 'Modal body text.',
  footer: '<button class="btn btn-primary">Save</button>',
} %}

<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  {{ 'Open'|t }}
</button>
```

### Large, centered, static

```twig
{% include 'radix:modal' with {
  id: 'largeModal',
  size: 'lg',
  vertically_centered: true,
  scrollable: true,
  static_backdrop: true,
  animation: 'fade',
  modal_utility_classes: ['shadow-lg'],
  header: 'Confirm'|t,
  body: long_content,
  footer: modal_footer_buttons,
} %}
```

### Rich content via slots

```twig
{% embed 'radix:modal' with { id: 'rich', size: 'lg' } %}
  {% block modal_header %}<h2>Custom header markup</h2>{% endblock %}
  {% block modal_body %}
    {% include 'radix:card' with { card_title: 'Inside the modal', card_body: '...' } %}
  {% endblock %}
  {% block modal_footer %}
    {% include 'radix:button' with { color: 'secondary', content: 'Cancel'|t, button_utility_classes: ['me-2'] } %}
    {% include 'radix:button' with { color: 'primary', content: 'Save'|t } %}
  {% endblock %}
{% endembed %}
```

## Gotchas

- The **triggering button** needs `data-bs-toggle="modal"` + `data-bs-target="#<id>"`. Radix does not generate the trigger — you do.
- `static_backdrop: true` + `keyboard: false` produces an undismissable modal. Make sure the footer offers a way out.
- For fullscreen-on-mobile-only behavior: `fullscreen_responsive: 'md'` — fullscreen below `md`, regular dialog above.

## Underlying Bootstrap

Bootstrap 5.3 Modal — https://getbootstrap.com/docs/5.3/components/modal/
