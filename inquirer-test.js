var inquirer = require('inquirer');
var reddit = require('./reddit.js');

var menuChoices = [
  {name: 'Show homepage', value: reddit.getHomepage(function (homepageData) {
    console.log(homepageData);
  })},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];

inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'What do you want to do?',
  choices: menuChoices
}).then(
  function(answers) {
    console.log(answers);
  }
);

