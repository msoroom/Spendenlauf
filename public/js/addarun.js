const buttonkkl = document.querySelector('#confirminput')
const kminput = document.querySelector('#distanceinput')



buttonkkl.addEventListener('click', async (e)=>{

e.preventDefault()


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const dis = parseInt(kminput.value)
 
console.log(dis)

var raw = JSON.stringify({
    "distance": dis
    
})


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("/runs", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .textrun(response => response.text(Schöner Lauf! Er wurde Hinzugefügt!))
  .catch(error => console.log('error', error));

    






})