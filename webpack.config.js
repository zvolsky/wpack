/*
// import path from 'path'   not supported in (older?) node
const path = require('path');
*/
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
	// configuration

    mode: "production",

    /*
    resolve: {
        modules: [   // this is something like PATH
            path.resolve('./wpackdemo/src/wpackdemo/js'),
            path.resolve('./node_modules')
        ]
    },
    */

    /*
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
    */
    module: {
        rules: [
            {       // required for compiled (to .css) bootstrap
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    //{   // this could replace style-loader however
                    //    loader: MiniCssExtractPlugin.loader
                    //},
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },

    entry: {
        'wpack/static/project/js/styles': [
            'bootstrap/dist/css/bootstrap.min.css',
            './wpack/src/project/sass/styles.sass',
        ],
        'wpack/static/project/js/project': [
            './wpack/src/project/js/wpack.js',
            // './wpack/src/project/sass/styles.sass',  // or wpack.js can import styles.sass
            // but instead we usually need styles in <head> and wpack.js late before </body>
        ],

        'wpackdemo/static/wpackdemo/js/home': [
            "./wpackdemo/src/wpackdemo/js/home.js",
            "./wpackdemo/src/wpackdemo/js/wpackdemo.js",
        ],
        'wpackdemo/static/wpackdemo/js/home2': [
            "./wpackdemo/src/wpackdemo/js/home.js",
        ],
    },
    output: {
        path: __dirname,  // without this generates output to dist/
        //path: path.resolve(__dirname, "wpackdemo/static"), // Should be in STATICFILES_DIRS
        publicPath: "/static/", // Should match Django STATIC_URL
        filename: "[name].js", // No filename hashing, Django takes care of this
        //filename: (data) => data.chunk.name === 'wpackdemo/static/wpackdemo/js/home' ? "aaa/[name].js" : "bbb/[name].js",
        chunkFilename: "[id]-[chunkhash].js", // DO have Webpack hash chunk filename, see below
    },
    devServer: {
        writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
    },
};
