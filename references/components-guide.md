# Components guide

Radix builds on Drupal core's Single Directory Components (SDC) — each component is a self-contained folder with five files. This page covers the SDC pattern as Radix uses it: the `.component.yml` schema, the `radix:` namespace, the `*_utility_classes` convention, how overrides work, and how to create new components.

If you want a per-component lookup (props, slots, examples), see `references/components/<name>.md` instead.

## Anatomy of an SDC component

A Radix component lives at `components/<name>/` with these files:

```
components/<name>/
├── <name>.twig                # template (REQUIRED)
├── <name>.component.yml       # schema (REQUIRED — even if empty)
├── <name>.scss                # styles (compiled to <name>.css)
├── _<name>.js                 # source JS (leading underscore)
└── README.md                  # docs + example usage
```

Optional: static assets (images, fonts) directly inside the component folder. Reference them in Twig with `{{ '/path/to/component-asset.png' }}` — paths resolve relative to the component folder when emitted by SDC.

### `<name>.component.yml` schema

This file tells Drupal core's SDC subsystem what the component accepts. Minimum viable file:

```yaml
'$schema': https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: My Component
status: stable
```

Full shape with props, slots, and library overrides:

```yaml
'$schema': https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Card
description: Bootstrap card component
status: stable           # stable | experimental | deprecated | obsolete

# Typed inputs — primitive values, validated by core
props:
  type: object
  properties:
    card_title:
      type: string
      title: 'Card title'
      description: 'Heading text inside the card body.'
    card_title_tag:
      type: string
      title: 'Card title HTML tag'
      enum: [h1, h2, h3, h4, h5, h6, div, span]
      default: 'h5'
    card_border:
      type: boolean
      default: true
    card_utility_classes:
      type: array
      items:
        type: string
  required:
    - card_title

# Renderable content blocks (markup/render arrays)
slots:
  card_body:
    title: 'Card body'
    description: 'Main content area. Can be a render array, string, or markup.'
  card_header:
    title: 'Card header'

# Library overrides — load extra CSS/JS only when this component renders
libraryOverrides:
  dependencies:
    - core/once
    - SUBTHEME_NAME/some-other-library
  js:
    custom-script.js: {}
```

Key distinctions:

- **Props** = primitives (strings, numbers, booleans, arrays of primitives). Validated at render time. Use for configuration.
- **Slots** = renderable content. Anything that wants to be markup, a render array, or another component goes here.
- **`status: stable` vs `experimental`** — affects the warning Drupal shows when you call the component from another theme. Stable for things you ship.

After editing `*.component.yml`, run `drush cr` for SDC to pick up the new schema.

## Including a component in Twig

The canonical pattern:

```twig
{% include 'radix:card' with {
  card_title: 'Hello',
  card_title_tag: 'h3',
  card_body: 'This is the body.',
  card_utility_classes: ['mt-3', 'shadow-sm'],
} %}
```

Three things to know:

1. **`radix:` is the namespace.** It corresponds to whichever theme owns the component. When you override `card` in your subtheme, SDC walks the inheritance chain and finds *your* card first — so `{% include 'radix:card' %}` keeps working but now resolves to your override. You don't change include statements when overriding.

2. **For your *own* new components, use your subtheme's namespace:**
   ```twig
   {% include 'SUBTHEME_NAME:testimonial' with { ... } %}
   ```
   The namespace is whatever your subtheme's `info.yml` declares — by convention, the subtheme name.

3. **Slot content via Twig's `{% block %}` syntax:**

   ```twig
   {% embed 'radix:card' with { card_title: 'Hi' } %}
     {% block card_body %}
       <p>This is rich content with <strong>markup</strong>.</p>
       {{ content.field_image }}
     {% endblock %}
   {% endembed %}
   ```

   `{% include %}` works for prop-only usage; `{% embed %}` is the way to fill slots with arbitrary Twig.

## The `*_utility_classes` convention

Every shipped Radix component accepts an array prop named `<component>_utility_classes` (or `<component>_item_utility_classes` for repeating items). This is the supported way to pass Bootstrap utility classes from your template without modifying the component itself.

```twig
{% include 'radix:button' with {
  color: 'primary',
  content: 'Submit',
  button_utility_classes: ['mt-3', 'w-100', 'text-uppercase'],
} %}

{% include 'radix:accordion' with {
  items: [...],
  accordion_utility_classes: ['shadow-sm'],
  accordion_item_utility_classes: ['border-0'],
} %}
```

When you author new components, follow the same convention — your callers will thank you.

## Overriding a Radix-shipped component

Use this when the markup of a shipped component doesn't fit and changing props isn't enough.

### Option A — `drupal-radix-cli` (recommended, v1.0.8+)

```bash
cd web/themes/custom/SUBTHEME_NAME
npx drupal-radix-cli add
# interactive prompt: pick the component(s) to copy
```

The CLI also rewrites the relevant template files in your subtheme (e.g. `templates/navigation/block--local-tasks-block.html.twig`) so internal includes resolve to your subtheme instead of the parent. With older CLI versions or when overriding components used in many places, double-check those template references manually.

