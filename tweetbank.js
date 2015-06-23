var tweets = []

module.exports = {
  add: function(name, tweet) {
    tweets.push({ name: name, tweet: tweet })
  },
  find: function(query) {
    // iterate through tweets attempting to match for query object
    // eg tweets = [{ name: 'zeke', tweet: 'foo'}, { name: 'omri', tweet: 'bar'}]
    // query { name: 'zeke' }
    // will return [{ name: 'zeke', tweet: 'foo'}]
    var filteredTweets = [];
    for(var i = 0; i < tweets.length; i++) {
      var tweetInResult = true
      console.log(query)
      for(var key in query) {
        console.log(query[key], tweets[i][key])
        if(query[key] !== tweets[i][key]) {
          tweetInResult = false
        }
      }
      if(tweetInResult) {
        filteredTweets.push(tweets[i])
      }
    }
    return filteredTweets
  },
  list: function() {
    return tweets
  }
}


var randArrayEl = function(arr) {
 return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
 var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
 var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
 return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
 var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
 return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
 module.exports.add( getFakeName(), getFakeTweet() );
}