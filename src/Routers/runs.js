const express  = require('express')
const Runs = require('../models/runs')
const auth = require('../middleware/auth')
const User = require('../models/user')

const router = new express.Router()


router.post('/runs',auth, async(req, res) => {
    

    

    var run = new Runs({
        ...req.body,
        owner : req.user._id

    })

    try {
    
        
         await run.save()
        
     
         
     

    req.user.distance += run.distance

     await req.user.save()

        res.status(200).send(run)
    } catch (error) {    
       console.log(error)
        res.status(500).send()
    }
})
// GET /runs?sortBy=stufe=strufe
// GET /runs?limit=10&skip10
// GET /runs?sortBy=createdAt:desc||asc / sortBy=stufe
router.get('/runs/me',auth, async (req, res) => {
        
        const sort = {}

        if(req.query.sortBy){

            const parts = req.query.sortBy.split(':')

            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

    try {
        
        await req.user.populate({

        path: 'runs',
        options:{

            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        }

       }).execPopulate()
    
    
       res.send(req.user.runs)

    } catch (error) {
        res.status(500).send()
    }
    
})

//public backpoint for stufen fetching 
// GET /runs?sortBy=stufe=strufe
// GET /runs?limit=10&skip10
// GET /runs?sortBy=createdAt:desc||asc / sortBy=stufe
router.get('/runs', async (req, res) => {
        
    const sort = {}

    if(req.query.sortBy){

        const parts = req.query.sortBy.split(':')

        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

try {
    
    runs = await Runs.find({},{

        options:{
            sort
        }
    
       })


   res.send(runs)

} catch (error) {
    res.status(500).send()
}

})

router.get('/runs/:id',auth, async(req, res) => {
    const _id = req.params.id

try {
    
   // const runs = await Runs.findById({_id, owner: req.user._id})
    const runs = await req.user.populate('runs').execPopulate()
    
    if(!run) res.status(404).send()
    
    res.send(run)


} catch (error) {
    
 res.status(500).send()


}
})



router.delete('/runs/:id',auth, async(req,res)=>{


    try {
        
        const run = await Runs.findByIdAndDelete({_id:req.params.id, owner: req.user._id})

        if(!run) return res.status(404).send()
        
        
        req.user.distance -= run.distance

        await req.user.save()
        res.send(run)


    } catch (e) {
        
        res.status(500).send()

    }



})


module.exports = router




