var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(() => {
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer]))
    }, 2000)
  }
}

// Make sure cake.decorate() works as expected. Hint: Remember that the callback 
// to setTimeout also needs to be bound to the proper context. Think about using arrow functions with your setTimeout calls.

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = updateStatus.bind(this);
  updateCakeStatus("Prep")
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  var updatePieStatus = updateStatus.bind(this);
  updatePieStatus("Prep")
  pie.decorate = cake.decorate.bind(pie);
  mix.call(pie, updatePieStatus);
}

// We don't yet have a way to decorate pies. Inside the makePie function, "borrow" the decorate function from cake 
// and make it available to pie through pie.decorate() so it can be executed later.

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  updateFunction(status)

  setTimeout(() => {
    cool.call(this, updateFunction)
  }, 2000)
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  updateFunction(status)
  setTimeout(() => {
    bake.call(this, updateFunction)
  }, 2000)

}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  updateFunction(status)
  setTimeout(() => {
    this.decorate(updateFunction)
  }, 2000)
}

// For the bake, cool, and mix functions, make sure that the function for the next 
// step (called inside setTimeout) is called with the correct context, 
// and that the proper updateFunction is being called to update the status. 
// You'll need to use call inside these functions to get the tests to pass. 
// HINT: Remember what we said about setTimeout above?

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was clicked
  if(this.parentNode.id === "cake"){
    makeCake.call(this.parentNode)
  } else {
    makePie.call(this.parentNode)
  }
}

// Write your makeDessert function that will decide based on which link was 
// clicked whether to makePie or makeCake. Hint: You shouldn't need to alter the 
// code in the document.addEventListener block, but remember that events also set 
// this when they are triggered from the DOM.

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
