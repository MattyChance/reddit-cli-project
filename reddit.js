var request = require('request');

function requestPromise(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

/*
This function should "return" the default homepage posts as an array of objects
*/
// function getHomepage(callback) {
//   // Load reddit.com/.json and call back with the array of posts
//   // TODO: REPLACE request with requestAsJson!
//   request('https://reddit.com/.json', function(err, res) {
//     if (err) {
//       callback(err);
//     }
//     else {
//       try {
//         var response = JSON.parse(res.body);
//         callback(null, response.data.children); // look at the result and explain why we're returning .data.children
//       }
//       catch(e) {
//         callback(e);
//       }
//     }
//   });
// }

/*
the following is creating a function for requesting the json data

function requestAsJson(url, callback) {
  request(url, function(err, result) {
    if (err) {
      callback(err);
    }
    else {
      try {
        var output = JSON.parse(result.body.children);
        callback(output);
      }
      catch (err) {
        callback(err);
      }
    }
  });
}
//require reddit homepage posts using requestAsJson

function getHomepage(callback) {
  requestAsJson('https://reddit.com/.json', function(err, homepageData) {
    if (err) {
      console.log('crap', err);
    }
    else {
      return homepageData.data;
    }
  });
}

getHomepage(function(err, response) {
  if (err) {
    console.log('wrong!', err);
  }
  else {
    console.log(response);
  }
})
*/

//used Promises to recreate the getHomepage function
function getHomepage() {
  return (
    requestPromise('https://reddit.com/.json')
    .then(function(homepageResponse) {
      return JSON.parse(homepageResponse.body).data.children;
    })
  );
}

//checking it by calling it here
// getHomepage()
//   .then(function(homepageData) {
//     console.log(homepageData);
//   })
//   .catch(function (err) {
//     console.log('Something went wrong: ', err);
//   });



/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepa ge` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  return (requestPromise('https://reddit.com/' + sortingMethod + '/.json')
    .then(function(sortedHomepage) {
      return JSON.parse(sortedHomepage.body).data;
    })
  );
}

 /*the following is the codes I wrote without the requestPrompt function 
  return new Promise(function(resolve, reject) {
    request('https://reddit.com/' + sortingMethod + '/.json', function(err, res) {
      if (err) {
        reject(err);
      }
      else {
        try {
          resolve(JSON.parse(res.body).data.children);
        }
        catch (err) {
          reject(err);
        }
      }
    })
  });
  // Check if the sorting method is valid based on the various Reddit sorting methods
}
*/
/*check the sortedHomepage
getSortedHomepage('new')
  .then(function(categoryOutput) {
    console.log(categoryOutput)
  })
  .catch(function(err){
    console.log(err);
  });
*/
  

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
  return (requestPromise('https://www.reddit.com/' + /*'r/'*/  subreddit + '.json')
    .then(function(showSubreddit) {
      return JSON.parse(showSubreddit.body).data.children;
    })
  );
}

function getSubredditPost(subreddit) {
   return (requestPromise('https://www.reddit.com/' + /*'r/'*/  subreddit + '.json')
    .then(function(showSubreddit) {
      return JSON.parse(showSubreddit.body)[0].data.children;
    })
  );
}
//below is to test getSubreddit
// getSubredditPost('/r/funny/comments/57i1v2/a_natural_response/')
//   .then(function(subredditPageData) {
//     console.log(subredditPageData);
//   })
//   .catch(function(err) {
//     console.log(err);
//   })


/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  return (requestPromise('https://www.reddit.com/r/' + subreddit + '/' + sortingMethod + '.json')
    .then(function(sortedSubredditData) {
      return (JSON.parse(sortedSubredditData.body)).data.children;
    })
  );
}

//check out the function above
// getSortedSubreddit('funny', 'rising').then(function(output) {
//     console.log(output)
//   })
//   .catch(function(err) {
//     console.log(err);
//   })

/*
This function should "return" all the popular subreddits
*/
function getSubreddits() {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
  return (requestPromise('https://www.reddit.com/subreddits.json')
    .then(function(subredditsData) {
      return JSON.parse(subredditsData.body).data.children;
    })
  )
}
//test above function
// getSubreddits()
//   .then(function(data) {
//     console.log(data)
//   })
//   .catch(function(err) {
//     console.log(err);
//   })


// Export the API
module.exports = {
  // ...
  'requestPromise': requestPromise,
  'getHomepage': getHomepage,
  'getSubreddit': getSubreddit,
  'getSortedSubreddit': getSortedSubreddit,
  'getSubreddits': getSubreddits,
  'getSubredditPost': getSubredditPost
};
