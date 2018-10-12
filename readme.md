# Dæghrefn web site

This website hosted at https://daeghrefn.nasqueron.org/
provides an web presence to Dæghrefn, an utility bot on
Freenode.

## Purpose
- An answer to the question 'Who are you?'
- Provide a documentation

## What this repository is not

If you search the source source code of the bot:
  - At the core, it's an [eggdrop](http://www.eggheads.org/devel/)
  - It uses these [TCL scripts](https://devcentral.nasqueron.org/diffusion/VIPER/)
  - It also uses these [Python scripts](https://devcentral.nasqueron.org/diffusion/DWD/) to interact with Wikidata.

## Features

This site use the ZURB Template for use with [Foundation for Sites](http://foundation.zurb.com/sites).

It has a Gulp-powered build system with these features:

- Handlebars HTML templates with Panini
- Sass compilation and prefixing
- JavaScript concatenation
- Built-in BrowserSync server
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression

## Installation

These steps come from the Foundation ZURB template repository documentation.

### Manual Setup

To use this repository, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

To manually set up the repository, first download it with Git:

```
$ git clone https://github.com/nasqueron/daeghrefn-www daeghrefn-www
```

Then open the folder in your command line, and install the needed dependencies:

```
$ cd daeghrefn-www
$ yarn
```

Finally, run `yarn start` to run Gulp. The finished site will be created in a folder called `dist`, viewable at this URL:

```
http://localhost:8000
```

### Create locally a production-ready version

To create compressed, production-ready assets, run `yarn run build`.
