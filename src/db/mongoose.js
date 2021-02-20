const mongoose = require('mongoose')

mongoose.connect(process.env.DataBase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})