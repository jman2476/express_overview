const express  = require('express')


const cors=  require('cors')
const { v4 } = require('uuid')

const api_routes = require('./routes/api_routes')

const PORT = 3333

const app = express()



app.use(express.static('./public'))

app.use(cors())

app.use('/api', api_routes)
// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json())





// listen takes the port number as a 
app.listen(PORT, () => {
    console.log('Server started on port', PORT)
})