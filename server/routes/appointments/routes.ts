import express from 'express';
import AppointmentController from '../../controllers/AppointmentController';

const router = express.Router();

router.post('/create', AppointmentController.createAppointment);
router.get('/all:date?', AppointmentController.getAppointments);
router.patch('/update', AppointmentController.updateAppointment);
router.delete('/delete', AppointmentController.deleteAppointment);

export default router;