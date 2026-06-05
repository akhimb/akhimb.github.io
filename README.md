# akhimb.github.io
Website for Akhi M Balakrishnan

## Host as a static website (GitHub Pages)

This repository is ready for GitHub Pages hosting.

### 1) Push these files to GitHub

The repo now includes:

- `.github/workflows/deploy-pages.yml` for automatic deployment
- `.nojekyll` so underscore-prefixed files (like `_oktaverification.txt`) are served

### 2) Enable Pages in repository settings (one time)

In GitHub:

1. Open `Settings` -> `Pages`
2. Under `Build and deployment`, set `Source` to `GitHub Actions`

### 3) Access without custom domain

With no `CNAME` file, GitHub Pages serves the site on the default GitHub domain.

### 4) Deploy

Every push to `main` triggers deployment automatically.

After first successful run, site should be available at:

- `https://<your-github-username>.github.io/akhimb.github.io/`

If this repository is named exactly `<your-github-username>.github.io`, then the URL is:

- `https://<your-github-username>.github.io/`

### Troubleshooting

- If Pages shows 404 initially, wait 1-5 minutes and hard refresh.
- Check the `Deploy static site to GitHub Pages` workflow run in the `Actions` tab.
