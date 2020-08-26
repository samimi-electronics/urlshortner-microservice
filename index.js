require('dotenv').config()
// Setup express application
const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('./public'))
app.set('view engine', 'ejs')

// Short id
const shortid = require('shortid')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

// DNS and url setup
const dns = require('dns')
const url = require('url')

// Database setup
const mongoose = require('mongoose')
// Connect to database
mongoose.connect(
    process.env.DB_URI,
    {useUnifiedTopology: true, useNewUrlParser: true}
).then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, () => console.log(`Server started on port 3000`))
}).catch((err) => {
    console.log('Connection to database failed:', err)

})
// Database schema
const shortUrlSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    originalUrl: String,
})

// shortened URL Model
const ShortURL = mongoose.model('shorturl', shortUrlSchema)

// Setting up routes
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/api/shorturl/new', async (req, res) => {
    try {
        // Save given url
        const givenUrl = url.parse(req.body.url)
        if (givenUrl.hostname == null)
            return res.status(400).json({status:400, error: 'Invalid URL'})
        // Check if given url exist online
        dns.lookup(givenUrl.hostname, async (err, address, family) => {
            // If URL is not available respond with invalid URL
            if (err) return res.status(400).json({status:400, error: 'Invalid URL'})
            // Save URL to database and show user shortened URL
            const url = new ShortURL({
                originalUrl: req.body.url
            })
            try{
                const savedUrl = await url.save()
                console.log(savedUrl)
                return res.json({
                    status: 200,
                    original_url: givenUrl.href,
                    short_url: savedUrl._id
                })
            } catch(err) {
                console.log('Error saving data to database:', err)
                return res.status(500).json({status:500, error: 'Internal error'})
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({status: 400, error: 'Invalid URL'})
    }
})

app.get('/api/shorturl/:id', async (req, res) => {
    try {
        const url = await ShortURL.findById(req.params.id)
        if (!url)
            return res.status(404).json({status:404, error: 'URL not found on the database'})
        return res.redirect(url.originalUrl)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status:500, error: 'Internal error'})
    }
})


