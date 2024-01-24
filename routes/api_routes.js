const router = require('express').Router()
const express = require('express')
const fs = require('fs')
const { v4 } = require('uuid')
const db = require('../db/connections')
// const { getUserData, saveUserData } = require('../db/index')

router.use(express.json())

// gets info when user accesses the api
router.get('/users', async (requestObj, responseObj) => {
    // make a query to the db and get all rows from the user table
    try {
        const [users] = await db.query('SELECT * FROM users')

        responseObj.json(users)
    } catch (err) {
        console.log(err)
    }
})

// do a post request for taking in data
router.post('/users', async (requestObj, responseObj) => {
    // get the old usrs array
    const userData = requestObj.body

    // check if use exists
    const [names] = await db.query('SELECT * FROM users WHERE username = ?', [userData.username])

    if(names.length) {
        return responseObj.json({
            error: 402,
            message: 'That user already exists'
        })
    }
    
    //run a query to INSERT a new user into the users table, with our reuqestObj.body data (username, email, password)
    const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
     [userData.username, userData.email, userData.password])
     
     responseObj.json({
        message: 'User added to database successfully',
        insertId: result.insertId
    })

    // if (!users.find(user => user.username === userData.username) && userData.username){
    // userData.id = v4()

    // users.push(requestObj.body)

    // await saveUserData(users)

    // responseObj.send('users added')}
    })

router.get('/users/:id', async (requestObj, responseObj) => {
    const user_id = requestObj.params.id

    try {

        const [results] = await db.query('SELECT * FROM users WHERE id = ?',
        [user_id])

        if (results) return responseObj.json(results[0])

        responseObj.json({
            err: 404,
            message: 'User not found with that id'
        })
    } catch (err) {
        console.log(err)

    }
    // query time
        // db.query('SELECT * FROM users WHERE id = ?',
        // [user_id],
        // (err, results) => {
        //     if (err) return console.log(err)

        //     if (results) {
        //         return responseObj.json(results[0])
        //     }

        //     responseObj.json({
        //         err: 404,
        //         message: 'User not found with that id'
        //     })
        // })
 

    // if (user) {
    //     return responseObj.send(user)
    // } 

    // responseObj.send({
    //     error: 404,
    //     message: 'User not found with that ID'
    // })
  })

router.delete('/user/:id', async (requestObj, responseObj) => {
   
    try {
        const requestID = requestObj.params.id
        await db.query('DELETE FROM users WHERE id = ?', [requestID])

        responseObj.send({
            message: 'User deleted successfully'
        })
    } catch (err) {
        console.log(err)
    }
    
    // // get user data
    // const users = await getUserData()
    // // save id from request object

    // // filter out the user mathcing our parameter ID from the users id
    // const filtered = users.filter(userObj => userObj.id !== requestID)



    // await saveUserData(filtered)

    // responseObj.send({
    //     message: 'User deleted successfully'
    // })
})


  module.exports = router