// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')],
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src/js')],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.(png|jp(e*)g)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    name: 'images/[hash]-[name].[ext]',
                },
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
            template: 'src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    devServer: {
        host: '127.0.0.1',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        inline: true,
        port: 9000,
        open: true,
    },
    // production 사용시 반드시 제거
    // devtool: 'inline-source-map'
};
