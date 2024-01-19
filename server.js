const express  = require('express')
const path = require('path')
const fs = require('fs')

const PORT = 3333

const app = express()

async function getUserData() {
    const users = await fs.promises.readFile('./data.json', 'utf8')

    return JSON.parse(users)
}

async function saveUserData(userArr) {
    await fs.promises.writeFile('./data.json', JSON.stringify(userArr, null, 2))

    console.log('User Data uploaded')
}

app.get('/', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/index.html'))
})

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json())

// gets info when user accesses the api
app.get('/api/users', async (requestObj, responseObj) => {
    // read the json file in
    const users = await getUserData()

    responseObj.send(users)
})

// do a post request for taking in data
app.post('/api/users', async (requestObj, responseObj) => {
    const users = [await getUserData()]

    users.push(requestObj.body)

    await saveUserData(users)

    responseObj.send('users added')
})

// listen takes the port number as a 
app.listen(PORT, () => {
    console.log('Server started on port', PORT)
})