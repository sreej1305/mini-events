import { useState } from 'react';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm your Event Assistant. Looking for something specific?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "That sounds exciting! Check out our 'Tech' category.",
                "I found a few events that match your vibe.",
                "Great choice. Would you like me to reserve a spot?",
                "The 'Neon Nights' event seems perfect for that."
            ];
            const botMsg = {
                id: Date.now() + 1,
                text: responses[Math.floor(Math.random() * responses.length)],
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
            {isOpen && (
                <div className="glass" style={{
                    width: '300px',
                    height: '400px',
                    marginBottom: '1rem',
                    borderRadius: 'var(--radius)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.2)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>✨ Event AI</span>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', color: 'white', fontSize: '1.2rem' }}>&times;</button>
                    </div>

                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '1rem',
                                maxWidth: '85%',
                                fontSize: '0.9rem'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI is typing...</div>}
                    </div>

                    <form onSubmit={handleSend} style={{ padding: '0.75rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            style={{
                                flex: 1,
                                background: 'rgba(0,0,0,0.3)',
                                border: 'none',
                                borderRadius: '2rem',
                                padding: '0.5rem 1rem',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button type="submit" style={{ background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-sparkle"
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    fontSize: '1.5rem',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                    padding: 0
                }}
            >
                {isOpen ? '❌' : '🤖'}
            </button>
        </div>
    );
};

export default AIChat;
