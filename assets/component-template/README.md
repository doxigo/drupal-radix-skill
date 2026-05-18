# COMPONENT_NAME

Short description of what this component does and when to use it.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `example_prop` | string | `''` | A short description of what this prop controls. |
| `COMPONENT_NAME_utility_classes` | array | `[]` | Bootstrap or custom utility classes appended to the wrapper. |

## Slots

- `default_slot` — Main content slot. Use with `{% embed %}` + `{% block default_slot %}`.

## Usage

```twig
{% include 'SUBTHEME_NAME:COMPONENT_NAME' with {
  example_prop: 'Hello',
  COMPONENT_NAME_utility_classes: ['mt-3'],
} %}
```

With a custom slot:

```twig
{% embed 'SUBTHEME_NAME:COMPONENT_NAME' %}
  {% block default_slot %}
    <p>Rich slot content.</p>
  {% endblock %}
{% endembed %}
```

## Notes

- Replace `SUBTHEME_NAME` in the include path with your subtheme's machine name.
- Replace `COMPONENT_NAME` everywhere (file names + content) when you scaffold.
- Run `drush cr` after creating or editing `*.component.yml`.
