

const button = document.querySelector('#Logedout')


button.addEventListener('click',(e)=>{

var myHeaders = new Headers();


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};
fetch("/users/logout", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  window.location.assign('/')

})