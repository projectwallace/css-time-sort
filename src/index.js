const sortFn = (a, b) => {
	const A = normalize(a)
	const B = normalize(b)

	// If times are the same, put ms in front of s
	if (A === B) {
		return a.toLowerCase().endsWith('ms') ? -1 : 1
	}

	return A - B
}

const normalize = time => {
	// If it's a ms value, parse it as-is
	if (time.toLowerCase().endsWith('ms')) {
		return parseFloat(time)
	}

	// Convert s to ms
	return parseFloat(time) * 1000
}

module.exports = times => times.sort(sortFn)
module.exports.sortFn = sortFn
module.exports.normalize = normalize
