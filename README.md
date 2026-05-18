# drupal-radix — a Claude skill for the Radix theme

A comprehensive [Claude Code](https://claude.com/claude-code) / [Claude.ai](https://claude.ai) skill that teaches Claude how to work with the [Radix theme for Drupal](https://www.drupal.org/project/radix) — a Bootstrap 5 subtheme generator with Single Directory Components (SDC), the `drupal-radix-cli` tool, and 55+ pre-built components.

## What it does

Use this skill whenever you're working in a Drupal 10.1+ project that uses Radix 6.x. It triggers on:

- Creating subthemes (`drush radix:create`)
- Writing or modifying `{% include 'radix:component' with {…} %}` Twig
- Scaffolding new SDC components (`.component.yml` + `.twig` + `.scss` + `_*.js`)
- Overriding shipped Radix components
- Customizing `_variables.scss` or integrating Bootswatch themes
- Configuring `webpack.mix.js` / BiomeJS / BrowserSync
- Migrating from Radix 5.x to 6.x

It will **not** trigger for Radix UI / Radix Themes (the React component libraries by WorkOS/Modulz) — those are unrelated projects.

## What's inside

```
drupal-radix-skill/
├── SKILL.md                              # Frontmatter + decision tree + workflows
├── references/
│   ├── setup-and-build.md                # Install, subtheme gen, DDEV, dev server
│   ├── subtheme-anatomy.md               # Every file/folder + purpose
│   ├── components-guide.md               # SDC pattern, .component.yml, override workflow
│   ├── bootstrap-bootswatch.md           # _variables.scss, Bootstrap Build, Bootswatch
│   ├── cli.md                            # drupal-radix-cli commands
│   ├── migration.md                      # 5.x → 6.x migration guide
│   └── components/                       # One file per shipped component
│       ├── index.md                      # Alphabetical TOC + naming gotchas
│       ├── accordion.md
│       ├── alerts.md
│       ├── …55 more
│       └── views-view-unformatted.md
├── assets/
│   └── component-template/               # Skeleton for new custom components
└── evals/
    └── evals.json                         # Test prompts + assertions
```

## Install

### Claude Code (user-level)

```bash
git clone https://github.com/doxigo/drupal-radix-skill.git ~/.claude/skills/drupal-radix
```

Verify it's loaded:

```bash
ls ~/.claude/skills/drupal-radix/SKILL.md
```

Open any Claude Code session — the skill will appear in your available skills list and trigger automatically on Radix-related work.

### Claude Code (project-level)

If you want the skill scoped to a single project:

```bash
cd /path/to/your/drupal/project
git clone https://github.com/doxigo/drupal-radix-skill.git .claude/skills/drupal-radix
```

### Update

```bash
cd ~/.claude/skills/drupal-radix
git pull
```

## Quick examples

Once installed, ask Claude things like:

> *"I just installed Drupal 10.3 in DDEV. Walk me through creating a Radix subtheme called acme and starting the dev server."*

> *"In `node--article.html.twig`, render the article as a Radix card with image at the top, title as h2 linking to the node, and a 'Read more' link styled as a button."*

> *"Override the Radix navbar component in my subtheme so I can add a logo on the left and a search form on the right."*

> *"Scaffold a custom SDC component called `testimonial` in my Radix subtheme with quote, author_name, author_role props following Radix conventions."*

> *"I'm upgrading from Radix 5.x to 6.x. What's the right strategy and the top Bootstrap 4 → 5 class changes I'll need?"*

## Benchmark

Built and validated with [Anthropic's skill-creator](https://github.com/anthropics/skills) eval workflow. Comparing Claude with the skill loaded versus baseline (no skill) on six realistic Drupal-developer prompts (5 positive + 1 negative disambiguation):

| Configuration | Pass rate |
| --- | --- |
| **With skill** | **100%** (47/47 assertions) |
| Without skill | 67.6% (29/45 assertions) |
| **Delta** | **+32.4 points** |

The biggest deltas were on prompts where Claude tends to confabulate Radix-specific conventions without the skill — e.g. the card component (`card_title_tag`, `card_media`, `card_image_cap` are the real props; without the skill the model invented `title`, `image`, `image_position`). Per-eval breakdown:

| Eval | with_skill | without_skill |
| --- | --- | --- |
| subtheme-creation | 100% | 43% |
| card-component-usage | 100% | 13% |
| navbar-override | 100% | 83% |
| custom-testimonial-component | 100% | 100% (tie) |
| 5x-to-6x-migration | 100% | 67% |
| negative-radix-ui-react (correctly NOT triggered) | 100% | 100% (tie) |

## Related projects

- [Radix](https://www.drupal.org/project/radix) — the Drupal theme this skill documents
- [Radix documentation](https://docs.trydrupal.com/radix) — official docs (the skill also teaches Claude how to query these at runtime via the `?ask=` endpoint)
- [drupal-radix-cli](https://github.com/doxigo/drupal-radix-cli) — npm CLI for managing Radix components
- [Anthropic skill-creator](https://github.com/anthropics/skills) — the framework used to build and validate this skill

## Contributing

Issues and PRs welcome. If you find a prop name, gotcha, or workflow that's wrong or missing:

1. Open an issue describing the gap
2. Or send a PR editing the relevant file in `references/components/<name>.md` or `references/<topic>.md`

For larger changes (new sections, structural reshuffles), open an issue first so we can talk through it.

## License

MIT — see [LICENSE](LICENSE).

## Author

Built by [Sohail Lajevardi](https://github.com/doxigo) — also maintainer of [drupal-radix-cli](https://github.com/doxigo/drupal-radix-cli).

Not affiliated with [Ramsalt](https://ramsalt.com), the maintainers of the Radix theme itself. This is a community skill documenting their work.
