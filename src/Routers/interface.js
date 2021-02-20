const express = require('express')
const router = new express.Router()
const hbs = require('hbs')


router.get('/',(req,res)=>{

    res.render('index',{


        
    })

})


router.get('/total',(req,res)=>{
    console.log(process.env.DISTOTAL)
    res.render('total',{
        
        distance: process.env.DISTOTAL

    })

})

router.get('/singUp',(req,res) =>{

    res.render('SignUp',{

    })





})
router.get('/singIn',(req,res)=>{

res.render('login', {




})



})

module.exports = router