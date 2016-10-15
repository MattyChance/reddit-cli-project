var inquirer = require('inquirer');
var reddit = require('./reddit');


       
var before = ['a', 'b', 'c'];
// var after = [
//     {name: 'a', value: 'a'},
//     {name: 'b', value: 'b'},
//     {name: 'c', value: 'v'}
//     ];

var after = before.map(function (curr, index, arr) {
    var rObj = {};
    rObj['name'] = curr;
    rObj['value'] = curr;
    return rObj;
})    
console.log(after);    
    