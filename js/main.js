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

//Show the array as a string

var displayCoffee = function(array){
    var html = "";
    array.forEach(function(coffee){
        var eachCoffee = `<a href ='#' onclick='storeCoffee("${coffee.name}")' class='m-4 p-3'><h2 class='coffee-name text-center'>${coffee.name}</h2><p class='coffee-roast text-center text-uppercase'>${coffee.roast}</p></a>`;
        html += eachCoffee;
    })
    return html;
}

updateCoffees();

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

    document.getElementById('coffees').innerHTML = displayCoffee(filteredCoffees);

    var filterCoffee = function(){
        var selectedCoffee = filteredCoffees.filter(function(coffee){
            return coffee.name.toLowerCase().includes(document.getElementById('coffee-search').value.toLowerCase());
        })
        // var inputValue= document.getElementById('coffee-search').value;
        // console.log(inputValue);
        // console.log(selectedCoffee);
        document.getElementById('coffees').innerHTML = displayCoffee(selectedCoffee);
    }

    document.getElementById('coffee-search').addEventListener('keyup', filterCoffee);
}

function addNewCoffee() {
    var roastSelect= document.getElementById('roast-addition');
    var textAddition= document.getElementById("new-name");
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
    console.log(newCoffee);
    console.log(coffees);
}

function storeIntoLocal(newItem) {
    var coffeeJSON = JSON.stringify(newItem);
    localStorage.setItem('newCoffee' + newItem.id, coffeeJSON);
}
function displayStorageLocal() {
    for (var i = 15; i < 100; i++) {
        var text = localStorage.getItem('newCoffee' + i);
        var obj = JSON.parse(text);
        var para = document.createElement("div");
        para.innerHTML = `<a href ='#' onclick='storeCoffee("${obj.name}")' class='m-4 p-3'><h2 class='coffee-name text-center'>${obj.name}</h2><p class='coffee-roast text-center text-uppercase'>${obj.roast}</p></a>`;
        document.getElementById("coffees").appendChild(para);
        i++;
    }
}

//TODO: Set up default. A separate array for the data and shopping cart.
document.getElementById('new-button').addEventListener('click', addNewCoffee);
let shoppingArray = [];
function defaultShopping(){
    let parent = document.getElementById('cart_box');
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
   for(var i = 0; i < 20; i++) {
    if (window.localStorage.getItem('coffee' + i)) {
        let dataShow = window.localStorage.getItem('coffee' + i);
        let divResponse = document.createElement('div');
        divResponse.innerHTML = "<p id = '" + i + "'>" + dataShow + "              <a href='#' onclick = deleteItem(" + i + ")>Remove</a></p>";
        document.getElementById('cart_box').appendChild(divResponse);
        shoppingArray.push(dataShow);
    }

    }
}
defaultShopping();

//TODO: onclick function that stores the data by adding to the current array first and then storing it. Every time onclick is activated the local memory is stored again.
let storeCoffee = function(input){
    shoppingArray.push(input);
    shoppingArray.forEach(function (shopping_item, i){
        window.localStorage.setItem('coffee' + i, shopping_item);
    });
    let parent = document.getElementById('cart_box');
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    for (var i = 0; i < shoppingArray.length; i++){
        let dataShow = window.localStorage.getItem('coffee' + i);
        let divResponse = document.createElement('div');
        divResponse.innerHTML = "<p id = '" + i + "'>" + dataShow + "              <a href='#' onclick = deleteItem(" + i + ")>Remove</a></p>";
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
    let parent = document.getElementById('cart_box');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    window.localStorage.removeItem('coffee' + input);
    shoppingArray.splice(input, 1);

    for (var i = 0; i < 20; i++) {
        if (window.localStorage.getItem('coffee' + i)) {
            let dataShow = window.localStorage.getItem('coffee' + i);
            let divResponse = document.createElement('div');
            divResponse.innerHTML = "<p id = '" + i + "'>" + dataShow + "              <a href='#' onclick = deleteItem(" + i + ")>Remove</a></p>";
            document.getElementById('cart_box').appendChild(divResponse);
        }

    }
}

