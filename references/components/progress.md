# progress

Bootstrap progress bar with configurable color, height, striped/animated styles, ARIA values, and stacked-bar support.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `progress_utility_classes` | array | `[]` | Classes on the progress container |
| `progress_bar_utility_classes` | array | `[]` | Classes on the progress bar |
| `color` | string | `''` | Bootstrap color: `'primary'`, `'success'`, `'secondary'`, etc. |
| `progress_attributes` | array | `[]` | Custom attributes for the container |
| `progress_bar_attributes` | array | `[]` | Custom attributes for the bar |
| `label` | string | `''` | Visible label and `aria-label` |
| `striped` | boolean | `true` | Enables striped pattern |
| `animated` | boolean | `true` | Enables animated stripe motion |
| `stacked` | boolean | `false` | Allow rendering as part of a stacked group |
| `height` | int | `16` | Bar height in pixels |
| `valuenow` | int | `0` | Current progress value |
| `valuemin` | int | `0` | Minimum progress value |
| `valuemax` | int | `100` | Maximum progress value |

## Slots

None.

## Example

```twig
{% include 'radix:progress' with {
  color: 'secondary',
  animated: false,
  striped: false,
  label: '25% Complete'|t,
  height: 20,
  valuenow: 60,
} %}
```

### Stacked progress

```twig
<div class="progress-stacked">
  {% include 'radix:progress' with { color: 'primary',   valuenow: 30, stacked: true } %}
  {% include 'radix:progress' with { color: 'success',   valuenow: 20, stacked: true } %}
  {% include 'radix:progress' with { color: 'danger',    valuenow: 10, stacked: true } %}
</div>
```

## Gotchas

- `striped` and `animated` both default to **`true`** — pass `false` explicitly for a flat bar.
- `height` is in **pixels** (integer), not a CSS string.
- `valuenow` defaults to `0` — remember to pass the actual progress value.
- For stacked bars, render multiple `radix:progress` inside `.progress-stacked` and set `stacked: true` on each.

## Underlying Bootstrap

Bootstrap 5.3 Progress — https://getbootstrap.com/docs/5.3/components/progress/
