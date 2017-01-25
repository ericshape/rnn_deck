/**
 * Created by ericshape on 4/25/16.
 */

var formatTweet = function (t) {

    if (t.hasOwnProperty('_source')) {
        t = t._source;
    }

    var tags = t.entities.hashtags;
    var mentions = t.entities.user_mentions;
    var urls = t.entities.urls;

    t.htmlText = t.text;
    t.htmlText = t.htmlText.replace("RT ", "<strong>RT </strong>");

    for (var i = 0; i < tags.length; i++) {
        t.htmlText = t.htmlText.replace("#" + tags[i].text, "<a href='https://twitter.com/search?q=%23" + tags[i].text
            + " ' target='_blank'>#" + tags[i].text + "</a>");
    }
    for (var j = 0; j < mentions.length; j++) {
        t.htmlText = t.htmlText.replace("@" + mentions[j].screen_name, "<a href='https://twitter.com/"
            + mentions[j].screen_name + " ' target='_blank'>@" + mentions[j].screen_name + "</a>");
    }
    for (var k = 0; k < urls.length; k++) {
        t.htmlText = t.htmlText.replace(urls[k].url, "<a href='" + urls[k].url
            + " ' target='_blank'>" + urls[k].display_url + "</a>");
    }
    return t;
};
