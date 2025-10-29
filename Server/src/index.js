import dotenv from 'dotenv'
import express from 'express'
import connectDB from '../Db/Connection.js'

dotenv.config()

const app = express()
const port = 3000

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Access it at http://localhost:${port}/`);
})