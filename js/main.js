"use strict"

var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];
// Grabs a specific array and sets it up as a string
var displayCoffee = function(array){
    var html = "";
    array.forEach(function(coffee){
        var eachCoffee = `<a href ='#' onclick='storeCoffee("${coffee.name + ": " + coffee.roast}")' class='m-4 p-3'><h2 class='coffee-name text-center'>${coffee.name}</h2><p class='coffee-roast text-center text-uppercase'>${coffee.roast}</p></a>`;
        html += eachCoffee;
    })
    return html;
}
// Updates the page with the current array with default 'all'
updateCoffees();

// select filter functionality
function updateCoffees() {
    var selectedRoast = document.getElementById('roast-selection').value;
    var filteredCoffees = [];
    if(selectedRoast === 'all'){
        filteredCoffees = coffees;
    }
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
// At this point we have a new array that is filtered from the select
    //show the new array using the displayCoffee(array)

    document.getElementById('coffees').innerHTML = displayCoffee(filteredCoffees);

    //search by coffee name in the input and uses the filter method to return an array that includes the character using the input onkeyup event listener
    var filterCoffee = function(){
        var selectedCoffee = filteredCoffees.filter(function(coffee){
            return coffee.name.toLowerCase().includes(document.getElementById('coffee-search').value.toLowerCase());
        })
        document.getElementById('coffees').innerHTML = displayCoffee(selectedCoffee);
    }
    document.getElementById('coffee-search').addEventListener('keyup', filterCoffee);
}
//takes user input with select and input values
//sends alert if empty input is submitted
//new coffee is pushed on to the 'original' array' applying an object including all the properties
//if the coffee name and roast are duplicated it will send an alert
//the new coffee array is re-displayed using the displayCoffee function
function addNewCoffee() {
    var roastSelect= document.getElementById('roast-addition');
    var textAddition= document.getElementById("new-name");

    if (textAddition.value === '') {
        alert('Please put in a valid coffee name');
    } else {
        var newCoffee = {id: coffees.length + 1, name: textAddition.value, roast: roastSelect.value};
        for (var i = 0; i < coffees.length; i++) {
            if (coffees[i].name === newCoffee.name && coffees[i].roast === newCoffee.roast) {
                alert('This coffee already exists.');
                return;
            }
        }
        coffees.push(newCoffee);
        document.getElementById('coffees').innerHTML = displayCoffee(coffees);
        storeIntoLocal(newCoffee);
    }

}
//submit button listener event
document.getElementById('new-button').addEventListener('click', addNewCoffee);

//Refactored function that has the shopping cart items html structure

function shoppingPartElement (dataShow, i){
    return "<p class='cart-row' id = '" + i + "'><span class='shopping-name mr-5'>" + dataShow + "</span><a class='ml-auto cart-logo' href='#' onclick = deleteItem(" + i + ")>Remove</a></p><hr>";
}
function removeChild(){let parent = document.getElementById('cart_box');
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
//TODO: Set up the default display. A separate array for the data and shopping cart.

let shoppingArray = [];
function defaultShopping(){
    removeChild();
   for(var i = 0; i < 20; i++) {
    if (window.localStorage.getItem('coffee' + i)) {
        let dataShow = window.localStorage.getItem('coffee' + i);
        let divResponse = document.createElement('div');
        divResponse.innerHTML = shoppingPartElement(dataShow, i);
        document.getElementById('cart_box').appendChild(divResponse);
        shoppingArray.push(dataShow);
    }

    }
}
defaultShopping();


//TODO: onclick function that stores the data by adding to the 'current' array first and then storing it. Every time onclick is activated the local memory is stored again.
let storeCoffee = function(input){
    shoppingArray.push(input); //updates the shopping cart array
    shoppingArray.forEach(function (shopping_item, i){
        window.localStorage.setItem('coffee' + i, shopping_item);
    }); //updates the data by saving over it
   removeChild(); //removes previous html elements
    for (var i = 0; i < shoppingArray.length; i++){
        let dataShow = window.localStorage.getItem('coffee' + i);
        let divResponse = document.createElement('div');
        divResponse.innerHTML = shoppingPartElement(dataShow, i);
        document.getElementById('cart_box').appendChild(divResponse);

    }

}
//TODO: Get rid of any div in parent container before new display. New display is going to create divs based on data. Each key will have its own div.
let clearLocal = function() {
    let dataClear = window.localStorage.clear();
    shoppingArray = [];
    document.getElementById('cart_box').innerHTML = "";

}
//TODO: add onclick on "remove" to delete from memory and display that specific div
let deleteItem = function (input) {
    removeChild(); //removing the previous HTML element
    window.localStorage.removeItem('coffee' + input);
    shoppingArray.splice(input, 1); //gets rid of the element inside the actual array using its key number
    for (var i = 0; i < 20; i++) {
        if (window.localStorage.getItem('coffee' + i)) {
            let dataShow = window.localStorage.getItem('coffee' + i);
            let divResponse = document.createElement('div');
            divResponse.innerHTML = shoppingPartElement(dataShow, i);
            document.getElementById('cart_box').appendChild(divResponse);
        }

    }
}
// A much better way to store the data for future applications due to its ability to store objects. Objects have more accessibility when trying to use various properties.
function storeIntoLocal(newItem) {
    var coffeeJSON = JSON.stringify(newItem);
    localStorage.setItem('newCoffee' + newItem.id, coffeeJSON);
}

// function displayStorageLocal() {
//     var i = 15;
//     while (localStorage.getItem('newCoffee' + i)) {
//         var text = localStorage.getItem('newCoffee' + i);
//         coffees.push(text);
//         console.log(coffees);
//         i++;
//     }
// }
// console.log(coffees);