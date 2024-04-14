<div align="center">
	<h1>css-time-sort</h1>
	<p>Sort an array of CSS <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/time" target="_blank">&lt;time&gt;</a> values.</p>
</div>

## Installation

```sh
npm install css-time-sort
```

## Usage

```js
const cssTimeSort = require("css-time-sort");
const result = cssTimeSort(["3s", "2ms"]);

// OR:

const { sortFn } = require("css-time-sort");
const result = ["3s", "2ms"].sort(sortFn);

// RESULT:
// => ['2ms', '3s']
```

## Notes

- `var(--my-duration)` will be converted to `Number.MAX_SAFE_INTEGER - 1` so they will end up send-to-last when sorting an array
- Values that can not be converted to a number properly are converted to `Number.MAX_SAFE_INTEGER` so they will end up last when sorting an array

## Related projects

- [css-unit-sort](https://github.com/cssstats/cssstats/tree/master/packages/css-unit-sort) - Sort css values no matter the unit, by CSSStats
- [CSS Analyzer](https://github.com/projectwallace/css-analyzer) - A CSS analyzer that goes through your CSS to find all kinds of relevant statistics.
- [CSS Code Quality Analyzer](https://github.com/projectwallace/css-code-quality) -
  A Code Quality analyzer that tells you how maintainable, complex and performant your CSS is
- [Wallace CLI](https://github.com/projectwallace/wallace-cli) - CLI tool for
  @projectwallace/css-analyzer
- [Color Sorter](https://github.com/projectwallace/color-sorter) - Sort CSS colors
  by hue, saturation, lightness and opacity
