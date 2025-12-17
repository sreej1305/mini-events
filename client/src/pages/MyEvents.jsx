import { useEffect, useState } from 'react';
import api from '../api/axios';
import EventCard from '../components/EventCard';

const MyEvents = () => {
    const [events, setEvents] = useState({ created: [], rsvped: [] });
    const [loading, setLoading] = useState(true);

    const fetchMyEvents = async () => {
        try {
            const { data } = await api.get('/events/my/dashboard');
            setEvents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyEvents();
    }, []);

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>My Dashboard</h1>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Events I'm Hosting</h2>
                {events.created.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>You haven't created any events.</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {events.created.map(event => (
                            <EventCard key={event._id} event={event} refreshEvents={fetchMyEvents} />
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Events I'm Attending</h2>
                {events.rsvped.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>You haven't joined any events yet.</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {events.rsvped.map(event => (
                            <EventCard key={event._id} event={event} refreshEvents={fetchMyEvents} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyEvents;
