import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { useState } from 'react';

const EventCard = ({ event, refreshEvents }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Safety check for user ID to prevent crashes if user object is malformed
    const [localRsvped, setLocalRsvped] = useState(false);

    // Safety check for user ID to prevent crashes if user object is malformed
    const userId = user?.id || user?._id;
    const isRsvped = event.isMock ? localRsvped : (userId && event.attendees.includes(userId));
    const isFull = event.filledSpots >= event.capacity;
    const isOwner = userId && event.organizer._id === userId;

    const handleRsvp = async () => {
        if (!user) return alert('Please login to RSVP');

        if (event.isMock) {
            setLocalRsvped(!localRsvped);
            alert(localRsvped ? 'RSVP Cancelled (Demo)' : 'RSVP Successful (Demo)');
            return;
        }

        setLoading(true);
        try {
            if (isRsvped) {
                await api.put(`/events/${event._id}/cancel`);
            } else {
                await api.put(`/events/${event._id}/rsvp`);
            }
            refreshEvents();
        } catch (err) {
            alert(err.response?.data?.message || 'Action failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure? This action cannot be undone.')) return;
        try {
            await api.delete(`/events/${event._id}`);
            refreshEvents();
        } catch (err) {
            alert(err.response?.data?.message || 'Delete failed');
        }
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '200px' }}>
                {event.imageUrl ? (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom right, var(--surface), var(--background))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '3rem', opacity: 0.2 }}>✨</span>
                    </div>
                )}
                {isRsvped && (
                    <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'var(--secondary)', color: 'white',
                        padding: '0.25rem 0.75rem', borderRadius: '2rem',
                        fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                        Attending
                    </div>
                )}
            </div>

            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>{event.title}</h3>

                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>📍 {event.location}</span>
                </div>

                <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.6, flexGrow: 1 }}>
                    {event.description.substring(0, 100)}{event.description.length > 100 ? '...' : ''}
                </p>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem' }}>
                        <span style={{ color: isFull ? 'var(--accent)' : 'var(--text-muted)' }}>
                            {event.filledSpots}/{event.capacity} <span style={{ opacity: 0.7 }}>Spots</span>
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {user && !isOwner && (
                            <button
                                onClick={handleRsvp}
                                disabled={loading || (isFull && !isRsvped)}
                                className={isRsvped ? 'btn btn-secondary' : 'btn'}
                                style={{
                                    padding: '0.4rem 1.25rem',
                                    opacity: (isFull && !isRsvped) ? 0.6 : 1,
                                    fontSize: '0.85rem'
                                }}
                            >
                                {loading ? '...' : isRsvped ? 'Cancel RSVP' : isFull ? 'Sold Out' : 'Join Event'}
                            </button>
                        )}
                        {isOwner && (
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger"
                                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444' }}
                            >
                                Delete
                            </button>
                        )}
                        {!user && (
                            <a href="/login" className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 1rem' }}>
                                Login to Join
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
