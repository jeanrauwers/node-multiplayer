const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function (env, argv) {
    const isDevMode = argv.mode !== 'production';
    const plugins = [new CleanWebpackPlugin()];

    plugins.push(
        new HtmlWebpackPlugin({
            filename: './index.html',
            hash: true,
            template: './src/template/index.html'
        })
    );

    return {
        entry: {
            main: './src/client.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.css', '.scss']
        },
        devtool: isDevMode ? 'eval-source-map' : 'hidden-source-map',

        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loaders: ['babel-loader']
                }
            ]
        },
        plugins,
        output: {
            filename: `[name].bundle.js`
        }
    };
};