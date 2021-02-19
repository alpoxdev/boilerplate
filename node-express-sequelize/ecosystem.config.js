module.exports = {
	apps : [{
		name: "api",
		script: "./dist/index.js",
		watch: true,
		exec_mode: "cluster",
		instances: 0,
		env: {
		  	"NODE_ENV": "development",
		},
		env_production : {
		   	"NODE_ENV": "production"
		}
	}]
}