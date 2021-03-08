require('dotenv').config()
const express = require('express')


require('./db/mongoose')
const userRouter = require('./Routers/user')
const userInterface = require('./Routers/interface')
const runsRouter = require('./Routers/runs')
const path = require('path')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const User = require('./models/user')

const app = express()
const port = process.env.PORT

//variabelen 


//view engine 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))




//routers
app.use(userRouter)
app.use(userInterface)
app.use(runsRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.get('*',(req,res)=>{


    

})





const b = async ()=>{



    try {  
        const users = await User.find({}) 
        var distance = 0
        var diststufe = []
        users.forEach((user)=> {
            
            diststufe[user.stufe - 5] += user.distance
            
            distance = distance + user.distance    
            
            
        })   
        process.env.DISTOTAL = distance
        process.env.DISTSTUFE = diststufe
       //console.log( "das ist funkiton "+ process.env.DISTOTAL +"abc"+ distance+ "" )
            
    } catch(e){console.log(e)}
    
}

 setInterval(b,  60_000 )



//todo  anbieter wechsel Hetzner