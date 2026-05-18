# views-view

Renders a Drupal Views display with header, footer, exposed filters, pager, attachments, and empty-state regions.

**Include name uses double-dash: `radix:view-view`** (single "view" first, "view" second — and the SDC name is hyphenated `view-view`, not `views-view`).

Update: depending on Radix version, the include name may be `radix:view-view` or `radix:views-view`. Verify against your installed theme:

```bash
ls web/themes/contrib/radix/components/ | grep view
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string\|markup | — | View title |
| `header` | render | — | Header region content |
| `footer` | render | — | Footer region content |
| `rows` | render | — | Rendered rows |
| `empty` | render | — | Content shown when the view has no results |
| `pager` | render | — | Pager render array |
| `exposed` | render | — | Exposed filters block |
| `feed_icons` | render | — | Feed icons render array |
| `more` | render | — | "More" link content |
| `attachment_before` | render | — | Attached view rendered before the main rows |
| `attachment_after` | render | — | Attached view rendered after the main rows |
| `css_name` | string | — | CSS-safe machine name of the view |
| `dom_id` | string | — | Unique DOM id for the view instance |
| `view_view_utility_classes` | array | `[]` | Utility classes applied to the wrapper |

## Slots

None.

## Example

```twig
{# In templates/views/views-view.html.twig #}
{% include 'radix:view-view' with {
  title: title,
  header: header,
  rows: rows,
  footer: footer,
  empty: empty,
  pager: pager,
  exposed: exposed,
  feed_icons: feed_icons,
  more: more,
  attachment_before: attachment_before,
  attachment_after: attachment_after,
  css_name: css_name,
  dom_id: dom_id,
  view_view_utility_classes: ['my-view'],
} %}
```

## Gotchas

- Name mismatch is the top reported issue — the docs page is `views-view.md` but the SDC include path differs. Check `ls web/themes/contrib/radix/components/` to confirm.
- Related variants exist for specific style plugins: `radix:views-view--grid`, `radix:views-view--table`, `radix:views-view--unformatted`. Use those for grid/table/unformatted style displays respectively.
- This is the "outer" wrapper — the per-row markup is handled by the style plugin's own component.

## Underlying Bootstrap

N/A — Drupal Views wrapper.
