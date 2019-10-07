# Products Engineering docs

This is a GitHub Pages site that can be seen at [https://moderntribe.github.io/products-engineering/](https://moderntribe.github.io/products-engineering/).

## Running locally

You'll need the pre-requisites as indicated on the [GitHub Pages docs](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/). Once you have those, you can get this site up and running locally pretty easily.

### Clone the repo

```
git clone git@github.com:moderntribe/products-engineering.git
```

### Serve up the pages

```
cd products-engineering
bundle exec jekyll serve
```

Should you experience problems with your local development server such as unstyled content, it may be that you need
to adjust that final command to:

```
bundle exec jekyll serve --host localhost
```

### Rebuilding search results

The documents are searchable and to rebuild the search results, you'll need to run:

```
bundle exec rake search:init
```
