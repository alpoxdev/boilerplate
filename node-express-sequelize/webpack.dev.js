const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const config = {
	mode: 'development'
};
module.exports = merge(common, config);