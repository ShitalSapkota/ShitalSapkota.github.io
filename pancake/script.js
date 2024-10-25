// Step 1:
const pancake = document.querySelector('#type');
const priceBanner = document.querySelector('.price-banner');
const priceDisplay = document.querySelector('.price-display');
const toppings = document.querySelectorAll('input[type=checkbox]');
let totalPrice = 0;           

// Step 2:

const radios = document.querySelectorAll('input[type=radio]');
const radioButton = document.querySelector('#submit');
// Step 3:
let toppings_order = [];       // to modify array values
let extras_topping = [];         // to modify array values
const seeOrder = document.querySelector('#seeOrder');
let deliveryMethod = "";


class Order{
  constructor(pancake, topping, extras, deliveryMethod, customerName){
    this.pancake = pancake;
    this.topping = topping;
    this.extras = extras;
    this.deliveryMethod= deliveryMethod;
    this.customerName = customerName;
  }
}

// For Animation transiton in #totalPrice tag in price banner
function priceTagAni(final){
  priceBanner.classList.add("fade-out");
  setTimeout(() => {
    priceBanner.textContent = `€${final}`; 
    // Apply fade-in animation
    priceBanner.classList.remove("fade-out");
    priceBanner.classList.add("fade-in");
    // Remove fade-in class after animation
    setTimeout(() => {
      priceBanner.classList.remove("fade-in");
    }, 300); 
  }, 300);
  
}

function updatePrice(add_price) {
  
  priceDisplay.querySelector('#totalPrice').textContent = `€${add_price}`;
  priceTagAni(add_price);               // for price banner
}

// resetting value when change event occurs
function updateInitial() {
  totalPrice = 0;                                   
  toppings_order = [];
  extras_topping = [];
  for(let topping of toppings) {
    if(topping.checked){
      topping.checked = !topping.checked;
    }
  priceDisplay.querySelector('#totalPrice').textContent = `€${pancake.value}`;
  priceTagAni(pancake.value);           // for price banner
  }
}


// For all toppings (checkboxes)
toppings.forEach((topping) => {
  topping.addEventListener('click', (e) => {  
    const label = document.querySelector(`label[for="${e.target.id}"]`);          // selecting label via event
    let price;
    if(topping.checked && topping.name ==='topping'){
      totalPrice = totalPrice + parseInt(topping.value)
      price = parseInt(pancake.value) + totalPrice
      updatePrice(price)
      toppings_order.push(label.textContent); 
    }
    if(topping.checked && topping.name ==='extra'){
      totalPrice = totalPrice + parseInt(topping.value)
      price = parseInt(pancake.value) + totalPrice
      updatePrice(price)
      extras_topping.push(label.textContent);      
    }
    if(!topping.checked){
      totalPrice = totalPrice - parseInt(topping.value)
      price = parseInt(pancake.value) + totalPrice
      updatePrice(price)
      /* removing unchecked topping from toppings_order (array) */
      toppings_order = toppings_order.filter((my_topping)=> my_topping != label.textContent);
       /* removing unchecked extra topping from extras_topping (array) */
      extras_topping = extras_topping.filter((my_topping)=> my_topping != label.textContent);
    }

  });
});

radioButton.addEventListener('click', (e)=>{
  for (let radio of radios) { 
    const label = document.querySelector(`label[for="${radio.id}"]`);
    let finalPrice;
    if (radio.checked && radio.id === 'deliver') {
      finalPrice = totalPrice + parseInt(radio.value) + parseInt(pancake.value);
      updatePrice(finalPrice) 
      deliveryMethod = `${label.textContent}`;     
    }
    if(radio.checked && radio.id != 'deliver') { 
      finalPrice = totalPrice + parseInt(pancake.value);
      updatePrice(finalPrice)
      deliveryMethod = `${label.textContent}`; 
    }
  }

});
  
  // For Order Details to Display
function orderDetails(){  
  const placeOrder = document.querySelector('.placeOrder');
  try {
    const customerName = document.querySelector('#userName').value;
    if(!customerName){  
      throw new Error("Name should be provided with other order details");  
    }
    const newOrder = new Order(
      pancake.selectedOptions[0].innerText,
      toppings_order,
      extras_topping,
      deliveryMethod,
      customerName);
    placeOrder.innerHTML = `<p>Name: ${newOrder.customerName} </p> 
    <p>Pancake type: ${newOrder.pancake} </p>
    <p>Toppings: ${newOrder.topping.join(", ")}</p>
    <p>Extras: ${newOrder.extras.join(", ")}</p>
    <p>Delivery method:${newOrder.deliveryMethod} </p>
    <h4>${priceDisplay.textContent}</h4> `                  // total price
  
  } catch (error) {
    return (placeOrder.innerHTML = `<h4>${error.message}</h4>`)
   
  }
}

seeOrder.addEventListener('click', orderDetails);

pancake.addEventListener('change', updateInitial);