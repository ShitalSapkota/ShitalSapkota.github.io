const cardcontainer = document.querySelector('.container');

function addCard(robot){
  const card = document.createElement("div");
  card.classList.add("card");
  const image = document.createElement("img");
  image.src = `https://robohash.org/${robot.id}?set=set4`;
  card.appendChild(image);
  const cardText = document.createElement("div");
  cardText.innerHTML = `<p><b>Name:</b> ${robot.name}</p>
                        <p><b>Username:</b> ${robot.username}</p>
                        <p><b>Email:</b> ${robot.email}</p>  
                        <p><b>ID:</b> ${robot.id}</p>`;
  card.appendChild(cardText);
  
  cardcontainer.appendChild(card);    
} 

async function fetchPerson() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json()
  //console.log(data)
  data.forEach(robot => addCard(robot))
}
fetchPerson();

// persons project is for displaying individual data of the user using cat images as a avatar