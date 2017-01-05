/**
 * Created by ericshape on 12/16/16.
 */


// var Schema = mongoose.Schema;
//
// var TweetSchema = new Schema({
//   claim_id: Number,
//   tweet_time: Date,
//   text: String,
//   html_text: String,
//   sent_vector: String,
//   opinion: String,
//   tweet_id: String
// }, {collection: 'tweet'});
//
//
// module.exports = mongoose.model('Tweet', TweetSchema);

// var Tweet = mongoose.model("Tweet");



// var databaseUrl = "aurora.cs.vt.edu:27017/TwitterRumor";
// var mongojs = require('mongojs');
// var db = mongojs(databaseUrl);
// var test = db.collection('test');
//
// test.find(function (err, docs) {
//   if(err)throw new Error(err);
//   console.log('DOCS',docs)
// });


// export function get_tweets(){
//   // Tweet.find({claim_id: req.params.claim_id})
//   Tweet.find({})
//     .select({
//       tweet_id: 1,
//       user: 1,
//       created_at: 1,
//       opinion: 1,
//       retweet_count: 1,
//       html_text: 1
//     })
//     .exec(function (err, tweets) {
//       if (err)
//         res.send(err);
//
//       console.log(tweets.created_at);
//       res.json(tweets);
//     });
//
// }



"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Schema
 */
var TweetSchema = new Schema({
  claim_id: Number,
  tweet_time: Date,
  text: String,
  html_text: String,
  sent_vector: String,
  opinion: String,
  tweet_id: String
}, {collection: 'tweet'});


mongoose.model("Tweet", TweetSchema);


