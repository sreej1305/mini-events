const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'name email');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, capacity } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = req.file.path;
        }

        const event = await Event.create({
            title,
            description,
            date,
            location,
            capacity,
            imageUrl,
            organizer: req.user._id,
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Owner only)
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is organizer
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this event' });
        }

        await event.deleteOne();
        res.json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    RSVP to an event
// @route   PUT /api/events/:id/rsvp
// @access  Private
const rsvpEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;

        // 1. Fetch event to check capacity (needed for the query constraint)
        const eventCheck = await Event.findById(eventId);
        if (!eventCheck) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // 2. Atomic Update: Check conditions AND update in one go
        // Conditions: 
        // - ID matches
        // - filledSpots < capacity (Prevents Overbooking)
        // - attendees NOT contains userId (Prevents duplication)
        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
                filledSpots: { $lt: eventCheck.capacity },
                attendees: { $ne: userId }
            },
            {
                $inc: { filledSpots: 1 },
                $push: { attendees: userId }
            },
            { new: true } // Return updated doc
        );

        if (!updatedEvent) {
            // If update failed, determine why
            const finalCheck = await Event.findById(eventId);
            if (finalCheck.attendees.includes(userId)) {
                return res.status(400).json({ message: 'You have already RSVPed' });
            }
            if (finalCheck.filledSpots >= finalCheck.capacity) {
                return res.status(400).json({ message: 'Event is fully booked' });
            }
            return res.status(400).json({ message: 'RSVP Failed' });
        }

        res.json(updatedEvent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancel RSVP
// @route   PUT /api/events/:id/cancel
// @access  Private
const cancelRsvp = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;

        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
                attendees: userId
            },
            {
                $inc: { filledSpots: -1 },
                $pull: { attendees: userId }
            },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(400).json({ message: 'You have not RSVPed to this event' });
        }

        res.json(updatedEvent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my events (created + rsvped)
// @route   GET /api/events/my/dashboard
// @access  Private
const getMyDashboard = async (req, res) => {
    try {
        // Events I created
        const createdEvents = await Event.find({ organizer: req.user._id });
        // Events I RSVPed to
        const rsvpedEvents = await Event.find({ attendees: req.user._id });

        res.json({
            created: createdEvents,
            rsvped: rsvpedEvents
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    deleteEvent,
    rsvpEvent,
    cancelRsvp,
    getMyDashboard
};
