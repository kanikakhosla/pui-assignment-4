//constructors
var infoFromCart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(infoFromCart);
var Item = function(name, color, size, count, price, id){
  this.name = name;
  this.color = color;
  this.size = size;
  this.count = count;
  this.price = price;
  this.id=id;
}

//creating a unique id for every item sent to the cart - so it can be removed later
function makeId (){
  function s4() {
    //generate random number to create a unique id for every item sent to the checkout page
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  //return a random long random number generated above
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  s4() + '-' + s4() + s4() + s4();
}

//update the number of itmes in the cart on the top left nav bar
function updateCartNumber (){
  var currentCartSize = JSON.parse(localStorage.getItem("cartSize")) || 0;
  var checkoutBox = document.getElementById("checkout");
  var cartString = checkoutBox.text.split(" ")[0];
  cartString = cartString + " (" + currentCartSize + ")";
  checkoutBox.text = cartString;
}


//parse the information to get the item from the cart and put it onto the table on the checkout page
function setUpCart(){
  var cart = JSON.parse(localStorage.getItem("cart"));
  //new table on the checkout page with the different elements
  var tr;
  for (var i = 0; i < cart.length; i++) {
    tr = $("<tr/>");
    tr.append("<td>" + cart[i].name + "</td>") ;
    tr.append("<td>" + cart[i].color + "</td>");
    tr.append("<td>" + cart[i].size + "</td>");
    tr.append("<td>" + cart[i].count + "</td>");
    tr.append("<td>" + cart[i].price + "</td>");
    //calling the individual arrays as a separate id
    + cart[i].id +
    tr.append("<td>" +
      //create a remove button that with click associates to the unique id
      '<button id="'+ cart[i].id + '" onClick="removeCartItem(this.id)">Remove</button>'
      + "</td>");
    $(".shopping-cart").append(tr);
  };
}



//once document loads
$(document).ready(function() {
  updateCartNumber();
//product page
    //changing the picture and text dependent on the colour choosen
  $("#color-scp").change(function() {
    if (this.value == "Beige") {
      $("#cpl").attr("src", "images/square couch pillow large.jpg");
      $("#description-scp").html("DETAILS: Beige textured decorative throw cushion for your couch<br> designed and handpainted by a local artisan. <br><br> Material: Cotton polifill covered by natural beige hemp cloth.");
    } else {
      $("#cpl").attr("src", "images/square couch pillow black large.jpg");
      $("#description-scp").html("DETAILS: Black textured decorative throw cushion for your couch<br> designed and handpainted by a local artisan. <br><br> Material: Cotton polifill covered by blotchy hemp cloth.");
    }
  });

  // changing the italisized note dependent on the size choosen
  $("#size-scp").change(function() {
    if (this.value == "L") {
      $("#percentage-bought").html("70% of our buyers buy this size. Just perfect!");
    } else if (this.value == "M") {
      $("#percentage-bought").html("20% of our buyers buy this size. Great for smaller homes!");
    } else {
      $("#percentage-bought").html("10% of our buyers buy this size. They say it gets lost underneath them.");
    }
  });


//cart
  //everytime cart button is clicked these are the functions that are added
  $("#cart").click(function() {
    var hue = $("#color-scp").val();
    var fit = $("#size-scp").val();
    var qty = $("#text-q-scp").val();
    var amount = $("#price-scp").text();
    var title = $("#name-scp").text();
    var id = makeId();
    var pillow = new Item(title, hue, fit, qty, amount, id);
    //push information of object pillow into the local storage for the cart
    infoFromCart = JSON.parse(localStorage.getItem("cart")) || [];
    //push information of object pillow into the local storage for number on top left in navbar
    var currentCartSize = JSON.parse(localStorage.getItem("cartSize")) || 0;
    infoFromCart.push(pillow);
    currentCartSize++;
    localStorage.setItem("cart", JSON.stringify(infoFromCart));
    localStorage.setItem("cartSize", JSON.stringify(currentCartSize));
    updateCartNumber();
  });

  //call global funciton setUpCart to ensure everything goes to the cart
  setUpCart();
});
//end of doc ready


//remove the specific id from the checkout page
function removeCartItem(idToRemove){
  var currentCart = JSON.parse(localStorage.getItem("cart")) || [];
  for(var i = 0; i < currentCart.length; i++){
    //for loop to find the currect item with the specific id
    if(currentCart[i].id === idToRemove){
      //remove only the one item from i, inclusive of i
      infoFromCart.splice(i,1);
    }
  }
  //reset information on cart page after item removed
  localStorage.setItem("cart", JSON.stringify(infoFromCart));
  //reload page
  location.reload();
}













