const test = require('ava')
const sortTime = require('..')
const {sortFn, normalize} = sortTime

test('it converts s to ms', t => {
	// Regular
	t.is(normalize('1s'), 1000)
	t.is(normalize('+2s'), 2000)

	// Weird, but valid casing
	t.is(normalize('1Ms'), 1)
	t.is(normalize('1MS'), 1)
	t.is(normalize('1mS'), 1)
	t.is(normalize('1S'), 1000)

	// Floats (with leading, and non-leading digits)
	t.is(normalize('.1s'), 100)
	t.is(normalize('.01s'), 10)
	t.is(normalize('0.1s'), 100)
	t.is(normalize('2.625s'), 2625)

	// Zero values
	t.is(normalize('0s'), 0)
	t.is(normalize('0.0s'), 0)
	t.is(normalize('-0s'), -0)
	t.is(normalize('-0.0s'), -0)
	t.is(normalize('+0.0s'), 0)

	// Negative integers
	t.is(normalize('-1s'), -1000)
	t.is(normalize('-10s'), -10000)
	t.is(normalize('-5s'), -5000)

	// Negative floats
	t.is(normalize('-.1s'), -100)
	t.is(normalize('-.2s'), -200)
	t.is(normalize('-.200s'), -200)
	t.is(normalize('-3.14s'), -3140)
})

test('it does not convert ms', t => {
	// Regular
	t.is(normalize('1ms'), 1)
	t.is(normalize('+1ms'), 1)

	// Floats (with leading, and non-leading digits)
	t.is(normalize('.1ms'), 0.1)
	t.is(normalize('.01ms'), 0.01)
	t.is(normalize('0.1ms'), 0.1)
	t.is(normalize('2.625ms'), 2.625)

	// Zero values
	t.is(normalize('0ms'), 0)
	t.is(normalize('0.0ms'), 0)
	t.is(normalize('-0ms'), -0)
	t.is(normalize('-0.0ms'), -0)
	t.is(normalize('+0.0ms'), 0)

	// Negative integers
	t.is(normalize('-1ms'), -1)
	t.is(normalize('-10ms'), -10)
	t.is(normalize('-5ms'), -5)

	// Negative floats
	t.is(normalize('-.1ms'), -0.1)
	t.is(normalize('-.2ms'), -0.2)
	t.is(normalize('-.200ms'), -0.2)
	t.is(normalize('-3.14ms'), -3.14)
})

test('it sorts time', t => {
	// SortFn()
	t.deepEqual(['2s', '1s'].sort(sortFn), ['1s', '2s'])
	t.deepEqual(['2ms', '1ms'].sort(sortFn), ['1ms', '2ms'])
	t.deepEqual(['.002s', '10ms'].sort(sortFn), ['.002s', '10ms'])
	t.deepEqual(['-1s', '1s', '-2ms', '2s'].sort(sortFn), [
		'-1s',
		'-2ms',
		'1s',
		'2s'
	])

	// SortTime()
	t.deepEqual(sortTime(['2s', '1s']), ['1s', '2s'])
})

test('it sorts same-value ms before s', t => {
	t.deepEqual(['1s', '1000ms'].sort(sortFn), ['1000ms', '1s'])
	t.deepEqual(['.001s', '1ms'].sort(sortFn), ['1ms', '.001s'])
	t.deepEqual(['0s', '0ms'].sort(sortFn), ['0ms', '0s'])
	t.deepEqual(['2s', '2000ms'].sort(sortFn), ['2000ms', '2s'])
	t.deepEqual(['100ms', '0.1s'].sort(sortFn), ['100ms', '0.1s'])
})
