import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const extractTextPlugin = new ExtractTextPlugin({
    filename: 'styles/css/main.css',
});

module.exports = {
    context: path.resolve(__dirname),

    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3001',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/main.js')
    ],

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        }
                     ]
                })
            },
            {

                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                camelCase: true,
                                minimize: true,
                                localIdentName: '[path]-[local]--[hash:base64:5]',
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                     ]
                })
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: path.join(__dirname, '../node_modules'),
            }
        ]
    },

    plugins: [
        extractTextPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],

    devServer: {
        hot: true,
        port: 3001,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:3000',
            '/assets': 'http://localhost:3000',
            '/socket.io': 'http://localhost:3000'
        }
    },

    resolve: {
        alias: {
            app: path.resolve(__dirname, './app'),
            shared: path.resolve(__dirname, '../shared')
        }
    },

    output: {
        publicPath: '/assets/',
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
