const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController')


router.get('/page', courseController.coursesPagination)
router.get('/:slug', courseController.showDetail)
router.get('/', courseController.courses)



module.exports = router