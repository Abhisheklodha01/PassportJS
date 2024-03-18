import express from 'express'
import connectDB from './db.js'
import { User } from './db.js'
import passport from 'passport'
import { initializingPassport } from './passportConfig.js'
import expressSession from 'express-session'

const app = express()

connectDB()
initializingPassport(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({
    secret: "secret", resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs")



app.get('/', (req, res) => {
    res.render("index")
})

app.get('/register', (req, res) => {
    res.render("register")
})

app.get('/login', (req, res) => {
    res.render("login")
})


app.post('/register', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        else {
            const newUser = await User.create(req.body)

            res.status(201).json({
                success: true,
                message: "Registerd successfully",
                newUser
            })
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/register', successRedirect: '/' }))


app.listen(4000, () => {
    console.log("server is running");
})