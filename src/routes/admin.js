const express = require('express')
const adminController = require('../controllers/adminController')
const router = express.Router()


//CREATE
router.get('/create', adminController.create)
router.post('/create', adminController.submitCreateCourse)

// UPDATE
router.put('/:id/edit', adminController.submitUpdateVideo)
router.get('/:id/edit', adminController.updateVideo)
router.get('/show-list', adminController.showVideo)

// DELETE
router.delete('/delete/:id', adminController.deleteVideo)
router.delete('/trash-bin/:id', adminController.deleteTrash)
router.get('/trash-list', adminController.trashList)

//restore 
router.patch('/restore/:id', adminController.restoreVideo)

//checkbox action
router.post('/form-checkbox-action', adminController.handleCheckboxAction)
router.post('/form-trash-checkbox-action', adminController.handleTrashCheckboxAction)

//Admin
router.get('/', adminController.adminHome)


module.exports = router