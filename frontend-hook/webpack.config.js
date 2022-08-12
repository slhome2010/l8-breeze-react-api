var path = require("path");
var webpack = require("webpack");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (env) {

    var pack = require("./package.json");
    env.use(createProxyMiddleware('/proxypath', { target: '<target path>' }));

    var config = {
        devtool: "source-map",
        watch: true,
        resolve: {
            extensions: ['js', 'ts', 'jsx', 'tsx'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@components': path.resolve(__dirname, 'src/components')
                // ...etc
            },
        }
    }


    return config;
};