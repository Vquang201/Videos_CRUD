const Courses = require('../models/Course')
const { mutipleMongooseToObject } = require('../util/mongoose')

class SiteController {
    //Phương thức index
    //[GET] /
    home(req, res, next) {
        // Model.find() no longer accepts a callback
        // Course.find({}, function (err, docs) {
        //     if (!err) {
        //         return res.json(docs)
        //     } else {
        //         res.status(400).json({ error: 'ERROR' })
        //     }
        // })

        Courses.find({})
            .then(courses => res.render('home', {
                courses: mutipleMongooseToObject(courses),

            }))
            .catch(err => next(err))

        // res.render('home')
    }

    //[GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController