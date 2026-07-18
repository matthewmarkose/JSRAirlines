#!/usr/bin/env node
/**
 * gh-pages sometimes fails to push (HTTP 400) when the pack is large.
 * Retry push from the tool's cache with a larger http.postBuffer.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cacheRoot = path.join(__dirname, '..', 'node_modules', '.cache', 'gh-pages');
if (!fs.existsSync(cacheRoot)) {
  process.exit(0);
}

const repos = fs
  .readdirSync(cacheRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => path.join(cacheRoot, d.name));

for (const repo of repos) {
  const gitDir = path.join(repo, '.git');
  if (!fs.existsSync(gitDir)) continue;

  try {
    const status = execSync('git status -sb', { cwd: repo, encoding: 'utf8' });
    if (!status.includes('ahead')) continue;

    execSync('git -c http.postBuffer=524288000 push origin gh-pages', {
      cwd: repo,
      stdio: 'inherit',
    });
    console.log('Pushed gh-pages branch successfully.');
  } catch {
    process.exit(1);
  }
}
