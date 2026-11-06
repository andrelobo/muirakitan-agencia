#!/usr/bin/env bash
# pr-auto.sh — Automatiza: main atualizada → branch → commit → push → PR → merge (squash) → cleanup
#
# Uso:
#   ./pr-auto.sh <branch-name> <commit-msg> <pr-title> [pr-body]
#
# Exemplo:
#   ./pr-auto.sh feat/nova-funcionalidade \
#     "feat(ui): adiciona botão" \
#     "Adiciona botão na hero" \
#     "Closes #123"
#
# Modo dry-run (só mostra o que faria, sem executar):
#   DRYRUN=1 ./pr-auto.sh ...

set -euo pipefail

BRANCH_NAME="${1:-}"
COMMIT_MSG="${2:-}"
PR_TITLE="${3:-}"
PR_BODY="${4:-"Automatizado via pr-auto.sh"}"
DRYRUN="${DRYRUN:-0}"

# --- validação de argumentos ---
if [[ -z "$BRANCH_NAME" || -z "$COMMIT_MSG" || -z "$PR_TITLE" ]]; then
  cat <<'USAGE'
Uso: pr-auto.sh <branch-name> <commit-msg> <pr-title> [pr-body]

Argumentos:
  branch-name   Ex.: feat/nova-funcionalidade (ou fix/, docs/, chore/...)
  commit-msg    Ex.: "feat(escopo): mensagem clara"
  pr-title      Título do Pull Request
  pr-body       (opcional) Corpo do Pull Request

Variáveis:
  DRYRUN=1      Mostra os comandos sem executar
  MERGE=merge   Usa merge commit em vez de squash (padrão: squash)
USAGE
  exit 1
fi

# --- helpers ---
run() {
  if [[ "$DRYRUN" == "1" ]]; then
    echo "  [dry-run] $*"
  else
    "$@"
  fi
}

have() { command -v "$1" >/dev/null 2>&1; }

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

MERGE_METHOD="${MERGE:-squash}"   # squash | merge | rebase

echo "🔎 Preflight..."
have gh || { echo "❌ gh CLI não encontrado. Instale: https://cli.github.com/"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "❌ gh não autenticado. Rode: gh auth login"; exit 1; }
git diff --cached --quiet || echo "⚠️  Há alterações já em staging; elas entrarão no commit."
echo "  ✓ gh autenticado, repo: $(git rev-parse --show-toplevel)"

# 1. Garante main atualizada
echo "🔄 Atualizando main..."
run git checkout main -q
run git pull -q --ff-only

# 2. Cria branch
echo "🌿 Criando branch: $BRANCH_NAME"
if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  echo "❌ Branch local '$BRANCH_NAME' já existe. Escolha outro nome."
  exit 1
fi
run git checkout -b "$BRANCH_NAME" -q

# 3. Stage + commit
echo "📦 Commitando alterações..."
run git add -A
if git diff --cached --quiet; then
  echo "⚠️  Nada para commitar. Abortando e voltando para a main."
  run git checkout main -q
  run git branch -D "$BRANCH_NAME" -q
  exit 1
fi
run git commit -m "$COMMIT_MSG" -q

# 4. Push
echo "🚀 Push para origin/$BRANCH_NAME..."
run git push -u origin "$BRANCH_NAME" -q

# 5. Cria PR
echo "📝 Criando PR..."
if [[ "$DRYRUN" == "1" ]]; then
  echo "  [dry-run] gh pr create --title \"$PR_TITLE\" ..."
  PR_URL="(dry-run)"
else
  PR_URL=$(gh pr create \
    --title "$PR_TITLE" \
    --body "$PR_BODY" \
    --base main \
    --head "$BRANCH_NAME")
fi
echo "✅ PR criado: $PR_URL"

# 6. Merge
echo "🔀 Merge ($MERGE_METHOD) + delete branch remota..."
run gh pr merge "$PR_URL" "--$MERGE_METHOD" --delete-branch

# 7. Cleanup local
echo "🧹 Limpando branch local..."
run git checkout main -q
run git pull -q --ff-only
run git branch -D "$BRANCH_NAME" -q 2>/dev/null || true

echo "🎉 Concluído!"
if [[ "$DRYRUN" != "1" ]]; then
  echo "   Último commit na main: $(git log -1 --pretty=format:'%h %s')"
fi
