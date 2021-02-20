const ac = document.querySelector('form')
const named  = document.querySelector('.name')
const emaild = document.querySelector('.email')
const pwd1d  = document.querySelector('.password')
const pwd2d  = document.querySelector('.repeat-password')
const succ = document.querySelector('#abc')





ac.addEventListener('submit', async (e)=>{
  e.preventDefault()
  
  const pwdt1= pwd1d.value
  const pwdt2= pwd2d.value
  
  
  if( pwdt1 == pwdt2 ){
    
    
  }else return  
 
 
 
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"name":named.value,
"email":emaild.value,
"password": pwdt1
});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

try {

 //const data =  await (await fetch("http://localhost:3000/users", requestOptions)).text()
 fetch("http://localhost:3000/users", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


} catch (error) {
  
}

// .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));





}
)
