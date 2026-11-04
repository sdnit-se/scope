# Scope

Scope is the CRM the Shebang team uses. It is a fork of [Twenty](https://github.com/twentyhq/twenty), the open-source CRM, and is not affiliated with or endorsed by Twenty.com; "Twenty" is their trademark.

This repository is the source of the modified Twenty that Shebang runs, offered to everyone under the same licence as upstream: see [LICENSE](LICENSE) (AGPLv3, with the exceptions it lists).

- `main` is the official release Shebang runs (tag `twenty/v2.54.0`) plus Shebang's own changes, one reviewed commit each. See them with `git log twenty/v2.54.0..main`.
- Shebang's changes never modify files marked `/* @license Enterprise */`. Those stay exactly as Twenty publishes them, under Twenty's commercial licence.
- Changes that help everyone are offered back to Twenty where they fit.
