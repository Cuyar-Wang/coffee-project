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
        var eachCoffee = "<h2 class='coffee-name'>" + coffee.name + "</h2><p class='coffee-roast'>" + coffee.roast + "</p>";
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
    coffees.push(newCoffee);
    // console.log(newCoffee);
    // console.log(coffees);
    document.getElementById('coffees').innerHTML = displayCoffee(coffees);
}

document.getElementById('new-button').addEventListener('click', addNewCoffee)








