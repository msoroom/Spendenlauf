const mongoose = require('mongoose')


const runSchema = new mongoose.Schema({

    distance:{
        type: Number,
        require : true


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