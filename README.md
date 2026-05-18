# drupal-radix-skill - an AI skill and reference pack for the Radix theme

A reusable instruction pack for AI assistants, coding agents, and prompt-driven tools that need to work with the [Radix theme for Drupal](https://www.drupal.org/project/radix). It covers Radix as a Bootstrap 5 subtheme generator with Single Directory Components (SDC), the `drupal-radix-cli` tool, and 55+ pre-built components.

The repository is packaged as a Claude-compatible skill, but the guidance, references, and templates are also useful with other LLM clients and agent tools.

The canonical skill identifier is `drupal-radix-skill`. That matches the repository directory name, which keeps it compatible with skills.sh-style registries that expect the folder name and frontmatter `name` to match.

## What it does

Use this repository whenever you're working in a Drupal 11 project that uses Radix 6.x. It is especially useful for:

- Creating subthemes (`drush radix:create`)
- Writing or modifying `{% include 'radix:component' with {...} %}` Twig
- Scaffolding new SDC components (`.component.yml` + `.twig` + `.scss` + `_*.js`)
- Overriding shipped Radix components
- Customizing `_variables.scss` or integrating Bootswatch themes
- Configuring `webpack.mix.js` / BiomeJS / BrowserSync
- Migrating from Radix 5.x to 6.x

It should **not** trigger for Radix UI / Radix Themes (the React component libraries by WorkOS/Modulz) - those are unrelated projects.

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
│   ├── migration.md                      # 5.x to 6.x migration guide
│   └── components/                       # One file per shipped component
│       ├── index.md                      # Alphabetical TOC + naming gotchas
│       ├── accordion.md
│       ├── alerts.md
│       ├── 55 more
│       └── views-view-unformatted.md
├── assets/
│   └── component-template/               # Skeleton for new custom components
└── evals/
    └── evals.json                        # Test prompts + assertions
```

## Install

### Claude Code

#### User-level

```bash
git clone https://github.com/doxigo/drupal-radix-skill.git ~/.claude/skills/drupal-radix-skill
```

Verify it's loaded:

```bash
ls ~/.claude/skills/drupal-radix-skill/SKILL.md
```

Open any Claude Code session. The skill will appear in your available skills list and trigger automatically on Radix-related work.

If you already installed this repo under `~/.claude/skills/drupal-radix`, rename that directory to `~/.claude/skills/drupal-radix-skill` so the folder matches the skill name.

#### Project-level

If you want the skill scoped to a single project:

```bash
cd /path/to/your/drupal/project
git clone https://github.com/doxigo/drupal-radix-skill.git .claude/skills/drupal-radix-skill
```

#### Update

```bash
cd ~/.claude/skills/drupal-radix-skill
git pull
```

### skills.sh

If you publish this repository publicly on GitHub, skills.sh-compatible tooling can install it directly from the repo:

```bash
npx skills add doxigo/drupal-radix-skill
```

That works because the repository directory name and the skill frontmatter name now match: `drupal-radix-skill`.

### Other AI assistants and tools

If your assistant supports reusable instructions, knowledge bases, or repo-scoped prompts, you can still use this repository directly:

- Use `SKILL.md` as the entry point.
- Let the tool load files under `references/` on demand.
- Reuse `assets/component-template/` when scaffolding custom SDC components.
- Treat the examples in this README as prompt patterns, not Claude-only syntax.

## Quick examples

Once installed, ask your assistant things like:

> *"I just installed Drupal 11 in DDEV. Walk me through creating a Radix subtheme called acme and starting the dev server."*

> *"In `node--article.html.twig`, render the article as a Radix card with image at the top, title as h2 linking to the node, and a 'Read more' link styled as a button."*

> *"Override the Radix navbar component in my subtheme so I can add a logo on the left and a search form on the right."*

> *"Scaffold a custom SDC component called `testimonial` in my Radix subtheme with quote, author_name, author_role props following Radix conventions."*

> *"I'm upgrading from Radix 5.x to 6.x. What's the right strategy and the top Bootstrap 4 to 5 class changes I'll need?"*

## Benchmark

Built and validated with [Anthropic's skill-creator](https://github.com/anthropics/skills) eval workflow. The current benchmark compares Claude with the skill loaded versus Claude without the skill on six realistic Drupal developer prompts (5 positive + 1 negative disambiguation):

| Configuration | Pass rate |
| --- | --- |
| **With skill** | **100%** (47/47 assertions) |
| Without skill | 67.6% (29/45 assertions) |
| **Delta** | **+32.4 points** |

The biggest deltas showed up in baseline runs where the model confabulated Radix-specific conventions. For example, the card component uses `card_title_tag`, `card_media`, and `card_image_cap`; without the skill, the model invented `title`, `image`, and `image_position`. Per-eval breakdown:

| Eval | with_skill | without_skill |
| --- | --- | --- |
| subtheme-creation | 100% | 43% |
| card-component-usage | 100% | 13% |
| navbar-override | 100% | 83% |
| custom-testimonial-component | 100% | 100% (tie) |
| 5x-to-6x-migration | 100% | 67% |
| negative-radix-ui-react (correctly NOT triggered) | 100% | 100% (tie) |

## Related projects

- [Radix](https://www.drupal.org/project/radix) - the Drupal theme this skill documents
- [Radix documentation](https://docs.trydrupal.com/radix) - official docs, including the `?ask=` endpoint this repository points assistants to when runtime lookup is useful
- [drupal-radix-cli](https://github.com/doxigo/drupal-radix-cli) - npm CLI for managing Radix components
- [Anthropic skill-creator](https://github.com/anthropics/skills) - the framework used to build and validate this skill

## Contributing

Issues and PRs welcome. If you find a prop name, gotcha, or workflow that's wrong or missing:

1. Open an issue describing the gap
2. Or send a PR editing the relevant file in `references/components/<name>.md` or `references/<topic>.md`

For larger changes (new sections, structural reshuffles), open an issue first so we can talk through it.

## License

MIT - see [LICENSE](LICENSE).

## Credits

Thanks to [Ramsalt](https://ramsalt.com) for sponsoring the work.
