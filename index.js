import express from 'express'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

