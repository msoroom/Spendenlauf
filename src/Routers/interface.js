const express = require('express')
const router = new express.Router()
const hbs = require('hbs')
const auth = require('../middleware/auth')
const User = require('../models/user')


router.get('/', (req, res) => {

    res.render('index', {



    })

})


router.get('/total', (req, res) => {
    console.log(process.env.DISTOTAL)
    res.render('total', {

        distance: process.env.DISTOTAL

    })

})

router.get('/singUp', (req, res) => {

    res.render('SignUp', {

    })





})
router.get('/singIn', (req, res) => {

    res.render('login', {

    })

})

router.get('/profiles/:id', async (req, res) => {

    const uid = req.params.id




    try {
        
        if (!uid) throw new Error('Pls specify id')
        const user = await User.find({ uid : uid })
        
        if ((user).length == 0 ) throw new Error('User not foud')

        
        res.render('publicuser',{

            stuff:user

        })
        

    } catch (e) {

        res.status(404).send(e)

    }




})


router.get('/me', auth, (req, res) => {

    res.render('me', {

        name: req.user.name,
        Userdistance: req.user.distance,
        distance: process.env.DISTOTAL
    })


})

router.get('/datenschutz', (req, res) => {

    res.render('Datenschut', {


    })

})
router.get('/impressum', (req, res) => {

    res.render('impressum', {


    })

})
router.get('/UeberdasProjekt', (req, res) => {

    res.render('UeberdasProjekt', {


    })

})


module.exports = router