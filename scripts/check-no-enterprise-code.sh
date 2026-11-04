#!/usr/bin/env bash
# Fails if any tracked file carries Twenty's Enterprise licence header. See FORK.md.
#
# Usage: scripts/check-no-enterprise-code.sh [--max <count>]
#   --max <count>  pass while at most <count> marked files remain, so CI can ratchet
#                  the count down as areas are removed; omit it to require zero.

set -euo pipefail

max=0
if [[ "${1:-}" == "--max" ]]; then
  max="${2:?--max needs a number}"
fi

cd "$(git rev-parse --show-toplevel)"

# LICENSE defines the header, so it is the one file allowed to quote it.
mapfile -t marked < <(git grep -lIiE '@license[[:space:]]+enterprise' -- . ':!LICENSE' || true)

count=${#marked[@]}

if ((count > 0)); then
  echo "Files with the Enterprise licence header, by package:"
  printf '%s\n' "${marked[@]}" | awk -F/ '{ print ($1 == "packages" ? $2 : $1) }' | sort | uniq -c | sort -rn
  lines=$(cat -- "${marked[@]}" | wc -l)
  echo "Total: ${count} files, ${lines} lines"
else
  echo "No files carry the Enterprise licence header."
fi

if ((count > max)); then
  echo "::error::${count} files carry the Enterprise licence header; the limit is ${max}."
  printf '  %s\n' "${marked[@]:0:50}"
  ((count > 50)) && echo "  ... and $((count - 50)) more"
  exit 1
fi
