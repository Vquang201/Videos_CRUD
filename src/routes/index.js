const courseRouter = require('./courses')
const siteRouter = require('./site')
const adminRouter = require('./admin')

const route = (app) => {
    app.use('/courses', courseRouter)
    app.use('/admin', adminRouter)
    app.use('/', siteRouter)

}

module.exports = route