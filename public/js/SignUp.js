const ac = document.querySelector('form')
const named  = document.querySelector('.name')

const succ = document.querySelector('#abc')
const drop = document.querySelector('#drop')


ac.addEventListener('submit', async (e)=>{
  e.preventDefault()


  var stufe = drop.value

  if(stufe === 'Lehrer') stufe = 2
  
 
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"nickname":named.value,
"stufe":stufe

});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

 
 fetch("/users", requestOptions).then(res => res.text())
  .then(response => {

    if(response.error) {

      succ.textContent = 'faild'

    }
    else{
     
      response = JSON.parse(response)

      console.log(response.creds)

      succ.textContent = "Öfentlicherzugang: " +window.location.origin+"/me/"+ response.creds.uid +"\n Password:"+JSON.stringify(response.creds.password)
    
    }

  })
    

    
  .catch(error => console.log('error', error));

})
//Cuckoo38indigo
//agdadg