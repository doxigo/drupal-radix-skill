# drupal-radix-cli

An interactive prompt npm package for managing Radix 6 components in a subtheme. Use it from inside your subtheme directory.

Repo: https://github.com/doxigo/drupal-radix-cli.

## Install

Two install modes — choose one per project.

### Local (recommended)

```bash
cd web/themes/custom/SUBTHEME_NAME
npm install --save-dev drupal-radix-cli
```

Then invoke via `npx`:

```bash
npx drupal-radix-cli <command>
```

This keeps the CLI version pinned in `package.json` alongside the rest of your tooling.

### Global

```bash
npm install -g drupal-radix-cli
drupal-radix-cli <command>
```

Faster to type, but version drift can bite when working on multiple subthemes.

## Commands

### `list` — see what's available

```bash
npx drupal-radix-cli list
```

Prints all components in your local Radix install (`web/themes/contrib/radix/components/`). Use this to confirm a component name before referencing it in Twig.

### `add` — copy a shipped component into your subtheme

```bash
npx drupal-radix-cli add
```

Interactive prompt. Choose one or more components. The CLI:

1. Copies `web/themes/contrib/radix/components/<name>/` → `<your-subtheme>/components/<name>/`.
2. Replaces files in place if you confirm.
3. **v1.0.8+**: also updates the `radix:` references in the relevant subtheme templates (e.g. `templates/navigation/block--local-tasks-block.html.twig`) so internal includes resolve to your subtheme override.

Custom Radix source path (useful for monorepos or non-standard layouts):

```bash
npx drupal-radix-cli add --radix-path ../../radix/components
```

After `add`:

```bash
drush cr
```

…and start editing the copied files. SDC picks up the override automatically.

### `generate` — scaffold a new custom component

```bash
npx drupal-radix-cli generate
```

Prompts for a component name and creates `components/<name>/` with:

- `<name>.twig`
- `<name>.component.yml`
- `<name>.scss`
- `_<name>.js`
- `README.md`

After scaffolding, run `drush cr` and start filling in the files. The skeleton is intentionally minimal — props, slots, and markup are yours to define.

### `--help`

```bash
npx drupal-radix-cli --help
```

Lists commands and flags.

## When to use the CLI vs. manual approach

| Task | CLI | Manual |
| --- | --- | --- |
| Copy one component into subtheme | ✓ `add` (handles template references) | `cp -r` + grep templates yourself |
| Copy many components at once | ✓ `add` (multi-select) | tedious |
| Scaffold a new component | ✓ `generate` | copy `assets/component-template/` from this skill |
| You don't have npm install access | — | manual is fine |
| You want to inspect the source first | — | `cp -r` lets you see what you're copying |

## Important caveats

- **The CLI uses your *local* Radix theme as the source.** It does not pull from npm or git. To get the latest components, first update Radix itself: `composer update drupal/radix`.
- **`add` replaces files in place after confirmation.** Commit before running it if you've already edited the component you're about to re-add.
- **`generate` doesn't pre-fill props or slots.** You define them in `*.component.yml` after scaffolding.

## CI considerations

The CLI is interactive — don't run it in CI. If you need automation, `cp -r` the components folder in a script and trust the inheritance walk.

## See also

- `components-guide.md` — what SDC components are and how overrides work
- `assets/component-template/` — the skeleton `generate` produces, mirrored locally
- `setup-and-build.md` — npm setup, DDEV considerations
