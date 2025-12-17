import { useEffect, useState } from 'react';
import api from '../api/axios';
import EventCard from '../components/EventCard';
import QuoteBanner from '../components/QuoteBanner';
import { mockEvents, communityEvents } from '../api/mockEvents';
import { EventCardSkeleton } from '../components/Skeleton';
import { useToast } from '../context/ToastContext';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const { addToast } = useToast();

    const fetchEvents = async () => {
        // Fallback timer: if API takes > 2s (Render cold start), stop loading to show Mock Data
        const timeoutId = setTimeout(() => {
            setLoading(false);
            // Optional: Toast to say "Showing demo mode" could be added here
        }, 2000);

        try {
            const { data } = await api.get('/events');
            clearTimeout(timeoutId); // If success, clear timer
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events', error);
            // Don't show error toast on first load to keep UI clean, just fallback
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const categories = ['All', 'Wilderness', 'Retreat', 'Workshop', 'Gala'];
    const filteredEvents = category === 'All'
        ? events
        : events.filter(e => e.title.includes(category) || e.description.includes(category));

    return (
        <>
            <QuoteBanner />
            <div className="container animate-fade-in" style={{ paddingBottom: '5rem' }}>

                {/* Category Chips */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`chip ${category === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* [4] Upcoming Events Section */}
                <div style={{ marginBottom: '5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'Bernhard Modern Bold BT, serif', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--text)' }}>Upcoming Events</h2>
                        <div style={{ height: '1px', width: '60px', background: 'var(--secondary)', margin: '0 auto', opacity: 0.5 }}></div>
                    </div>
                    <div className="grid-responsive">
                        {mockEvents.slice(0, 3).map((event, i) => (
                            <div key={event._id} style={{ position: 'relative' }}>
                                {i === 0 && (
                                    <div style={{ position: 'absolute', top: '-10px', left: '10px', zIndex: 10 }} className="badge-trending">
                                        Featured
                                    </div>
                                )}
                                <EventCard event={{ ...event, isMock: true }} refreshEvents={() => addToast('This is a demo event!', 'info')} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Events Grid */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <h1 style={{ fontSize: '3rem', fontFamily: 'Bernhard Modern Bold BT, serif', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'var(--text)' }}>
                        Community Gatherings
                    </h1>
                    <p style={{ fontFamily: 'Montserrat', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                        Discover & Connect
                    </p>
                </div>

                {loading ? (
                    <div className="grid-responsive">
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                        <EventCardSkeleton />
                    </div>
                ) : (
                    <div className="grid-responsive">
                        {/* Fallback to distinct community mock events if no real events are found */}
                        {(filteredEvents.length > 0 ? filteredEvents : communityEvents).map((event, index) => (
                            <div key={event._id} style={{ animation: `slideUp 0.6s ease-out ${index * 0.1}s forwards`, opacity: 0 }}>
                                <EventCard
                                    event={{ ...event, isMock: filteredEvents.length === 0 }} // Treat as mock if using fallback
                                    refreshEvents={fetchEvents}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
