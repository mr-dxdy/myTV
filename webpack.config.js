const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    optimization: {
      minimize: true
    },
    entry: "./src/index.js",
    output: {
       path: __dirname + "/dist/myTV",
       filename: "js/main.js",
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: 'css/[id].css',
        })
   ],

   module: {
     rules: [
       {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env']
             }
           }
       },
       {
         test: /\.css$/,
         use: [
           { loader: MiniCssExtractPlugin.loader },
           'css-loader'
         ],
       }
     ]
   }

}
