
const bud = document.querySelector('#out')

window.onload =  async () => {

    

    try {
    var output = document.querySelector('#out')
   
    if (output) {
        
        var container = document.querySelector("#out")
        var dl;
        var runs  = []
        

    
     
        var myHeaders = new Headers();
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        runs =   await fetch( "/runs/me?limit=10", requestOptions)
        runs = await runs.text()
        runs = JSON.parse(runs)
        //console.log('you stupid and i hate you '+ runs)
        

        
        dl = container.appendChild(
            document.createElement("dl")
        );
    
        runs.forEach(function (m,i) {
    
            var bud
            
            dt = document.createElement("dt")
            dt.innerHTML = "Lauf vom "+ m.createdAt.split('T')[0] +". Mit einer Distance von "+ m.distance+"."
            dt.value = m._id
            dt
            bud = document.createElement("button")
            
            bud.value = m._id
            bud.style.color = 'red'
            bud.innerHTML = "Delete"
            
            
            dt.appendChild(bud)
        
            dl.appendChild(dt);
    
        })
    }
    
    } catch (e) {
        console.log(e)
    }

}



bud.addEventListener('click',async ( e ) =>{
    e.preventDefault() 


    if (e.target.tagName == 'DT') return 
     
  

    
    var myHeaders = new Headers();
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    res = await fetch("/runs/"+ e.target.value , requestOptions)
    
    const dat = String(e.target.value)

    e.target.innerHTML = null


 })
 
