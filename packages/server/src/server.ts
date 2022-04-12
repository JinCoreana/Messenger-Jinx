import express, { Application } from 'express'
import sequelize from './sequelize'
import routes from './routes'
import session from 'express-session'
const app: Application = express()
const FileStore = require('session-file-store')(session)
const sessionMiddleware = session({
    secret: 'jinx',
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false,
    store: new FileStore(),
})
app.use(sessionMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
sequelize.sync({ force: true })
app.use('/', routes);

app.listen(8000, () => {
    console.log('start')
})