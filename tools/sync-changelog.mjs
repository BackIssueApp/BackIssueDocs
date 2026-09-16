#!/usr/bin/env node
// Regenerates releases.md from the app's CHANGELOG.md.
//
// The docs site is its own repository and GitHub Pages builds it alone, so the
// changelog cannot be read at build time — it is copied in here instead. Run
// this after tagging a release, from the docs repo:
//
//   node tools/sync-changelog.mjs [path/to/app/CHANGELOG.md]
//
// Default source is ../app/CHANGELOG.md, which is where it sits in a normal
// side-by-side checkout.

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(process.argv[2] || resolve(here, '../../app/CHANGELOG.md'));
const target = resolve(here, '../releases.md');

const raw = readFileSync(source, 'utf8');

// Everything before the first version heading is maintainer preamble.
const start = raw.indexOf('\n## [');
if (start === -1) {
  console.error(`No version headings found in ${source}`);
  process.exit(1);
}

const body = raw
  .slice(start + 1)
  .replace(/^## \[Unreleased\].*$/m,
    '## Unreleased\n\nThese changes are on the `dev` image and are not in a tagged release yet.')
  // "## [0.8.4] - 2026-09-14" and the em-dash variant both appear
  .replace(/^## \[([^\]]+)\][ \t]*[-—][ \t]*(.+)$/gm, '## $1\n\n*Released $2.*')
  .trimEnd();

const page = `---
description: "What changed in each release of BackIssue, newest first, with the version tag that matches each Docker image."
outline: 2
---

<!--
  GENERATED FILE — do not edit.
  Source: the app repository's CHANGELOG.md.
  Regenerate: node tools/sync-changelog.mjs
-->

# Release notes

What changed in each release, newest first. Every version here matches a
[\`ghcr.io/backissueapp/backissue\`](getting-started#install-with-docker-recommended)
image tag of the same number, so \`0.8.4\` in this list is the \`0.8.4\` image.

Upgrading is [pull and recreate](getting-started#updating); your data directory
carries the database, settings and installed plugins across, so nothing is lost
between versions.

Each version also has a [GitHub release](https://github.com/BackIssueApp/BackIssue/releases)
with its build attached.

${body}
`;

writeFileSync(target, page, 'utf8');
const versions = (body.match(/^## /gm) || []).length;
console.log(`Wrote ${target} (${versions} entries) from ${source}`);
