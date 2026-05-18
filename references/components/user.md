# user

Renders a Drupal user profile with view-mode and utility-class support.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `view_mode` | string | — | Active view mode — `'full'`, `'teaser'`, `'compact'` |
| `content` | render | — | Rendered user fields and content |
| `user_utility_classes` | array | `[]` | Utility classes applied to the wrapper |

## Slots

None documented.

## Example

```twig
{# In templates/user/user.html.twig #}
{% include 'radix:user' with {
  view_mode: view_mode,
  content: content,
  user_utility_classes: ['custom-user-class'],
} %}
```

## Gotchas

- The published docs confirm only three inputs. The component's full prop list (e.g. wrapper attributes, individual field hooks) is implicit. Read the SDC source for the exact contract:
  ```bash
  cat web/themes/contrib/radix/components/user/user.component.yml
  ```

## Underlying Bootstrap

N/A — Drupal user entity wrapper.
