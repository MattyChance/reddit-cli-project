//value: reddit.getHomepage(function (homepageData) {console.log(homepageData)};

var inquirer = require('inquirer');
var reddit = require('./reddit.js');
var colors = require('colors');
var imageToAscii = require("image-to-ascii"); 

var menuChoices = [{
        name: 'Show homepage',
        value: 'HOMEPAGE'
    }, new inquirer.Separator(), {
        name: 'Show subreddit',
        value: 'SUBREDDIT'
    },
    new inquirer.Separator(), {
        name: 'List subreddits',
        value: 'SUBREDDITS'
    },
    new inquirer.Separator()
];

function getPostsListed (posts) {

    var menuPosts = posts.map(function (curr) {
        var postsObj = {};
        postsObj['name'] = curr.data.title;
        postsObj['value'] = curr.data.permalink;
        return postsObj;
    });
    // console.log(menuPosts);
    
    inquirer.prompt({
        type: 'list',
        name: 'postsMenu',
        message: 'Choose the post you want to check.',
        choices: menuPosts
    }).then(
        //parameter passed to the function below will give me the url of post
        //I need post's title, url and username
        //if url is ended with format jpg, gif or png use ascii;
        function(postUrl) {
            reddit.getSubredditPost(postUrl.postsMenu)
                .then(function(postDetail) {
                        console.log(postDetail[0].data.title);
                        console.log(postDetail[0].data.author.yellow);
                        console.log(postDetail[0].data.url.blue);

                        var urlCheck = postDetail[0].data.url;
                        if (urlCheck.includes('jpg') || urlCheck.includes('gif') || urlCheck.includes('png')) {
                            imageToAscii(urlCheck, (err, converted) => {
                                console.log(err || converted);
                            });
                        }
            });
            //console.log(postUrl.postsMenu);
        }
        ).catch(function (err) {
            console.log('err', err);
        });
}


function inquirerMainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
    }).then(
        function(answers) {

            if (answers.menu === 'HOMEPAGE') {
                reddit.getHomepage()
                .then(function (homepagePosts) {
                    getPostsListed(homepagePosts);
                }).catch(function (err) {
                    console.log(err)}
                );
            }

            else if (answers.menu === 'SUBREDDIT') {
                inquirer.prompt({
                    type: 'input',
                    name: 'subredditTerm',
                    message: 'Which Subreddit do you want to see?',
                    default: 'random'
                }).then(
                    function(userChosenSubreddit) {
                        var requiredSubreddit = (userChosenSubreddit.subredditTerm).replace(/\s/g, '');
                        reddit.getSubreddit('r/' + requiredSubreddit)
                            .then(function(subredditPosts) {
                                getPostsListed(subredditPosts);
                            });
                            })
                            .catch(function(err) {
                                console.log('There was an error when trying to display posts', err);
                });

            }
            else if (answers.menu === 'SUBREDDITS') {
                var listOfSubreddits;

                reddit.getSubreddits()
                    .then(function(subredditsList) {

                        listOfSubreddits = subredditsList.map(function(lists) {
                            var objListName = {};
                            objListName['name'] = lists.data.title;
                            objListName['value'] = lists.data.url;
                            return objListName;
                        });
                        listOfSubreddits = listOfSubreddits.reduce(function(arr, elementObj) {
                            arr.push(elementObj);
                            arr.push(new inquirer.Separator());
                            return arr;
                        }, []);
                        inquirer.prompt({
                            type: 'list',
                            name: 'subredditsListName',
                            message: 'Which list do you want to check out?',
                            choices: listOfSubreddits
                        }).then(
                            function(userChosenList) {
                                reddit.getSubreddit(userChosenList.subredditsListName)
                                    .then(function(subredditPosts) {
                                      getPostsListed(subredditPosts);
                                    });
                            });
                    });
            }
        });
}


inquirerMainMenu();