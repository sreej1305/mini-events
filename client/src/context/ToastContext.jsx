import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className="glass"
                        style={{
                            padding: '1rem 1.5rem',
                            borderRadius: 'var(--radius)',
                            borderLeft: `4px solid ${toast.type === 'error' ? 'var(--error)' : toast.type === 'success' ? 'var(--success)' : 'var(--primary)'}`,
                            color: 'white',
                            fontSize: '0.9rem',
                            animation: 'slideUp 0.3s ease-out',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            minWidth: '250px'
                        }}
                    >
                        <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '⚠️' : 'ℹ️'}</span>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
