const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth.middleware')

const film = require('../models/film.model')

router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    })
})

router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const films = await film.find({}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            films
        })
    }
    catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})

module.exports = router
