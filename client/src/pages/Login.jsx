import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="card">
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h2>
            {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Email</label>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
