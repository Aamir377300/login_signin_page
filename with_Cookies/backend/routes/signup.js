const express = require('express')
const signup_data_to_mongodb = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await signup_data_to_mongodb.create({
            name, email, password: hashedPassword, phone
        })

        // create token for new user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        // send cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false, // true only with HTTPS
            maxAge: 3600000
        })

        res.status(201).json({ message: 'User created successfully', token })
    } catch (err) {
        console.log("Signup error: ", err)
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router
