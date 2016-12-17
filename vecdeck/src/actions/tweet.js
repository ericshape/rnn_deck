/**
 * Created by ericshape on 12/13/16.
 */


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
