const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const PORT = 3333;

const app = express();

async function getUserData() {
  const users = await fs.promises.readFile('./data.json', 'utf8');

  return JSON.parse(users);
}

async function saveUserData(usersArr) {
  await fs.promises.writeFile('./data.json', JSON.stringify(usersArr, null, 2));

  console.log('User Data Updated');
}

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Share or create a GET route for every file in the public folder
app.use(express.static('./public'));

// Open CORS to all domains
// app.use(cors());

// Route to retreive/GET all users from the json database
app.get('/api/users', async (requestObj, responseObj) => {
  // Read the json file data
  const users = await getUserData();

  responseObj.send(users);
});

// Route to add a user to the json database
app.post('/api/users', async (requestObj, responseObj) => {
  // Get the old users array
  const users = await getUserData();
  const userData = requestObj.body;

  // Overwrite the old array with the newly updated array
  if (!users.find(user => user.username === userData.username) && userData.username) {
    // Push the body object from the client to our old array

    userData.id = v4();

    users.push(userData);

    await saveUserData(users);

    return responseObj.send({
      message: 'User added successfully!'
    });
  }

  responseObj.send({
    error: 402,
    message: 'User already exists'
  });

});

app.get('/api/users/:id', (requestObj, responseObj) => {
  console.log(requestObj.params)
})

app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});