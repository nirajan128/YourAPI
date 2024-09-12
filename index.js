import express from 'express'
import pg from 'pg'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config() //setting up dotenv package

const app = express() //setting up express
const port = 3000 //port number

//MiddleWare
app.use(bodyParser.urlencoded({ extended: true })) //required for reading text from a form

const db = new pg.Client({
  //setting up postgres db
  connectionString: process.env.DATABASE_URL //using connectionStrion which uses a URL fro DB
})

// Connect to the database
db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err.stack))

//Rendering HomePage
app.get('/', (req, res) => {
  res.render('index.ejs', {
    message: ''
  })
})

app.post('/addContent', async (req, res) => {
  const { title, rating, imgURL } = req.body
  try {
    const dbQuery = `INSERT INTO animeList (title, rating, image) VALUES ($1, $2, $3)`
    await db.query(dbQuery, [title, rating, imgURL])
    res.render('index.ejs', {
      message: 'Content Scessfully added'
    })
  } catch (error) {
    res.render('index.ejs', {
      message: 'Content upload Failed'
    })
    console.log(error)
  }
})

//setting up server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
