import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { convert, compare } from './index.js'

let test_convert = suite('convert')

test_convert('weird casing', () => {
	// Weird, but valid casing
	assert.is(convert('1Ms'), 1)
	assert.is(convert('1MS'), 1)
	assert.is(convert('1mS'), 1)
	assert.is(convert('1S'), 1000)
})

test_convert('float values (s)', () => {
	// Floats (with leading, and non-leading digits)
	assert.is(convert('.1s'), 100)
	assert.is(convert('.01s'), 10)
	assert.is(convert('0.1s'), 100)
	assert.is(convert('2.625s'), 2625)
})

test_convert('float values (ms)', () => {
	// Floats (with leading, and non-leading digits)
	assert.is(convert('.1ms'), .1)
	assert.is(convert('.01ms'), .01)
	assert.is(convert('0.1ms'), .1)
	assert.is(convert('2.625ms'), 2.625)
})

test_convert('zero values (s)', () => {
	assert.is(convert('0s'), 0)
	assert.is(convert('0.0s'), 0)
	assert.is(convert('-0s'), -0)
	assert.is(convert('-0.0s'), -0)
	assert.is(convert('+0.0s'), 0)
})

test_convert('zero values (ms)', () => {
	assert.is(convert('0ms'), 0)
	assert.is(convert('0.0ms'), 0)
	assert.is(convert('-0ms'), 0)
	assert.is(convert('-0.0ms'), 0)
	assert.is(convert('+0.0ms'), 0)
})

test_convert('negative integers (s)', () => {
	assert.is(convert('-1s'), -1000)
	assert.is(convert('-10s'), -10000)
	assert.is(convert('-5s'), -5000)
})

test_convert('negative integers (ms)', () => {
	assert.is(convert('-1ms'), -1)
	assert.is(convert('-10ms'), -10)
	assert.is(convert('-5ms'), -5)
})

test_convert('negative floats (s)', () => {
	assert.is(convert('-.1s'), -100)
	assert.is(convert('-.2s'), -200)
	assert.is(convert('-.200s'), -200)
	assert.is(convert('-3.14s'), -3140)
})

test_convert('negative floats (ms)', () => {
	assert.is(convert('-.1ms'), -.1)
	assert.is(convert('-.2ms'), -.2)
	assert.is(convert('-.200ms'), -.2)
	assert.is(convert('-3.14ms'), -3.140)
})

test_convert('exotic notations (s)', () => {
	assert.is(convert('2e3s'), 2_000_000)
	assert.is(convert('+1e1s'), 10_000)
	assert.is(convert('-3e5s'), -300_000_000)
	assert.is(convert('-3.4e-2s'), -34)
})

test_convert('exotic notations (ms)', () => {
	assert.is(convert('2e3ms'), 2_000)
	assert.is(convert('+1e1ms'), 10)
	assert.is(convert('-3e5ms'), -300_000)
	assert.is(convert('-3.4e-2ms'), -.034)
})

test_convert('converts `var(--foo)`', () => {
	// Converts `var(--foo)`
	assert.is(convert('var(--foo)'), Number.MAX_SAFE_INTEGER - 1)
	assert.is(convert('var(--foo, var(--test))'), Number.MAX_SAFE_INTEGER - 1)
	assert.is(convert('var(--foo, 1s)'), Number.MAX_SAFE_INTEGER - 1)
	assert.is(convert('var(--foo, 1ms)'), Number.MAX_SAFE_INTEGER - 1)
})

test_convert('converts unprocessable values', () => {
	// Converts unprocessable values
	assert.is(convert('fooms'), Number.MAX_SAFE_INTEGER)
	assert.is(convert('bars'), Number.MAX_SAFE_INTEGER)
})

test_convert.run()

let test_compare = suite('compare')

test_compare('it sorts time', () => {
	assert.equal(['2s', '1s'].sort(compare), ['1s', '2s'])
	assert.equal(['2ms', '1ms'].sort(compare), ['1ms', '2ms'])
	assert.equal(['.002s', '10ms'].sort(compare), ['.002s', '10ms'])
	assert.equal(['-1s', '1s', '-2ms', '2s'].sort(compare), [
		'-1s',
		'-2ms',
		'1s',
		'2s'
	])
})

test_compare('it sorts same-value ms before s', () => {
	assert.equal(['1s', '1000ms'].sort(compare), ['1000ms', '1s'])
	assert.equal(['.001s', '1ms'].sort(compare), ['1ms', '.001s'])
	assert.equal(['0s', '0ms'].sort(compare), ['0ms', '0s'])
	assert.equal(['2s', '2000ms'].sort(compare), ['2000ms', '2s'])
	assert.equal(['100ms', '0.1s'].sort(compare), ['100ms', '0.1s'])
})

test_compare('it sorts `var(--foo)` after 1s', () => {
	assert.equal(['1s', 'var(--foo)'].sort(compare), ['1s', 'var(--foo)'])
})

test_compare('it sorts `var(--foo)` before XXXXXms', () => {
	assert.equal(['XXXXXms', 'var(--foo)'].sort(compare), ['var(--foo)', 'XXXXXms'])
})

test_compare.run()
