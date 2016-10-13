var inquirer = require("inquirer");
var imageToAscii = require("image-to-ascii");
/*
i want to practice using this module to create a pizza menu
my pizza menu starts with 'Do you want a pizza? y/n'
N What a wierdo you are! Everyone loves pizza!
Y choose the following:
dough: thick or thin or go
cheese: mozzarella/four cheese
toppings: mushroom, onion, olive, green pepper, spinach

press Y/N to confirm the pizza 
*/

// var takeOrder = [
//     {
//     name: 'Y', value: 'yes',
//     name: 'N', value: 'no'
//     }
//     ];

var pizzaOptions = [{
    name: '',
}];

inquirer.prompt({
        type: 'confirm',
        name: 'takeOrder',
        message: 'Do you want a pizza?!?',
        // choices: takeOrder
    })
    .then(function(answers) {
        console.log("Yeah!!! Let's make one!");
        inquirer.prompt({
            type: 'list',
            name: 'dough',
            message: 'Choose your dough!',
            choices: ['Thin crust', 'Thick crust']
        }).then(function (userChosenDough) {
            console.log('Good choice! ' + userChosenDough + ' is the best!');
            inquirer.prompt({
                type: 'list',
                name: 'cheese',
                message: 'Now what kind of cheese do you want!?',
                choices: ['Mozzeralla', 'Four cheese']
            }).then(function (userCheese) {
                console.log('Hmmmmmm Yummmmmmm~~~');
                inquirer.prompt({
                    type: 'checkbox',
                    name: 'toppings',
                    message:'What do ya want on your pizza!?',
                    choices: ['Mushroom', 'Green Pepper', 'Onion', 'Brocoli', 'Olive']
                }).then( function (userToppings) {
                    console.log('Bon App!');
                    imageToAscii('http://cliparts.co/cliparts/kiK/nxa/kiKnxa5RT.png', function(err, converted) {
                        console.log(err || converted);}
                        )
                })
            })
        })
   });