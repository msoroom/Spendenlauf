const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const Paid = require('../Utils/GenOhneBezug') 

router.post('/users', async (req, res) => {
    
    var creds = {}
    while (true) {

        const uid = Paid.genid()
        const password = Paid.genPassword()

        creds = {

            uid,
            password

        }

        const temp = await User.find(creds)

        
        
        if(temp.length == 0) break


    }
  
    
    
    
    
    const user = new User({
        ...req.body,
        ...creds


    })
    console.log(user)
    try {
        await user.save()

        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        res.status(201).send({ user, token, creds })

    }
    catch (e) {
        console.log(e)
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


router.delete('/users/me',auth, async (req, res) => {


    try {


        await req.user.remove()

        res.send(req.user)

    } catch (error) {

        res.status(500).send()

    }





})




module.exports = router