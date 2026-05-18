# button

Bootstrap button that renders as a `<button>` or `<a>` with color, outline, size, and disabled variants.

**Include name is `radix:button` (singular)**, even though the docs page is `buttons.md`.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `html_tag` | string | `'button'` | `'button'` or `'a'` |
| `url` | string | — | Required when `html_tag` is `'a'` |
| `color` | string | — | Bootstrap color: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `light`, `link` |
| `outline` | boolean | `false` | Use outline styling instead of filled |
| `size` | string | — | `'btn-sm'` or `'btn-lg'` — full Bootstrap class name |
| `disabled` | boolean | `false` | Disable the button |
| `button_utility_classes` | array | `[]` | Extra utility classes |
| `content` | string | — | Inner text/HTML |

## Slots

`content` is passed as a prop, not a Twig block.

## Examples

### Primary button

```twig
{% include 'radix:button' with {
  html_tag: 'button',
  color: 'primary',
  content: 'Login'|t,
} %}
```

### Outlined anchor button

```twig
{% include 'radix:button' with {
  html_tag: 'a',
  color: 'primary',
  outline: true,
  content: 'Read more'|t,
  url: '/blog/test-blog1',
  button_utility_classes: ['card-link', 'float-end', 'mt-3'],
} %}
```

### Disabled link button

```twig
{% include 'radix:button' with {
  html_tag: 'a',
  color: 'primary',
  content: 'Read more'|t,
  url: '#',
  disabled: true,
} %}
```

## Gotchas

- Include name is **`radix:button`** (singular), not `radix:buttons`.
- For `size`, pass the full Bootstrap class (`'btn-sm'` / `'btn-lg'`), not just `'sm'` / `'lg'`.
- `html_tag: 'a'` + `disabled: true` adds `.disabled` styling but the link is **not actually inert**. Add `aria-disabled="true"` and `tabindex="-1"` server-side if you need true disablement.
- `color: 'link'` produces a button styled like a text link — useful for tertiary actions.

## Underlying Bootstrap

Bootstrap 5.3 Buttons — https://getbootstrap.com/docs/5.3/components/buttons/
