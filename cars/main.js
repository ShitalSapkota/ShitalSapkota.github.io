/* form all input values for Car's objects */
'use strict';

const form = document.querySelector('#car');
const searchCar = document.querySelector('#searchCar');

/* Creating a class for Car objects */

class Car{
    constructor(plateNo, carMaker, carModel, carOwner, carColor, year, carPrice, discount_price) {
        this.plateNo  = plateNo;
        this.carMaker = carMaker;
        this.carModel = carModel;
        this.carOwner = carOwner;
        this.carColor = carColor;
        this.year = parseInt(year);
        this.carPrice = `€ ${parseFloat(carPrice)}`;
        this.discount_price = discount_price;
    }
}

const displayError = (error)=>{   
    const showData = document.querySelector('.showData');
    showData.textContent = `${error.message}`;
    setTimeout(() => {
        showData.textContent = "";
    }, 3000);
};

const displayTable = ()=> {
    const car_keys  = Object.keys(localStorage);   // get all keys at once using Object.keys
    if(car_keys){
    const table = document.querySelector('.car-table');
    table.innerHTML = table.rows[0].innerHTML;
    let carIndex = 0;
    car_keys.forEach((carData) => {
        const cars = JSON.parse(localStorage.getItem(carData));
        if(typeof(cars)=== 'object' && cars != null && 'plateNo' in cars){

            const row = table.insertRow(-1);
            const indexing = row.insertCell(0);        //  S:N added
            indexing.textContent = carIndex + 1 ;
            carIndex += 1;
            Object.values(cars).forEach(text => {
                const cell = row.insertCell(-1);
                cell.textContent = text;   
            });
            const deleteRow = document.createElement('button');
            deleteRow.classList.add("delete"); 
            deleteRow.textContent = "Delete";
            deleteRow.addEventListener("click", () => deleteData(carData));
            row.insertCell(-1).appendChild(deleteRow);
        }
        
    }); 
    }
};

displayTable();                         // displaying table data

const deleteData = (carData)=>{
    if(carData){
        localStorage.removeItem(carData);
        const showData = document.querySelector('.showData');
        showData.innerHTML = `License plate with ${carData} is deleted successfully`
        setTimeout(() => {
            showData.textContent = "";
        }, 3000);
    }                   // remove 
    displayTable()
}


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const carData = new FormData(event.target);
     /* we can fetch values individually with select id.*/
    const carObject = Object.fromEntries(carData.entries());  
   
    const currentYear = new Date().getFullYear();                   
    let discount_price = 0;

        // form validation...
    try {
       
        if(!carObject.plate || !carObject.maker || !carObject.model|| !carObject.owner|| isNaN(carObject.price) || !carObject.color || isNaN(carObject.year)){
            throw new Error("All fields are required and must be valid.");
        }

        if(carObject.year < 1886 || carObject.year > currentYear) {
            throw new Error('Enter Year between 1886 and the current year');     
        }
        
        if(carObject.price <= 0){
            throw new Error("All fields are required and must be valid.");
        }

        if(currentYear - carObject.year >=10){
            discount_price = `€ ${carObject.price - (carObject.price * 0.15)}`
        }else {
            discount_price = "No Discount";
        }
       
       const  plateFoundAlready = localStorage.getItem(carObject.plate)
        if (plateFoundAlready)
            {
                const showData = document.querySelector('.showData');
                showData.innerHTML = `Plate number with ${carObject.plate} already exist`
                setTimeout(() => {
                    showData.textContent = "";
                }, 3000);
            }
        else{
            const car = new Car(carObject.plate, carObject.maker, carObject.model, carObject.owner, carObject.color, carObject.year, carObject.price, discount_price);
         
            form.reset()
            // added local storage step 3:
            localStorage.setItem(car.plateNo, JSON.stringify(car));             
            // add car license plate no. as a key.
            const showData = document.querySelector('.showData');
            showData.innerHTML = `<p> Car's data added successfully </p>`
            setTimeout(() => {
                showData.textContent = "";
            }, 3000);
            displayTable()

        }
        } catch (error) {
        displayError(error);
        }

});

searchCar.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    try{ 
        const findCar = document.querySelector('#search').value;
        if(findCar){
            const resultCar = JSON.parse(localStorage.getItem(findCar)) 
            if(resultCar){  
                const showData = document.querySelector('.showData');
                showData.innerHTML = `<p><b>License:</b>&nbsp;${resultCar.plateNo}</p>
                                    <p><b> Maker:</b>&nbsp;${resultCar.carMaker}</p>
                                    <p><b>Model: </b>&nbsp;${resultCar.carModel}</p>
                                    <p><b>Owner:</b>&nbsp;${resultCar.carOwner}</p>
                                    <p><b>Color:</b>&nbsp;${resultCar.carColor}</p>
                                    <p><b>Price:</b>&nbsp;${resultCar.carPrice}</p>
                                    <p><b>Discount:</b>&nbsp;${resultCar.discount_price}</p>`;
            }   
            else {
                throw new Error(`The License plate with ${findCar} has not found.`);  
            }
        }else {
            throw new Error('Search is empty!'); 
        }

    } catch(error) {
        displayError(error);
    } 

});
