import { defineConfig } from 'tsdown'
import { codecovRollupPlugin } from '@codecov/rollup-plugin'

export default defineConfig({
	entry: 'index.js',
	platform: 'neutral',
	dts: true,
	publint: true,
	plugins: [
		codecovRollupPlugin({
			enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
			bundleName: 'cssTimeSort',
			uploadToken: process.env.CODECOV_TOKEN,
		}),
	],
})
