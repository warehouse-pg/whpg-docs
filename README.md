# whpg-docs

This repository contains the documentation website for WarehousePG. The live
site is published at https://warehouse-pg.io, powered by GitHub pages, which
is deployed from the contents of the `deploy` branch of this repository.

Currently, there are no "preview" environments because GitHub only supports
one GitHub-pages subdomain per repository. Thus, we use GitHub pages for the
live production site. Eventually we will add Netlify or some other solution
for deploying preview environments with each new Pull Request.

The documentation for the EDB enterprise-grade support service is available
at the EDB website, under [EDB Postgres AI - Support for Greenplum Workloads](https://www.enterprisedb.com/docs/supported-open-source/warehousepg/).

## Deploying the docs

The live site is built from the `deploy` branch of this repository. This way we
can push to the `main` branch more frequently than we deploy the site, and we
only deploy the site when we explicitly choose to do so.

To deploy the site, open a pull request from `main` into `deploy`. In other
words, open a PR to the `deploy` branch with the changes on `main` that do not
already exist in `deploy` (i.e., the changes that have been pushed to `main`
since the last deployment).

🚀 [Click Here to Start a Deployment](https://github.com/warehouse-pg/whpg-docs/compare/deploy...bsmith-testing?expand=1&title=Publish%20changes%20from%20main%20branch%20to%20the%20live%20website%20on%20GitHub%20pages&labels=deploy&body=This%20pull%20request%20contains%20changes%20to%20be%20published%20to%20the%20live%20GitHub%20pages%20site%20powering%20whpg.io.%20When%20you%20merge%20the%20pull%20request,%20it%20will%20trigger%20a%20workflow%20to%20publish%20the%20changes%20to%20the%20site.)

Clicking that link will open the Pull Request editor where you can review the
changes that will be deployed. Create the pull request. When you're ready to
deploy it, click the Merge button.

## Editing the docs

To make edits to the docs, please open a pull request to the repository, targeting
the `main` branch. If you're an external contibutor, you can do this by forking
the repository. If you're an internal contributor (with write access to this
repository), then you should follow the typical Git workflow of pushing changes
to a branch with a descriptive name and then opening a Pull Request from that branch
targeting the `main` branch.

For example, you might use something like this workflow:

```bash
# Initialize the repository if you haven't already
git clone https://github.com/warehouse-pg/whpg-docs.git
cd whpg-docs

# Create a new branch for your edits
git checkout -b chore/descriptive-branch-name-for-your-changes
#     ....
#     (....make your edits.....)
#     ....

# Commit your changes to the branch
git add .
git commit -m "Made some changes to the documentation"

# Ensure your branch is based on the latest changes to main
git fetch --all
git rebase origin/main

# Push your branch (ensuring you match the branch name)
git push --set-upstream origin chore/descriptive-branch-name-for-your-changes

# .....
# Go to https://github.com/warehouse-pg/whpg-docs
# and open a new PR from your branch into `main`
# .....

# Cleanup: go back to the main branch, pull latest updates
git checkout main
git pull

# (optional) Delete your branch
git branch -D chore/descriptive-branch-name-for-your-changes
```

## Editing the docs locally

This documentation site uses [Vitepress](https://vitepress.dev/).

To install the recommended tooling, ensure you are using at least Node v20.

```bash
# Initialize the repository if you haven't already
git clone https://github.com/warehouse-pg/whpg-docs.git
cd whpg-docs

# Install
npm install
```

To run the developemnt server with hot-reload, simply:

```bash
npm docs:dev
```

Then you can access the development site at the URL printed in your terminal,
which is usually `http://localhost:5173`. Hot reload works out of the box, so
you can edit any file - Markdown, theme, or otherwise - and the site will
update.
