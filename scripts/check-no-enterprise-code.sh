#!/usr/bin/env bash
# Fails if any tracked file carries Twenty's Enterprise licence header. See FORK.md.

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# LICENSE defines the header, so it is the one file allowed to quote it.
mapfile -t marked < <(git grep -lIiE '@license[[:space:]]+enterprise' -- . ':!LICENSE' || true)

count=${#marked[@]}

if ((count == 0)); then
  echo "No files carry the Enterprise licence header."
  exit 0
fi

echo "Files with the Enterprise licence header, by package:"
printf '%s\n' "${marked[@]}" | awk -F/ '{ print ($1 == "packages" ? $2 : $1) }' | sort | uniq -c | sort -rn
echo "::error::${count} files carry the Enterprise licence header; none may."
printf '  %s\n' "${marked[@]:0:50}"
((count > 50)) && echo "  ... and $((count - 50)) more"
exit 1
