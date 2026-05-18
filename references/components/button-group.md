# button-group

Group of buttons or radio inputs rendered side-by-side or stacked vertically. Supports toolbar mode for multiple sub-groups.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `vertical` | boolean | `false` | Stack vertically |
| `size` | string | `'md'` | `'sm'`, `'md'`, or `'lg'` |
| `aria_label` | string | — | Accessibility label for the group |
| `toolbar` | boolean | `false` | Render as `.btn-toolbar` containing multiple groups |
| `toolbar_aria_label` | string | — | Accessibility label when in toolbar mode |
| `items` | array | `[]` | Array of arrays — each inner array is one group (see *Item shape* below) |

### Item shape

Each inner array contains buttons or radio inputs. A button entry:

```yaml
html_tag:  'button' | 'a'
color:     string                 # bootstrap color
content:   string
```

A radio-input entry:

```yaml
type:            'input'
input_type:      'radio' | 'checkbox'
label:           string
id:              string
name:            string            # shared across radios in the same group
toggle:          boolean           # use the button-toggle styling
toggle_variant:  'outline-primary' # any Bootstrap variant
checked:         boolean
remove_wrapper:  boolean           # required for radio-toggles to look right
```

## Slots

`content` per item, supplied through the `items` array.

## Examples

### Horizontal group of buttons

```twig
{% include 'radix:button-group' with {
  size: 'lg',
  items: [
    [
      { html_tag: 'button', color: 'primary', content: 'Left'|t },
      { html_tag: 'button', color: 'primary', content: 'Middle'|t },
      { html_tag: 'button', color: 'primary', content: 'Right'|t },
    ],
  ],
} %}
```

### Vertical radio toggle group

```twig
{% include 'radix:button-group' with {
  vertical: true,
  items: [
    [
      {
        type: 'input', input_type: 'radio', label: 'First',
        id: 'first-input', name: 'vbtn-radio',
        toggle: true, toggle_variant: 'outline-danger',
        checked: true, remove_wrapper: true,
      },
      {
        type: 'input', input_type: 'radio', label: 'Second',
        id: 'second-input', name: 'vbtn-radio',
        toggle: true, toggle_variant: 'outline-danger',
        remove_wrapper: true,
      },
      {
        type: 'input', input_type: 'radio', label: 'Third',
        id: 'third-input', name: 'vbtn-radio',
        toggle: true, toggle_variant: 'outline-danger',
        remove_wrapper: true,
      },
    ],
  ],
} %}
```

## Gotchas

- `items` is an **array of arrays**. Even a single group must be wrapped twice — outer array = groups, inner = buttons in a group.
- For radio toggles, set `remove_wrapper: true` and share a common `name` so they behave as one selection.
- `size: 'md'` is the default — only pass `'sm'` or `'lg'`. There's no `'btn-md'` literal here.

## Underlying Bootstrap

Bootstrap 5.3 Button group — https://getbootstrap.com/docs/5.3/components/button-group/
