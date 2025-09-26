const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const data_from_mongodb_verify_for_login = require('../models/user')
const authMiddleware = require('../middleware/verifyToken') // import middleware

// LOGIN route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Fill all the fields' })
    }

    try {
        const user = await data_from_mongodb_verify_for_login.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: 'Invalid credential' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credential' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.cookie("authToken", token, {
            httpOnly: true, // prevents JS access
            secure: false,  // set true in production with HTTPS
            maxAge: 3600000 // 1 hour
        });

        console.log("🍪 Cookie set:", req.cookies);

        return res.json({ message: "Login successful", token })
    }
    catch (err) {
        console.log("the error be :->", err)
        res.status(500).json({ error: 'Server error' })
    }
})

// PROTECTED GET route
router.get('/profile', authMiddleware, (req, res) => {
        res.json({ username: req.user.name }) // username from DB
})

// LOGOUT route
router.post('/logout', (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully" });
})

module.exports = router
