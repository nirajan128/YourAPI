import express from 'express'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config() //setting up dotenv package

const app = express() //setting up express
const port = 3000 //port number

const db = new pg.Client({
  //setting up postgres db
  connectionString: process.env.DATABASE_URL //using connectionStrion which uses a URL fro DB
})

// Connect to the database
db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err.stack))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

//seeting up server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
