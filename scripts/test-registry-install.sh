#!/bin/sh
# Installs the built registry into a fresh shadcn app for one base, once per
# icon library, and type-checks the code the user would actually receive.
#
#   sh scripts/test-registry-install.sh <base|radix|aria>
#
# Needs network access to ui.shadcn.com and the npm registry.
set -eu

BASE="${1:?usage: test-registry-install.sh <base|radix|aria>}"
ICONS="${ICONS:-lucide tabler hugeicons phosphor remixicon}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SHADCN="$ROOT/node_modules/.bin/shadcn"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

if [ ! -d "$ROOT/public/r/$BASE-nova" ]; then
  (cd "$ROOT" && npm run registry:build)
fi
ITEMS="$(node -e 'console.log(require(process.argv[1]).items.map((i) => i.name).join(" "))' "$ROOT/registry.json")"

cd "$WORK"
"$SHADCN" init --template next --base "$BASE" --preset nova --name app --yes --no-monorepo
cd app

for ICON in $ICONS; do
  echo "::group::$BASE + $ICON"
  case "$ICON" in
    lucide) PACKAGES="lucide-react" ;;
    tabler) PACKAGES="@tabler/icons-react" ;;
    hugeicons) PACKAGES="@hugeicons/react @hugeicons/core-free-icons" ;;
    phosphor) PACKAGES="@phosphor-icons/react" ;;
    remixicon) PACKAGES="@remixicon/react" ;;
    *) echo "Unknown icon library: $ICON" >&2; exit 1 ;;
  esac
  # shellcheck disable=SC2086
  npm install --no-audit --no-fund $PACKAGES
  node -e '
    const fs = require("fs");
    const config = JSON.parse(fs.readFileSync("components.json", "utf8"));
    config.iconLibrary = process.argv[1];
    fs.writeFileSync("components.json", JSON.stringify(config, null, 2));
  ' "$ICON"

  FILES=""
  for ITEM in $ITEMS; do
    FILES="$FILES $ROOT/public/r/$BASE-nova/$ITEM.json"
  done
  # shellcheck disable=SC2086
  "$SHADCN" add $FILES --yes --overwrite

  if grep -rlE "IconPlaceholder|icon-placeholder" components; then
    echo "IconPlaceholder was not replaced for $ICON" >&2
    exit 1
  fi
  npx tsc --noEmit
  echo "::endgroup::"
done
