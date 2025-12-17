import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleMagicRewrite = async () => {
        if (!formData.description) return;
        setAiLoading(true);

        // Simulate AI API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const enhancedText = `✨ [AI Polished] Join us for an unforgettable experience at ${formData.location || 'our venue'}. ${formData.description} Expect an atmosphere of innovation and connection. Secure your spot before it's gone!`;

        setFormData(prev => ({ ...prev, description: enhancedText }));
        setAiLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (image) data.append('image', image);

        try {
            await api.post('/events', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || 'Error creating event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ maxWidth: '700px', margin: '3rem auto' }}>
            <div className="card glass">
                <h2 className="text-gradient" style={{ marginBottom: '2rem', fontSize: '2rem', textAlign: 'center' }}>Create Experience</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Event Title</label>
                        <input type="text" name="title" className="form-input" placeholder="e.g. Neon Nights Gathering" required value={formData.title} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label className="input-label" style={{ marginBottom: 0 }}>Description</label>
                            <button
                                type="button"
                                onClick={handleMagicRewrite}
                                disabled={aiLoading || !formData.description}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--secondary)',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}
                            >
                                {aiLoading ? 'Polishing...' : '✨ Magic Rewrite'}
                            </button>
                        </div>
                        <textarea
                            name="description"
                            className="form-input"
                            rows="5"
                            placeholder="Describe the vibe..."
                            required
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label className="input-label">Date & Time</label>
                            <input type="datetime-local" name="date" className="form-input" required value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Capacity</label>
                            <input type="number" name="capacity" className="form-input" min="1" placeholder="Max attendees" required value={formData.capacity} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Location</label>
                        <input type="text" name="location" className="form-input" placeholder="Virtual or Physical Address" required value={formData.location} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Cover Image</label>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <input type="file" className="form-input" onChange={handleImageChange} accept="image/*" style={{ paddingLeft: '0.5rem' }} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-sparkle" style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }} disabled={loading}>
                        {loading ? 'Publishing...' : 'Launch Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
