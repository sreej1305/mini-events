import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkStyle = {
        color: 'var(--text-muted)',
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'uppercase',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        transition: 'color 0.2s'
    };

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            height: 'var(--header-height)',
            background: scrolled ? 'rgba(8, 10, 9, 0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
            transition: 'all 0.4s ease'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%'
            }}>
                <Link to="/" className="text-gradient-logo">
                    Twilight Events
                </Link>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link to="/" style={navLinkStyle} className="hover-link">Collection</Link>
                    <Link to="/about" style={navLinkStyle} className="hover-link">Philosophy</Link>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <Link to="/create-event" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}>
                                + Host
                            </Link>

                            <div className="avatar-group" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Link to="/my-events" style={{ textAlign: 'right', lineHeight: 1.2 }}>
                                    <span style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'Montserrat', fontWeight: 500 }}>{user.name}</span>
                                </Link>
                                <div style={{
                                    width: '35px', height: '35px', borderRadius: '50%',
                                    border: '1px solid var(--primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1rem', color: 'var(--primary)',
                                    background: 'rgba(0,0,0,0.5)'
                                }}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1.2rem' }}>
                                    &times;
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" style={navLinkStyle} className="hover-link">Sign In</Link>
                            <Link to="/register" className="btn" style={{ padding: '0.6rem 1.8rem' }}>Join</Link>
                        </>
                    )}
                </div>
            </div>
            <style>{`
                .hover-link:hover { color: var(--primary); }
                .text-gradient-logo:hover { opacity: 0.9; }
            `}</style>
        </nav>
    );
};

export default Navbar;
