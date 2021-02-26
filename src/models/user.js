const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uid = require('shortid')
const Runs = require('./runs')
const { Binary } = require('mongodb')


const userSchema = new mongoose.Schema({
    nickname: {
        unique:true,
        type: String,
        required: true,
        trim: true
    },
    uid:{
        type: String,
        require:true

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
    
    distance:{
        type: Number,
        default: 0
    },
    qrpic:{
        type: Buffer,


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
    }],
    


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

userSchema.statics.findByCredentials = async (nickname, password) => {


        const user = await User.findOne({ nickname })

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