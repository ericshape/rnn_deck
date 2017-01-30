var express = require('express');
var router = express.Router();
var Twit = require('twit');
var config = require('../config');


var mongoose = require('mongoose');
mongoose.connect('mongodb://128.173.237.170:27017/TwitterRumor'); // connect to our database

var Tweet = require('../models/tweet');
var Claim = require('../models/claim');

// instantiate Twit module
var twitter = new Twit(config.twitter);

var TWEET_COUNT = 20;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';

/**
 * GET tweets json.
 */
router.get('/user_timeline/:user', function (req, res) {

    var oEmbedTweets = [], tweets = [],

        params = {
            screen_name: req.params.user, // the user id passed in as part of the route
            count: TWEET_COUNT // how many tweets to return
        };

    // the max_id is passed in via a query string param
    if (req.query.max_id) {
        params.max_id = req.query.max_id;
    }

    // request data
    twitter.get(USER_TIMELINE_URL, params, function (err, data, resp) {

        tweets = data;
        // console.log(tweets);

        var i = 0, len = tweets.length;

        for (i; i < len; i++) {
            getOEmbed(tweets[i]);
        }
    });

    /**
     * requests the oEmbed html
     */
    function getOEmbed(tweet) {

        // oEmbed request params
        var params = {
            "id": tweet.id_str,
            "maxwidth": MAX_WIDTH,
            "hide_thread": true,
            "omit_script": true
        };

        // request data
        twitter.get(OEMBED_URL, params, function (err, data, resp) {
            tweet.oEmbed = data;
            oEmbedTweets.push(tweet);

            // do we have oEmbed HTML for all Tweets?
            if (oEmbedTweets.length == tweets.length) {
                res.setHeader('Content-Type', 'application/json');
                res.send(oEmbedTweets);
            }
        });
    }
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/tweets/:claim_id')
// get all the tweets (accessed at GET http://localhost:5000/tweets/tweet)
    .get(function (req, res) {
        Tweet.find({claim_id: req.params.claim_id})
            .select({
                tweet_id: 1,
                user: 1,
                created_at: 1,
                opinion: 1,
                retweet_count: 1,
                text: 1,
                entities: 1
            })
            .exec(function (err, tweets) {
                if (err)
                    res.send(err);

                console.log(tweets.created_at);
                res.json(tweets);
            });

    });

router.route('/claims/:claim_id')
    .get(function (req, res) {
        Claim.find({claim_id: req.params.claim_id})
            .select({
                claim_id: 1,
                claim_content: 1,
                claim_label: 1,
                claim_title: 1,
                claim_topic: 1,
                dist_mat: 1
            })
            .exec(function (err, claim) {
                if (err)
                    res.send(err);

                console.log(claim.claim_title);
                res.json(claim);
            });
    });


// the route for the search tweet via tweet_id

router.route('/search/:tweet_id')
    .get(function (req, res) {
        Tweet.findById(req.params.tweet_id, function (err, tweet) {
            if (err)
                res.send(err);
            res.json(tweet);
        });
    });




module.exports = router;
