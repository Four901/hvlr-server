

                



const connectToMongoose=require('./db')

connectToMongoose();

var cors = require('cors')//to make connection between....yes i know 
const express = require('express')

const app = express()



app.use(cors())
app.use(express.json())





//routes


app.use('/api/auth',require('./routes/auth')),

app.use('/api/device',require('./routes/device'))



const port =process.env.PORT||5000

// for deployment

app.get('/', (req, res) => {
  res.send('Hello BhaiLog!')
})
app.listen(port, () => {
  console.log(`Bhaii spardha listening on port ${port}`)
})
