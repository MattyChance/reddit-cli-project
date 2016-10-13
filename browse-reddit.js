//value: reddit.getHomepage(function (homepageData) {console.log(homepageData)};

var inquirer = require('inquirer');
var reddit = require('./reddit.js');
var colors = require('colors');

function displayPosts(posts) {
    console.log(posts.data.title.bold);
    console.log(posts.data.url.blue);
    console.log('Author: ' + posts.data.author.yellow);
    console.log('\n');
}

var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];
    
function getInquirerPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
    }).then(
        function(answers) {

            if (answers.menu === 'HOMEPAGE') {
                var homepagePromise = reddit.getHomepage();
                homepagePromise
                    .then(function(homepagePosts) {
                        
                        homepagePosts.forEach(function(posts) {
                            displayPosts(posts);
                            getInquirerPrompt();
                        });
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                    
            } else if (answers.menu === 'SUBREDDIT') {
                inquirer.prompt({
                    type: 'input',
                    name: 'userInput',
                    message: 'Which Subreddit do you want to see?',
                    
                }).then(
                    function (userChosenSubreddit) {
                        var requiredSubreddit = userChosenSubreddit.userInput;
                        // console.log(userChosenSubreddit);
                        // console.log(requiredSubreddit);
                        reddit.getSubreddit(requiredSubreddit)
                        .then(function (subredditPosts) {
                            subredditPosts.forEach(function (posts) {
                                displayPosts(posts);
                            });
                        });
                    });
                
                // console.log('Feature being developed');
            }
        });
}

getInquirerPrompt();