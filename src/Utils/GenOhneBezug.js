
const { randomInt } = require('crypto');
const fs = require('fs');



const names = fs.readFileSync('./src/Utils/fruits.txt').toString().split('\n')
const colors = fs.readFileSync('./src/Utils/colors.txt').toString().split('\n')





module.exports.genPassword = () => {

  var p1 = names[randomInt(names.length - 1)];
  p1 += randomInt(99)
  p1 += colors[randomInt(colors.length - 1)]

  return p1

}

module.exports.genid = () => {

  const a = ((Math.random() * 1_000_000_0)).toFixed(0)
  var num = "0".repeat(7 - a.length) + a
  return num
}












