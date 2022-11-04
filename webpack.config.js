const path = require('path')
const resolve = (src) => path.resolve(__dirname, src)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {
        contentScript: resolve('../src/main.js'),
        popup: resolve('../src/main.js'),
        background: resolve('../src/main.js'),
    },
    output: {
        path: resolve('../chrome'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|otf)\??.*$/,
                use: ['url-loader?limit=1024'],
            },
            {
                test: /\.(html|tpl)$/,
                use: ['html-loader'],
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'common',
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss'],
        alias: {
            '@src': resolve('../src')
        }
    },
    // externals: {
    //     'ant-design-vue': 'antd',
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template/popup.html',
            filename: 'popup.html',
            chunks: ['popup']
        }),
        new VueLoaderPlugin()
    ],
    mode: "development",
    devtool: "source-map",
}
