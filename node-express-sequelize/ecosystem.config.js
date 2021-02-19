module.exports = {
	apps : [{
		name: 'api',
		script: './dist/index.js',
		watch: true,
		exec_mode: 'cluster',
		instances: 0,
	}]
}