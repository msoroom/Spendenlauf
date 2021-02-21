const ac = document.querySelector('form')
const named  = document.querySelector('.name')
const emaild = document.querySelector('.email')
const pwd1d  = document.querySelector('.password')
const pwd2d  = document.querySelector('.repeat-password')
const succ = document.querySelector('#abc')
const drop = document.querySelector('#drop')


ac.addEventListener('submit', async (e)=>{
  e.preventDefault()



  
  const pwdt1= pwd1d.value
  const pwdt2= pwd2d.value
   
  if( !pwdt1 == pwdt2 ) return  

  var stufe = drop.value

  if(stufe === 'Lehrer') stufe = 2
  
 
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"name":named.value,
"email":emaild.value,
"password": pwdt1,
"stufe": stufe
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

 //const data =  await (await fetch("http://localhost:3000/users", requestOptions)).text()
 fetch("/users", requestOptions)
  .then(response => window.location.assign('/me'))

  .catch(error => console.log('error', error));

})
