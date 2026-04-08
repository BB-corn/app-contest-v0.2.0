#!/usr/bin/env bash
set -euo pipefail

# Example script to remove .env from git history using git-filter-repo
# Requires: git-filter-repo installed (https://github.com/newren/git-filter-repo)

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo not found. Install with: pip install git-filter-repo" >&2
  exit 1
fi

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <remote-repo-url>" >&2
  exit 1
fi

REMOTE=$1
WORKDIR="repo-filter-temp.git"

echo "Cloning mirror..."
git clone --mirror "$REMOTE" "$WORKDIR"
cd "$WORKDIR"

echo "Removing .env from history..."
git filter-repo --invert-paths --paths .env

echo "Cleaning up refs and garbage..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Force-pushing cleaned repo back to origin..."
git push --force

echo "Done. Please rotate any exposed keys and inform collaborators to re-clone the repository." 
