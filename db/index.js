const router = require('express').Router()
const fs = require('fs')
const { v4 } = require('uuid')
const path = require('path')


const DB_path = path.join(__dirname, './data.json')

async function getUserData() {
    const users = await fs.promises.readFile(DB_path, 'utf8')

    return JSON.parse(users)
}

async function saveUserData(userArr) {
    await fs.promises.writeFile(DB_path, JSON.stringify(userArr, null, 2))

    console.log('User Data uploaded')
}

module.exports = {
    getUserData,
    saveUserData 
}