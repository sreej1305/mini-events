import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { useState } from 'react';

const EventCard = ({ event, refreshEvents }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [localRsvped, setLocalRsvped] = useState(false);

    const userId = user?.id || user?._id;
    const isRsvped = event.isMock ? localRsvped : (userId && event.attendees?.includes(userId));
    const isFull = event.filledSpots >= event.capacity;
    const isOwner = userId && event.organizer?._id === userId;
    const spotsLeft = event.capacity - event.filledSpots;
    const percentFull = Math.min(100, (event.filledSpots / event.capacity) * 100);

    const handleRsvp = async () => {
        if (!user) return alert('Please login to RSVP');

        if (event.isMock) {
            setLocalRsvped(!localRsvped);
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
        <div className="card event-card-premium" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', position: 'relative' }}>
            {/* Image Section */}
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                    src={event.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80'}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="card-image-zoom"
                />
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: 'var(--text)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    {event.category || 'Gathering'}
                </div>
                {isRsvped && (
                    <div style={{
                        position: 'absolute', bottom: '12px', right: '12px',
                        background: 'var(--success, #10b981)', color: 'white',
                        padding: '4px 10px', borderRadius: '8px',
                        fontSize: '0.75rem', fontWeight: 'bold',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                    }}>
                        Attending
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.35rem', lineHeight: 1.2, margin: 0 }}>{event.title}</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>📅 {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>📍 {event.location}</span>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text)', opacity: 0.8, lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
                    {event.description?.substring(0, 90)}{event.description?.length > 90 ? '...' : ''}
                </p>

                {/* Availability & Actions */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 500 }}>
                            <span>Availability</span>
                            <span style={{ color: spotsLeft < 10 ? '#ef4444' : 'var(--primary-dark)' }}>
                                {isFull ? 'Sold Out' : `${spotsLeft} spots left`}
                            </span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${percentFull}%`,
                                height: '100%',
                                background: isFull ? 'var(--text-muted)' : 'var(--primary)',
                                borderRadius: '3px',
                                transition: 'width 0.5s ease-out'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {user && !isOwner ? (
                            <button
                                onClick={handleRsvp}
                                disabled={loading || (isFull && !isRsvped)}
                                className={isRsvped ? 'btn btn-secondary' : 'btn btn-primary'}
                                style={{
                                    width: '100%',
                                    padding: '0.7rem',
                                    fontWeight: 600,
                                    opacity: (isFull && !isRsvped) ? 0.7 : 1
                                }}
                            >
                                {loading ? 'Processing...' : isRsvped ? 'Cancel RSVP' : isFull ? 'Waitlist' : 'Join Event'}
                            </button>
                        ) : isOwner ? (
                            <button onClick={handleDelete} className="btn btn-secondary" style={{ width: '100%', borderColor: '#ef4444', color: '#ef4444' }}>
                                Cancel Event
                            </button>
                        ) : (
                            <a href="/login" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                                Log in to Join
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
