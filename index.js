/**
 * Compare two CSS <time> values
 * @param {string} a
 * @param {string} b
 * @returns {number} 0 if equal, smaller than 0 if A is less than B, >0 if A is greater than B. `ms` will be sorted before `s`
 * @example
 * compare('1s', '2s') // -1
 * compare('1000ms', '1s') // 0
 */
export function compare(a, b) {
	const A = convert(a)
	const B = convert(b)

	// If times are the same, put ms in front of s
	if (A === B) {
		return /\d+ms$/i.test(a) ? -1 : 1
	}

	return A - B
}

/**
 * Convert a time string to ms
 * @param {string} time
 * @returns {number}
 * @example
 * convert('1s') // 1000
 * convert('1ms') // 1
 * convert('+2ms') // 2
 * convert('var(--foo)') // Number.MAX_SAFE_INTEGER - 1
 * convert('bars') // Number.MAX_SAFE_INTEGER
 */
export function convert(time) {
	if (/\d+ms$/i.test(time)) {
		return Number(time.slice(0, time.length - 2))
	}

	if (/\d+s$/i.test(time)) {
		return Number(time.slice(0, time.length - 1)) * 1000
	}

	if (time.startsWith('var(')) {
		return Number.MAX_SAFE_INTEGER - 1
	}

	return Number.MAX_SAFE_INTEGER
}
