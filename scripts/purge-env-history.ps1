Param(
  [Parameter(Mandatory=$true)]
  [string]$RemoteRepo
)

Write-Host "This script will clone a mirrored repo, remove .env from history using git-filter-repo, and force-push the cleaned repo."

if (-not (Get-Command git-filter-repo -ErrorAction SilentlyContinue)) {
  Write-Error "git-filter-repo is not available. Install via pip: pip install git-filter-repo"
  exit 1
}

$workdir = "repo-filter-temp.git"
git clone --mirror $RemoteRepo $workdir
Set-Location $workdir

Write-Host "Removing .env from history..."
git filter-repo --invert-paths --paths .env

Write-Host "Cleaning up refs and garbage..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Host "Force-pushing cleaned repo back to origin..."
git push --force

Write-Host "Done. Rotate affected keys immediately and ask collaborators to re-clone."
