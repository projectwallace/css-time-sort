<div align="center">
	<h1>css-time-sort</h1>
	<p>Sort an array of CSS <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/time" rel="noreferrer noopener">&lt;time&gt;</a> values.</p>
</div>

[![NPM Version](https://img.shields.io/npm/v/css-time-sort.svg)](https://www.npmjs.com/package/css-time-sort)
[![Weekly downloads](https://img.shields.io/npm/dw/css-time-sort.svg)](https://www.npmjs.com/package/css-time-sort)
[![Build Status](https://travis-ci.org/bartveneman/css-time-sort.svg?branch=master)](https://travis-ci.org/bartveneman/css-time-sort)
[![Known Vulnerabilities](https://snyk.io/test/github/bartveneman/css-time-sort/badge.svg)](https://snyk.io/test/github/bartveneman/css-time-sort)
![Dependencies Status](https://img.shields.io/david/bartveneman/css-time-sort.svg)
![Dependencies Status](https://img.shields.io/david/dev/bartveneman/css-time-sort.svg)
[![Project: Wallace](https://img.shields.io/badge/Project-Wallace-29c87d.svg)](https://www.projectwallace.com/oss)

## Installation

```sh
npm install css-time-sort
```

## Usage

```js
const cssTimeSort = require('css-time-sort')
const result = cssTimeSort(['3s', '2ms'])

// OR:

const { sortFn } = require('css-time-sort')
const result = ['3s', '2ms'].sort(sortFn)

// RESULT:
// => ['2ms', '3s']
```

## Related projects

- **[css-unit-sort](https://github.com/cssstats/cssstats/tree/master/packages/css-unit-sort)**<br>**Sort css values no matter the unit.**
