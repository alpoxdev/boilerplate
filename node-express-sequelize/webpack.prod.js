const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const config = {};
module.exports = merge(common, config);