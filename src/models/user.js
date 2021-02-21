const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Runs = require('./runs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    distance:{
        type: Number,
        default: 0

    },
    stufe:{
        type: Number,
        require: true,
        validate(value){
            const validstufen = [5,6,7,8,9,10,11,12, 2 ]

            if(!validstufen.includes(value)) throw new Error('Das ist keine Stufe')

        }

    },


    tokens:[{
       token:{
        type:String,
        require:true

       } 

    }]
},{ 
    
    timestamps: true

})



userSchema.virtual('runs',{
ref: 'Run',
localField:'_id',
foreignField: 'owner'
})


userSchema.methods.generateAuthToken = async function() {

    const user = this

    const token = jwt.sign({_id : user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

userSchema.methods.toJSON = function(){

const user = this

const userObjekt = user.toObject()

delete userObjekt.password
delete userObjekt.tokens

return userObjekt



}
// userSchema.methods.distance = async function (){
//  const distace = 0
//  this.runs.forEach(element => {
   
//     distance += run.distace
    

//  })


// }

userSchema.statics.findByCredentials = async (email, password) => {


        const user = await User.findOne({ email })

        if (!user) throw new Error('Unabel to login')
           

        

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) throw new Error('Unabel to login')


        return user
}


//Hash the plain Text pwd

userSchema.pre('save', async function (next) {

   
    const user = this 

    if(user.isModified('password')){

        user.password = await bcrypt.hash(user.password,8)


    }

    next()
})

//delteUsertasks when user is removed

userSchema.pre('remove', async function(next){


await Runs.deleteMany({id: this._id})

next()

})




const User = mongoose.model('User', userSchema)

module.exports = User