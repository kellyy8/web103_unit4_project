import express from 'express'
import {
    getAllEarrings,
    getEarring,
    createEarring,
    editEarring,
    deleteEarring
} from '../controllers/earringController.js'

const router = express.Router()
router.get('/customearrings', getAllEarrings)
router.get('/customearrings/:id', getEarring)
router.post('/', createEarring)
router.patch('/edit/:id', editEarring)
router.delete('/edit/:id', deleteEarring)

export default router