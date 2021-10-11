/*
GET http://localhost:3000/monsters

optional parameters:

_limit=[number] - limit the number of monsters returned
_page=[number] - offset your request for monsters to some page (must specify a limit)

example:

GET http://localhost:3000/monsters/?_limit=20&_page=3

sample response:
[
  {
    "name": "Chronos",
    "age": 4005.302453418598,
    "description": "Effulgence eldritch shunned foetid. Ululate gibbering tenebrous foetid iridescence daemoniac. Stench nameless gambrel. Amorphous furtive iridescence noisome. Foetid mortal nameless.",
    "id": 1
  },
  {
    "name": "Tartarus",
    "age": 1874.4913565609456,
    "description": "Cyclopean swarthy amorphous singular accursed furtive non-euclidean stygian. Swarthy gibbering charnel eldritch daemoniac gibbous. Cyclopean lurk hideous tentacles squamous immemorial tenebrous mortal. Madness tentacles furtive mortal foetid decadent. Foetid immemorial comprehension.",
    "id": 2
  },
  {
    "name": "Hemera",
    "age": 4094.8375978925988,
    "description": "Dank immemorial abnormal gambrel. Cat lurk unutterable. Abnormal tenebrous ululate. Nameless swarthy manuscript eldritch indescribable accursed antediluvian decadent.",
    "id": 3
  }
]
Create a monster:

POST http://localhost:3000/monsters
headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body:
{ name: string, age: number, description: string }
*/

document.addEventListener("DOMContentLoaded", (e) => {
    let form = document.createElement('Form'); 
    form.id = "form"; 
    let name = document.createElement('Input');
    name.setAttribute('type', 'text'); 
    name.placeholder = 'Name'
    let age = document.createElement('Input');
    age.setAttribute('type', 'text'); 
    age.placeholder = 'Age'
    let description = document.createElement('Input');
    description.setAttribute('type', 'text'); 
    description.placeholder = 'Description'
    let submitButton = document.createElement("button");
    submitButton.id = "submitButton"; 
    submitButton.textContent = "Create a Monster";
    form.append(name, age, description, submitButton); 
    document.querySelector("#create-monster").append(form); 
    addMonster(); 
    let x = 1
    twentyMonsters(x);
    document.querySelector("#forward").addEventListener('click', (e) => {
        twentyMonsters(x++);
    })
    document.querySelector("#back").addEventListener('click', (e) => {
        twentyMonsters(x--);
    })
})

function twentyMonsters(page){
    let x = 1;
    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${page}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => populatePage(element));
    })
}
function populatePage(data){
    let name = document.createElement('h1');
    let age = document.createElement('h2');
    let desc = document.createElement('h3'); 
    name.textContent = data.name;
    age.textContent = `Age: ${data.age}`;
    desc.textContent = `Bio: ${data.description}`
    document.querySelector('#monster-container').append(name, age, desc);
}
function addMonster(){
    document.querySelector('#form').addEventListener("submit", (e) =>{
e.preventDefault(); 
 let name = document.createElement('h2');
let age = document.createElement('h4');
let desc = document.createElement('h5'); 
name.textContent = e.target[0].value;
age.textContent = `Age: ${e.target[1].value}`;
desc.textContent = `Bio: ${e.target[2].value}`
document.querySelector('#monster-container').append(name, age, desc);

 fetch("http://localhost:3000/monsters",{
 method: 'POST', 
 headers: 
{"Content-Type": "application/json",
Accept: "application/json"
},
body: JSON.stringify(
{ name: `${e.target[0].value}`, age: `${e.target[1].value}`, description: `${e.target[0].value}` } )
}).then(response => response.json())
.then(json => console.log(json))
 })
}