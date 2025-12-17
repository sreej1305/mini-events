import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <h2 className="text-gradient-logo" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>MiniEvents</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Reimagining connection through atomic, concurrency-safe experiences.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'white' }}>Explore</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Home</Link>
                            <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mission</Link>
                            <Link to="/create-event" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Host Event</Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'white' }}>Neural Newsletter</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>Get the latest AI-curated events.</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="email"
                                placeholder="email@future.com"
                                className="form-input"
                                style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                            />
                            <button className="btn" style={{ padding: '0.5rem 1rem' }}>→</button>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '3rem', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    © {new Date().getFullYear()} Mini Events Platform. Built with React & Neon Dreams.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
