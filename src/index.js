const express = require('express')
require('dotenv').config()




const app = express()


const port = process.env.PORT || 3000

app.use(express.json())

//cooler tooller stuff 



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


console.log(process.env.TEST)





