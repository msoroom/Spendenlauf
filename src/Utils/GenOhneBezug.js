const { randomInt } = require('crypto')
const fs = require('fs')
const User = require('../models/user')

const names = fs.readFileSync('fruits.txt').toString().split('\n')
const colors= fs.readFileSync('colors.txt').toString().split('\n')





const genPassword = () =>{

        var p1 = names[randomInt(names.length -1)];
        p1 += randomInt(99)
        p1 += colors[randomInt(colors.length -1)]
         
        

       




        return p1 

}

const genid = async() =>{
const users = await User.find({})

const id = user.array.forEach(element => {
  

  
});


while(true){

  


}


}



console.log(genPassword())





