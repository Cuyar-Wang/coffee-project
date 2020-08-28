"use strict"

/*function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}*/

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
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

//TODO: Show the array as a string

var displayCoffee = function(){
    var html = ""
    coffees.forEach(function(coffee){
        var eachCoffee = "<h2>" + coffee.name + "</h2><p>" + coffee.roast + "</p>";
        html += eachCoffee;
    })
    return html;
}
document.getElementById('coffees').innerHTML = displayCoffee();

//TODO: Create an input search text

//TODO: Add Event Listener

var filterCoffee = function() {
}
document.getElementById('coffee-search').addEventListener('keyup', filterCoffee);


    /*var html = ""
    coffees.forEach(function(coffee){
        if (coffee.name.includes(inputName.value)){
            var eachCoffee = "<h2>" + coffee.name + "</h2><p>" + coffee.roast + "</p>";
            html += eachCoffee;
        }
    })
    return html;
}*/


//TODO: Filter array

var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

//submitButton.addEventListener('click', updateCoffees);
