const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const route = require('./routes')
const db = require('./config/db')
const sortMiddleware = require('./middlewares/sortMiddleware')


//Connect to DB
db.connect()

// middleware xử lý boby , gửi dữ liệu lên server từ form
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//Hanldebar
app.use(express.static(path.join(__dirname, 'public')))

//Vượt Cors
app.use(cors())

// sử dụng methodOverride để sử dụng action PUT/DELETE trong form
app.use(methodOverride('_method'))

// custom Middleware
app.use(sortMiddleware)

//HTTPS LOGGER
app.use(morgan('combined'))

//Setup Handelbars 
app.engine('handlebars', engine({
    helpers: {
        sum: (a, b) => a + b,
        sortAble: (field, sort) => {

            const sortType = field === sort.column ? sort.type : 'default'

            const icons = {
                default: 'fa fa-sort',
                asc: 'fa fa-sort-asc',
                desc: 'fa fa-sort-desc '
            }

            const types = {
                default: 'asc',
                asc: 'desc',
                desc: 'asc'
            }

            const icon = icons[sortType]
            const type = types[sortType]
            return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}" aria-hidden="true"></i></a>`
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app)

app.listen('8080', () => {
    console.log('Server is running ....')
})
