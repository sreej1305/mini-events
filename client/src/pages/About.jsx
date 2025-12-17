import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1,
                    color: '#4a3728', // Bold Brown
                    fontWeight: 'bold'
                }}>
                    Reimagining how we <span style={{ color: '#8b4513' }}>gather.</span>
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.8 }}>
                    MiniEvents isn't just a platform; it's a movement towards more meaningful connections.
                    We believe that every RSVP tells a story, and every filled seat is a promise of shared experience.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <div className="card">
                        <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem', fontSize: '2rem' }}>10k+</h3>
                        <p>Events Created</p>
                    </div>
                    <div className="card">
                        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '2rem' }}>50k+</h3>
                        <p>Stories Shared</p>
                    </div>
                    <div className="card">
                        <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '2rem' }}>100%</h3>
                        <p>Atomic Safety</p>
                    </div>
                </div>

                <Link to="/" className="btn" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                    Start Your Journey
                </Link>
            </div>
        </div>
    );
};

export default About;