### Option B — manual

```bash
cd web/themes/custom/SUBTHEME_NAME
cp -r ../../contrib/radix/components/navbar components/
drush cr
# Edit components/navbar/*.twig, *.scss, _*.js however you need
```

After the copy, SDC's inheritance walk picks up your version automatically when anything resolves `radix:navbar`. **Don't** rename the component during the override — if you keep the name `navbar`, every existing `{% include 'radix:navbar' %}` and every shipped Radix template that includes `radix:navbar` will now use yours.

If you *do* rename it (e.g. `navbar-acme`), grep your templates for `'radix:navbar'` and change them to `'SUBTHEME_NAME:navbar-acme'`.

### What to override vs. what to compose

| Goal | Approach |
| --- | --- |
| Add a utility class to one instance | `<name>_utility_classes` prop |
| Add a utility class to all instances | Component override OR a preprocess function |
| Restructure markup | Component override |
| Add an entirely new slot | Component override (modify `*.component.yml` + Twig) |
| Use a different Bootstrap variant globally | `_variables.scss` (see `bootstrap-bootswatch.md`) |
| Compose into a bigger pattern | Wrap with your own component in `{% embed %}` |

## Creating a new custom component

### Option A — `drupal-radix-cli generate`

```bash
cd web/themes/custom/SUBTHEME_NAME
npx drupal-radix-cli generate
# follow prompts — produces components/<name>/ with all five files
drush cr
```

### Option B — copy `assets/component-template/` from this skill

```bash
cp -r /Users/doxigo/.claude/skills/drupal-radix/assets/component-template \
      web/themes/custom/SUBTHEME_NAME/components/testimonial

cd web/themes/custom/SUBTHEME_NAME/components/testimonial

# Rename files
for f in *; do mv "$f" "${f//COMPONENT_NAME/testimonial}"; done

# Edit each file — replace COMPONENT_NAME inside content too
# Then:
drush cr
```

Then use it:

```twig
{% include 'SUBTHEME_NAME:testimonial' with {
  quote: 'Best decision we made all year.',
  author: 'Jane Smith',
  author_role: 'CTO',
  author_image: '/path/to/headshot.jpg',
  testimonial_utility_classes: ['mb-4'],
} %}
```

### Component naming rules

- Folder name, file name, and `name:` in `*.component.yml` should all be the same machine name.
- Lowercase, hyphenated (e.g. `card-feature`, not `cardFeature` or `card_feature`).
- Match the convention of the existing Radix components (singular, descriptive).

### When you need JavaScript

Put your source in `_<name>.js` (note the leading underscore). Mix compiles it to `<name>.js` (no underscore) — that compiled file is what Drupal loads via SDC's auto-library mechanism. Wrap in `Drupal.behaviors`:

```javascript
((Drupal, once) => {
  Drupal.behaviors.testimonial = {
    attach(context) {
      once('testimonial', '.testimonial', context).forEach((el) => {
        // ...
      });
    },
  };
})(Drupal, once);
```

### When you need extra CSS/JS dependencies

Declare them in `*.component.yml` under `libraryOverrides` rather than editing the global `*.libraries.yml`:

```yaml
libraryOverrides:
  dependencies:
    - core/drupal.dialog
  js:
    extra-helper.js: {}
```

This keeps per-component dependencies local to the component.

## Best practices

1. **Compose, don't fork.** Reach for component override only when no combination of props gets you there.
2. **Prefer slots over rich props.** If a value could be markup or a render array, make it a slot.
3. **Type your props.** `enum` for fixed lists, `boolean` for flags, `array.items.type` for arrays. Drupal validates and you get clearer dev errors.
4. **Always include a `<name>_utility_classes` prop.** It's the supported escape hatch your future self and other authors will need.
5. **Default to `status: stable` for shipped components.** Use `experimental` only when you genuinely expect the API to change.
6. **One concern per component.** A card that also handles navigation is two components in a trench coat.
7. **Document with README.md.** Even a brief one — props, slots, one usage example. Future-you (or your team) will thank you.

## Common errors

| Error | Cause |
| --- | --- |
| `Component "radix:foo" does not exist` | Wrong namespace; `drush cr` not run; component folder missing the `.component.yml` |
| `Property "bar" is not defined` (strict mode) | Prop not declared in `*.component.yml`; typo |
| `Invalid prop value for "bar"` | Prop type mismatch — check the `type:` and `enum:` in YAML |
| Override not picked up | `drush cr` not run; or the component folder name differs from the parent's name |
| `_<name>.js` changes don't apply | Mix watcher not running, or `<name>.js` is stale in `build/`. Restart `npm run watch`. |

## See also

- `references/components/index.md` — alphabetical index of all 50+ shipped Radix components
- `references/components/<name>.md` — per-component props/slots/examples
- `cli.md` — `drupal-radix-cli` commands
- `assets/component-template/` — skeleton you can copy to scaffold a new component
- [Drupal SDC docs](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components-as-the-templating-engine)
