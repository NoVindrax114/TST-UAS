const express = require('express')
const { ensureAuth } = require('../middleware/auth.middleware')
const router = express.Router()
const Film = require('../models/film.model')

router.get('/add', ensureAuth, (req,res)=> {
    res.render('film/add')
})
router.post('/', ensureAuth, async (req,res) => {
    try {
        req.body.user = req.user.id
        await Film.create(req.body)
        res.redirect('/dashboard')
    }
    catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})

//buat ngeliat database user lain tapi gabisa
/*router.get('/', ensureAuth, async (req,res)=> {
    try {
        const film = await Film.find({})
            .populate('user')
            .lean()
        res.render('film/index', { film, })
    }
    catch (error) {
        console.error(err)
        res.render('error/500')
    }
})*/

router.get('/edit/:id', ensureAuth, async (req,res)=> {
    try {
        const film = await Film.findOne({_id: req.params.id}).lean()
        if (!film){
            return res.render('error/404')
        }
        else{
            res.render('film/edit', {film})
        }
    }
    catch (err){
        console.error(err)
        return req.render('error/500')
    }
})
router.put('/:id', ensureAuth, async (req,res)=> {
    try {
        let film = await Film.findById(req.params.id).lean()
        if (!film) {
            return res.render('error/404')
        }
        else { 
            film = await Film.findOneAndUpdate({_id: req.params.id}, req.body, {
                new: true,
                runValidators: true
            })
        res.redirect('/dashboard')
        }
    }
    catch (err) {
        console.error(err)
        return req.render('error/500')
    }
})

router.delete('/:id', ensureAuth, async (req,res)=> {
    try {
        await Film.remove({ _id: req.params.id})
        res.redirect('/dashboard')
    }
    catch (err) {
        console.error(err)
        return req.render('error/500')
    }
})

module.exports = router
