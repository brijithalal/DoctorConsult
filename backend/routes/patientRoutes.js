import { loginPatient, registerPatient } from '../controllers/patientController.js'
import express from 'express'

const router = express.Router()

router.post('/register',registerPatient);
router.post('/login',loginPatient);

export default router; 