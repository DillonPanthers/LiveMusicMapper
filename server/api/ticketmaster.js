const router = require('express').Router()
const axios= require('axios')
const dotenv= require('dotenv')
dotenv.config()


router.get('/', async(req, res)=>{
    try{
        //TICKET MASTER
        // const data = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${process.env.TICKETMASTERAPIKEY}`)
        // const events = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=US&apikey=${process.env.TICKETMASTERAPIKEY}`)
        
        const events = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&countryCode=CA&apikey=${process.env.TICKETMASTERAPIKEY}`)
        console.log('full events object', events)
        console.log('data', events.data._embedded.events)
        res.send(events.data._embedded.events)
    }catch(err){
        console.log(err)
    }
})


module.exports =router