/**
 * Created by ericshape on 5/20/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
    claim_id: Number,
    tweet_time: Date,
    text: String,
    html_text: String,
    sent_vector: String,
    opinion: String,
    tweet_id: String
}, {collection: 'tweet'});


module.exports = mongoose.model('Tweet', TweetSchema);