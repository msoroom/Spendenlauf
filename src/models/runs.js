const mongoose = require('mongoose')


const runSchema = new mongoose.Schema({

    distance:{
        type: Number,
        require : true,
        // min: 1,
        // max:20,
        // validate(value) {

        //     if(value == null){

        //         throw new Error('Value cannot be null')

        //     }
        // }
    }, 

    owner:{

        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
},{

 timestamps: true



})




const Runs = new mongoose.model('Run',runSchema)

module.exports = Runs