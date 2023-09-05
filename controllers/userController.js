const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwtSecret=process.env.JWT_SECRET
const register = async (req, res) => {
    
    try {
        const { name, email, password } = req.body
        const userdoc= await User.create({
            name, email,
            password:  bcrypt.hashSync(password,bcrypt.genSaltSync(10))
        })
        res.status(201).json(userdoc)
    } catch (error) {
        console.log(error)
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email,password)
        const user = await User.findOne({ email })
        console.log(user,'user')
        if (!user) {
            return res.send("user not found")
        }
        const passwordMatched =bcrypt.compare(password, user.password)
        if (passwordMatched) {
            jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET, {}, (err,token) => {
                if (err) console.log(err);
                console.log(token)
                res.cookie('token',token).send("password is ok")
            })
        }
        else {
            res.status(401).send("password not ok")
        }
        
    } catch (error) {
        res.send("user not found")
    }
}
const getprofile = async (req, res) => {
    try {
        const { token } = req.cookies
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, async(err,user) => {
                if (err) throw err;
                const userDoc = await User.findById(user.id)
                console.log(userDoc)
                return res.json(userDoc)
            })
        }
        else {
            res.json(null)
        }
    } catch (error) {
        console.log(error)
        res.send("user not found")
    }
}
const logout = async(req,res) => {
    try {
        res.cookie('token').json(true)
    } catch (error) {
        console.log(error)
        res.send("user not found")
    }
}
module.exports={register,login,getprofile,logout}