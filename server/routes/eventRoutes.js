const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    deleteEvent,
    rsvpEvent,
    cancelRsvp,
    getMyDashboard
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

router.get('/', getEvents);
router.get('/my/dashboard', protect, getMyDashboard);
router.get('/:id', getEventById);

router.post('/', protect, upload.single('image'), createEvent);
router.delete('/:id', protect, deleteEvent);

router.put('/:id/rsvp', protect, rsvpEvent);
router.put('/:id/cancel', protect, cancelRsvp);

module.exports = router;
