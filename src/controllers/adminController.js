const Courses = require('../models/Course')
const { mongooseToObject, mutipleMongooseToObject } = require('../util/mongoose')

class adminController {

    //[GET] /admin
    adminHome(req, res, next) {
        res.render('admin/adminHome')
    }

    //[GET] /admin/create
    create(req, res, next) {
        res.render('admin/createCourse')
    }

    //[POST] /admin/create
    submitCreateCourse(req, res, next) {
        let formData = req.body;
        formData.image = `https://i.ytimg.com/vi_webp/${req.body.videoId}/maxresdefault.webp`;
        const course = new Courses(formData)
        course.save()
            .then(data => {
                res.redirect('/admin/show-list')
            })
            .catch(err => res.status(500).json(err))
    }

    // [Get] /admin/showlist
    showVideo(req, res, next) {
        // Courses.countDeleted({})
        //     .then(deletedVideoCount => console.log(deletedVideoCount))

        // Courses.find({})
        //     .then(data => res.render('admin/showCourses', {
        //         courses: mutipleMongooseToObject(data)
        //     }))
        //     .catch(err => res.status(500).json(err))

        // SORT
        let courseQuery = Courses.find({})

        if (req.query.hasOwnProperty('_sort')) {
            // Tiến hành sắp xếp col name
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }

        //PROMISE ALL
        Promise.all([Courses.countDeleted({}), courseQuery])
            .then((value) => {
                res.render('admin/showCourses', {
                    courses: mutipleMongooseToObject(value[1]),
                    deletedVideoCount: value[0]
                })
            })
            .catch(err => res.status(500).json(err))
    }

    //[GET] /admin/:id/edit
    updateVideo(req, res, next) {
        Courses.findById({ _id: req.params.id })
            .then(data => {
                res.render('admin/editCourse', {
                    course: mongooseToObject(data)
                })
            })
            .catch(err => res.status(500).json(err))

    }

    //[GET] /admin/trash-list
    trashList(req, res, next) {
        Courses.findDeleted({})
            .then(data => res.render('admin/trashList', {
                courses: mutipleMongooseToObject(data)
            }))
            .catch(err => res.status(500).json(err))
    }

    //[PUT] /admin/:id/edit
    submitUpdateVideo(req, res, next) {
        Courses.updateOne({ _id: req.params.id }, req.body)
            .then(data => res.redirect('/'))
            .catch(err => res.status(500).json(err))
    }

    //[PATCH] /admin/restore/:id
    restoreVideo(req, res, next) {
        Courses.restore({ _id: req.params.id })
            .then(data => res.redirect('/admin/show-list'))
            .catch(err => res.status(500).json(err))

    }

    //[DELETE] /admin/delete/:id (soft delete)
    deleteVideo(req, res, next) {
        Courses.delete({ _id: req.params.id })
            .then(data => res.redirect('back'))
            .catch(err => res.status(500).json(err))
    }


    //[DELETE] /admin/trash/:id (Xóa vĩnh viễn)
    deleteTrash(req, res, next) {
        Courses.findByIdAndDelete({ _id: req.params.id })
            .then(data => res.redirect('/admin/show-list'))
            .catch(err => res.status(500).json(err))
    }

    //[POST] /admin/form-checkbox-action
    handleCheckboxAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                //xóa tất cả _id nằm trong list { $in: req.body.videoIds }
                Courses.delete({ _id: { $in: req.body.videoIds } })
                    .then(data => res.redirect('back'))
                    .catch(err => res.status(500).json(err))
                break
            default:
                res.json({ message: 'ERROR ACTION' })
                break
        }
    }

    //[POST] /admin/form-trash-checkbox-action
    handleTrashCheckboxAction(req, res, next) {
        // SỬ DỤNG ASYNC AWAIT => KH SÀI $IN:req.body.videoIds được
        switch (req.body.action) {
            case 'restore':
                Courses.restore({ _id: { $in: req.body?.videoIds } })
                    .then(data => res.redirect('back'))
                    .catch(err => res.status(500).json(err))
                break
            case 'delete':
                Courses.findByIdAndDelete({ _id: { $in: req.boby?.videoIds } })
                    .then(data => res.redirect('back'))
                    .catch(err => res.status(500).json(err))
                break
            default:
                res.json({ message: 'ERROR ACTION' })
                break
        }
    }


}

module.exports = new adminController