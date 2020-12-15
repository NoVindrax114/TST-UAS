const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

//Load Config
dotenv.config({ path: './config/config.env'})

//Passport Config
require('./config/passport')(passport)

//Connect DB and init auto increments
connectDB()

const app = express()

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
)

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Handlebars Helpers
const { select } = require('./helpers/hbs')
//Handlebars
app.engine('.hbs', exphbs({ helpers: { select }, defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

//Sessions 
app.use(session({
    secret: 'jesi cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth.routes'))
app.use('/film', require('./routes/film.routes'))


const PORT = process.env.PORT || 8080
app.listen(PORT,
    console.log(
      `Server started in ${process.env.NODE_ENV} mode on port ${PORT}! Visit http://localhost:${PORT}/`
    )
)