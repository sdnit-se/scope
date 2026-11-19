# Scope

Scope is the CRM the Shebang team uses. It is a fork of [Twenty](https://github.com/twentyhq/twenty), the open-source CRM, and is not affiliated with or endorsed by Twenty.com; "Twenty" is their trademark.

This repository is the source of the modified Twenty that Shebang runs, offered to everyone under the same licence as upstream: see [LICENSE](LICENSE) (AGPLv3, with the exceptions it lists).

- `main` is the official release Shebang runs (tag `twenty/v2.54.0`) plus Shebang's own changes, one reviewed commit each. See them with `git log twenty/v2.54.0..main`.
- Scope carries none of Twenty's commercially licensed code: the files Twenty marks with an Enterprise licence header (see [LICENSE](LICENSE)) were removed. `scripts/check-no-enterprise-code.sh` fails on any such file, and CI runs it on every push.
- Anything that replaces a removed feature is written from requirements, never adapted from the removed files.
- Changes that help everyone are offered back to Twenty where they fit.
