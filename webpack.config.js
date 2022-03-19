// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const autoprefixer = require('autoprefixer')
const TerserPlugin = require("terser-webpack-plugin")
const isProduction = process.env.NODE_ENV == 'production';
// const stylesHandler = 'style-loader';



const config = {
    mode: 'production',
    // entry: './src/index.js',
    entry: {
        KaPlayer: './src/index.js'
    },
    // entry: './dist/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/'
    },
    devServer: {
        open: true,
        host: 'localhost',
        static: {
            directory: './dist'
        }
    },
    plugins: [
        new MiniCssExtractPlugin()
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            // {
            //     test: /\.css$/i,
            //     use: [stylesHandler, 'css-loader'],
            // },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            //     type: 'asset',
            // },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader', options: {
                        postcssOptions: {
                            plugins: ["autoprefixer"]
                        }
                    }
                }],
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', {
            //         loader: 'postcss-loader',
            //         options: {
            //             postcssOptions: {
            //                 plugins: ["autoprefixer"]
            //             }
                        
            //         }
            //     }]
                
            // },
                         
            
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), new TerserPlugin()
        ]
    },
    devtool: "source-map",
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
