const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()

        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        res.status(201).send({ user, token })

    }
    catch (e) {
        res.status(401).send()

    }



})

router.post('/users/login', async (req, res) => {


    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.cookie('auth_token', token)
        res.send({ user , token })

    } catch (e) {

        res.status(400).send()

    }



})


router.post('/users/logout', auth, async (req, res) => {

    try {

        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== req.token

        })



        await req.user.save()


        res.send()


    } catch (e) {


        res.status(500).send()


    }


})

router.post('/users/logoutAll', auth, async (req, res) => {


    try {

        req.user.tokens = []

        await req.user.save()

        res.send()

    } catch (e) {

        res.status(500).send(e)

    }


})



router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)

})



router.patch('/users/me',auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid operation' })

    try {

        

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()


        res.send(req.user)

    } catch (error) {

        res.status(400).send()


    }


})
router.get('/totalrun', async (req, res) => {

    
    
    try {
        
        const users = await User.find({})
     
        var distance = 0

        users.forEach((user)=> {

            distance = distance + user.distance
            
        })
        console.log({distance : distance})
        
        res.send({distance})

    } catch (e) {
       
         res.status(500).send()

    }


})

router.delete('/users/me',auth, async (req, res) => {


    try {

        // const user = await User.findByIdAndDelete(req.user._id)


        // res.send(user)

        await req.user.remove()

        res.send(req.user)

    } catch (error) {

        res.status(500).send()

    }





})




module.exports = router