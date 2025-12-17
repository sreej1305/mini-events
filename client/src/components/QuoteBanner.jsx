import { useState } from 'react';

const quotes = [
    "Nature does not hurry, yet everything is accomplished.",
    "In every walk with nature one receives far more than he seeks.",
    "Wilderness is not a luxury but a necessity of the human spirit.",
    "Adopt the pace of nature: her secret is patience.",
    "The clearest way into the Universe is through a forest wilderness."
];

const QuoteBanner = () => {
    const [visible, setVisible] = useState(true);
    const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

    if (!visible) return null;

    return (
        <div className="container" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
            <div className="glass" style={{
                padding: '2rem',
                borderRadius: 'var(--radius)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid var(--glass-border)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                textAlign: 'center',
                animation: 'slideUp 0.6s ease-out',
                position: 'relative'
            }}>
                <p style={{ fontFamily: 'Bernhard Modern Bold BT, serif', fontStyle: 'italic', fontSize: '1.6rem', color: 'var(--text)', letterSpacing: '0.02em' }}>
                    "{quote}"
                </p>
                <button
                    onClick={() => setVisible(false)}
                    style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '1rem',
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        fontSize: '1.2rem',
                        padding: '0.25rem',
                        lineHeight: 1,
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default QuoteBanner;
