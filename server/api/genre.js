// const qs = require('qs');
const {Genre} = require('../db/index')
const router = require('express').Router();
const axios = require('axios');

// GET api/genre
router.get('/', async(req, res, next) => {
    try{
        let genreList= await Genre.findAll()
        res.send(genreList)
    }catch(err){
        console.log(err)
    }
});



module.exports = router;