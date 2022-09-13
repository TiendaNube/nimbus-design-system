# Release process

## Overview

While our release schedule is flexible, our general strategy is to release several larger improvements inside each stable release. In order to provide faster access to fixes and enhancements between main releases we provide release candidates which are published on every merge into `master`.

While the versioning and publishing of our components is mostly automated via scripts, updates to our [documentation website](https://nimbus.nubestaging.com/overview/getting-started) is currently a manual process. We are working to improve this but for now this outline should help contributors with the process.

## Release strategy

We track versions during the pull request process. As features are added, modified or improved it's important to keep track of these via versioning.

The easiest way to track changes before raising a PR is to run `yarn bump:check --i`, this will prompt you to update the semver based on files that have been modified and will store an update file in `.yarn/versions/`, this is later consumed when publishing new versions. Be sure to check-in these files along with your code changes.

Currently also with a gihub action that also validates on each pull request if the versions have changed according to the changes made to the code.

### Release candidates

1. Run `yarn bump:check`
1. Run `yarn npm login` and supply your credentials (ensure you have access to the org scope for publishing)
1. Run `yarn publish:next`
1. Commit the resulting changes directly to `current branch`

### Publishing a stable release

Stable versions are automatically published when new changes are merged into `master`. If you want to publish a version manually, you can do so by following the candidate process, but replacing `yarn publish:next` with `yarn publish:stable`.
After merging into `master`, a new version of [our component stories](https://tiendanube.github.io/nimbus-design-system) is generated automatically.

## Updating the documentation

Our documentation is in a [separate repository](https://github.com/TiendaNube/nimbus-doc) and updating it is a three-step process:

1. Write and update the [changelog in pt-BR](https://github.com/TiendaNube/nimbus-doc/blob/devel/data/overview/pt-BR/releases.mdx)
2. Write and update the [changelog in es-AR](https://github.com/TiendaNube/nimbus-doc/blob/devel/data/overview/es-AR/releases.mdx)
3. Download package version(s) and create/update pages for each version change
4. Perform documentation updates and remove live demos from previous versions

Steps 3 and 4 are usually generated as separate pull requests to make it easier to review changes.

### Creating new version pages

This is as simple as duplicating the most recent page and updating the version number to match the release. A few things to keep in mind:

- We only provide live demos for the latest version of a package, so remember to disable/remove the previous live demo (this avoids changes that affect older versions in our docs)
- If the received version is a patch that does not require docs update, you can simply change the page name to match the new version instead of duplicating the same content
