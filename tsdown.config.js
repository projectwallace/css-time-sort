import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: 'index.js',
	platform: 'neutral',
	dts: { generator: 'tsgo' },
	publint: true,
})
