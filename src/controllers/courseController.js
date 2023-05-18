const Courses = require('../models/Course')
const { mongooseToObject, mutipleMongooseToObject } = require('../util/mongoose')

class CourseController {
    //Phương thức
    //[GET] /course
    courses(req, res) {
        Courses.find({})
            .then(courses => res.render('courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(err => next(err))
        // .then(data => console.log(data))
    }

    //[GET] /course/:slug
    showDetail(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then(courses => res.render('courseDetail', {
                course: mongooseToObject(courses),
            }))
            .catch(err => next(err))
    }

    // [GET] /courses/page?page=1
    coursesPagination(req, res, next) {
        const PAGE_SIZE = 10
        const page = Number(req.query.page)
        const skip = (page - 1) * PAGE_SIZE

        if (page) {
            Courses.find({})
                .skip(skip)
                .limit(PAGE_SIZE)
                .then(data => {
                    res.json(data)
                })
                .catch(err => res.status(500).json(err))
        } else {
            Courses.find({})
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        }
    }
}

module.exports = new CourseController