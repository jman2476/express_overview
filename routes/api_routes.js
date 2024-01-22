const router = require('express').Router()
const express = require('express')
const fs = require('fs')
const { v4 } = require('uuid')
const { getUserData, saveUserData } = require('../db/index')

router.use(express.json())

// gets info when user accesses the api
router.get('/users', async (requestObj, responseObj) => {
    // read the json file in
    const users = await getUserData()

    responseObj.send(users)
})

// do a post request for taking in data
router.post('/users', async (requestObj, responseObj) => {
    const users = await getUserData()
    const userData = requestObj.body
    console.log(userData)

    if (!users.find(user => user.username === userData.username) && userData.username){
    userData.id = v4()

    users.push(requestObj.body)

    await saveUserData(users)

    responseObj.send('users added')}
})

router.get('/users/:id', async (requestObj, responseObj) => {
    const user_id = requestObj.params.id

    const users = await getUserData()

    const user = users.find(user => user.id === user_id)

    if (user) {
        return responseObj.send(user)
    } 

    responseObj.send({
        error: 404,
        message: 'User not found with that ID'
    })
  })

router.delete('/user/:id', async (requestObj, responseObj) => {
    // get user data
    const users = await getUserData()
    // save id from request object
    const requestID = requestObj.params.id

    // filter out the user mathcing our parameter ID from the users id
    const filtered = users.filter(userObj => userObj.id !== requestID)



    await saveUserData(filtered)

    responseObj.send({
        message: 'User deleted successfully'
    })
})


  module.exports = router