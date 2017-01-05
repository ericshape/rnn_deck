const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.development');


let mongoose = require('mongoose');
mongoose.connect('mongodb://aurora.cs.vt.edu:27017/TwitterRumor');

require('./actions/tweet.js');


/* eslint-disable no-console */
/* eslint-disable consistent-return */
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:3000/');
});


