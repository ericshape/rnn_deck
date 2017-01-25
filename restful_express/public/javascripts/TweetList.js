var app = angular.module('Twitter', [
    'ngResource',
    'ngSanitize',
    'ngDragDrop']);

/** Tweet Card Layout (with external template)*/
app.directive('tweetCard', function () {
    return {
        restrict: 'C',
        scope: {tweet: "=tweet"},
        templateUrl: "tweetCard.tpl.html"
    }
});

app.controller('TweetList', function ($scope, $resource, $timeout, $interval) {

    /**
     * init controller and set defaults
     */
    function init() {

        // set a default username value
        $scope.username = "WSJ";

        // empty tweet model
        $scope.tweetsResult = [];

        // empty claim model
        $scope.claimResult = [];

        // empty distance matrix
        $scope.distanceMatrix = [];

        $scope.filterData = [];

        $scope.claim_id = 9;

        $scope.getTweets();

        $scope.orderProp = 'rank';

        $interval(function () {
            // $scope.$evalAsyn;
        }, 500);

    }

    /**
     * requests and processes tweet data
     */
    function getTweets() {

        //var params = {
        //    action: 'user_timeline',
        //    user: $scope.username
        //};
        //
        //if ($scope.maxId) {
        //    params.max_id = $scope.maxId;
        //}

        // create Tweet data resource
        //$scope.tweets = $resource('/tweets/:action/:user', params);

        $scope.tweets = $resource('/tweets/tweets/' + $scope.claim_id);

        // GET request using the resource
        $scope.tweets.query({}, function (res) {
            //
            //for (i = 0; i < res.length; i++) {
            //    //res[i] = formatTweet(res[i]);
            //    console.log(i, res[i])
            //
            //}
            $scope.tweetsResult = [];
            res.created_time = res.created_at;
            $scope.tweetsResult = $scope.tweetsResult.concat(res);

            // for paging - https://dev.twitter.com/docs/working-with-timelines
            $scope.maxId = res[res.length - 1].id;

            console.log($scope.tweetsResult)

        });

        $scope.getClaim();
    }


    // request and process claim data
    function getClaim() {

        $scope.claimResult = [];

        $scope.claim = $resource('/tweets/claims/' + $scope.claim_id);

        // GET request using the resource
        $scope.claim.query({}, function (res) {

            $scope.claimResult = $scope.claimResult.concat(res);
            $scope.distanceMatrix = res[0].dist_mat;

            console.log($scope.distanceMatrix);

            // render vis
            $timeout(function () {
                getVis();
            }, 5);
        });
    }


    function getVis() {
        function print_filter(filter) {
            var f = eval(filter);
            if (typeof(f.length) != "undefined") {
            } else {
            }
            if (typeof(f.top) != "undefined") {
                f = f.top(Infinity);
            } else {
            }
            if (typeof(f.dimension) != "undefined") {
                f = f.dimension(function (d) {
                    return "";
                }).top(Infinity);
            } else {
            }
            console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
        }


        var ndx = crossfilter($scope.tweetsResult);

        // tweet json time format: Wed Aug 20 14:55:16 +0000 2014
        var parseDate = d3.time.format("%a %b %d %H:%M:%S +0000 %Y").parse;

        $scope.tweetsResult.forEach(function (d) {
            d.date = parseDate(d.created_at);
            d.total = d.retweet_count;
            d.year = d.date.getFullYear();
        });

        // print_filter("data");

        $scope.dataDim = ndx.dimension(function (d) {

            return d3.time.hour(d.date);
        });


        var hits = $scope.dataDim.group().reduceCount(function (d) {
            return d.date;
        });

        var minDate = $scope.dataDim.bottom(1)[0].date;
        var maxDate = $scope.dataDim.top(1)[0].date;

        var hitlineChart = dc.barChart("#chart-line-hitsperday");


        var status_200 = $scope.dataDim.group().reduceCount(function (d) {
            return d.opinion;
        });


        hitlineChart
            .dimension($scope.dataDim)
            .group(hits)
            // .stack(status_200)
            .gap(100)
            //            .brushOn(false)
            .x(d3.time.scale().domain([minDate, maxDate]))
            // .x(d3.time.scale().domain([new Date(2014, 7, 19, 18, 0, 0), new Date(2014, 7, 22)]))
            .transitionDuration(500)
            .centerBar(true)
            .elasticY(true)
            // .elasticX(true)
            .xUnits(function () {
                return 10;
            });
        /*          .on("preRedraw", function (chart) {
         chart.rescale();
         })
         .on("preRender", function (chart) {
         chart.rescale();
         });*/
        // .legend(dc.legend().x(50).y(10).itemHeight(13).gap(5));

        var datatable = dc.dataTable("#dc-data-table");
        datatable
            .dimension($scope.dataDim)
            .group(function (d) {
                return d.year;
            })
            .size(99999)
            .columns([
                function (d) {
                    return d.date.getDate() + '/' + (d.date.getMonth() + 1) + "/" + d.date.getFullYear();
                },
                function (d) {
                    return d.html_text;
                },
                function (d) {
                    return d.user.screen_name;
                }
            ]);

        dc.renderAll();

    }

    /**
     * binded to @user input form
     */
    $scope.getTweets = function () {
        console.log("getTweets trigger: claim_id: " + $scope.claim_id);
        getTweets();
    };

    $scope.getClaim = function () {
        getClaim();
    };

    $scope.$on('crossfilter/updated', function crossfilterUpdated() {
        console.log("update");
    });

    /**
     * binded to 'Get More Tweets' button
     */
    //$scope.getMoreTweets = function () {
    //    getTweets(true);
    //};


    $scope.distmat = function (input) {
        // if ($scope.distanceMatrix !== undefined)
        //    console.log($scope.distanceMatrix[input.tweet_id]);
        console.log("filtered");
        return input;
    };

    init();


    $scope.startCallback = function (event, ui, tweet) {
        console.log('start drag callback: ' + tweet.tweet_id);
        $scope.draggedTitle = tweet.tweet_id;

        // update the rank for all the
        dist_dict = $scope.distanceMatrix[$scope.draggedTitle];

        $scope.rank_dict = {};

        // sort dist_dict
        // Create items array
        var items = Object.keys(dist_dict).map(function (key) {
            return [key, dist_dict[key]];
        });

        // Sort the array based on the second element
        items.sort(function (first, second) {
            return first[1] - second[1];
        });

        // generate the rank dict for each tweets id.
        for (var i = 0; i < items.length; i++) {
            // console.log(i, items[i][0]);
            $scope.rank_dict[items[i][0]] = [i, items[i][1]]
        }

        console.log($scope.dataDim.filter(null));

        // assign rank to data model.
        for (var j = 0; j < $scope.dataDim.top(9999).length; j++) {
            tweet_id = $scope.dataDim.top(9999)[j].tweet_id;
            $scope.dataDim.top(9999)[j].rank = $scope.rank_dict[tweet_id][0];
            $scope.dataDim.top(9999)[j].cos_dis = $scope.rank_dict[tweet_id][1];
        }


        console.log($scope.rank_dict);

    };

    $scope.stopCallback = function (event, ui) {
        console.log('stop drag callback');
    };

    $scope.dropCallback = function (event, ui) {
        console.log('drop callback', $scope.draggedTitle);
    };

    $scope.overCallback = function (event, ui) {
        console.log('hover callback');
    };

    $scope.outCallback = function (event, ui) {
        console.log('out callback');
    };


});


app.filter('datetime', function ($filter) {
    return function (input) {
        if (input == null) {
            return "";
        }

        var _date = $filter('date')(new Date(input),
            'yyyy MMM dd  - HH:mm:ss');

        return _date.toUpperCase();

    };
});

app.filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase)
            text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
                '<span class="highlighted">$1</span>');

        return $sce.trustAsHtml(text);
    }
});


// add the drag and drop methods for the different tweets.

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    console.log(ev.target.id);


}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
