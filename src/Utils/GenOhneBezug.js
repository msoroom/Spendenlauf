const { randomInt } = require('crypto')
const fs = require('fs')

const names = fs.readFileSync('fruits.txt').toString().split('\n')
const colors= fs.readFileSync('colors.txt').toString().split('\n')





const genPassword = () =>{

        var p1 = names[randomInt(names.length -1)];
        p1 += randomInt(99)
        p1 += colors[randomInt(colors.length -1)]
         
        

       




        return p1 

}

const clearfile = () =>{

  const a =   names.filter((name) => !name.includes(' ') )

    




}


console.log(genPassword())