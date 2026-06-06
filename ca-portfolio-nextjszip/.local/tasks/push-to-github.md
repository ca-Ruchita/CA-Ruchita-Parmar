# Push Portfolio to GitHub

## What & Why
Push the complete CA Ruchita Parmar portfolio codebase to the GitHub repository at https://github.com/ca-Ruchita/CA-Ruchita-Parmar.git using the provided Personal Access Token.

## Done looks like
- All source files are visible at https://github.com/ca-Ruchita/CA-Ruchita-Parmar
- The latest commit (LinkedIn fix, contact form fixes, Calendly dialog, calculator tools, SMTP route) is present on the `main` branch

## Out of scope
- Setting up GitHub Actions or CI/CD
- Modifying any source code

## Steps
1. **Configure git identity** — Set git user.name and user.email for the commit author
2. **Create .gitignore if missing** — Ensure node_modules/, .next/, .env files are excluded
3. **Stage and commit any uncommitted changes** — Add .gitignore and any other untracked files, then commit with message "Initial portfolio deployment"
4. **Add GitHub remote** — Add remote named `github` pointing to `https://<GITHUB_TOKEN>@github.com/ca-Ruchita/CA-Ruchita-Parmar.git` using the GITHUB_TOKEN environment secret
5. **Push to GitHub** — Push the `main` branch to the `github` remote, using `--force` only if the remote has conflicts from a fresh/empty repo

## Relevant files
- `.gitignore`
- `src/`
- `public/`
- `package.json`
- `next.config.mjs`
- `tsconfig.json`
