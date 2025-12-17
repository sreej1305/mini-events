import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import AIChat from './components/AIChat';
import { ToastProvider } from './context/ToastContext';

function App() {
    return (
        <ToastProvider>
            <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <ScrollProgress />
                <Navbar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/create-event" element={<CreateEvent />} />
                            <Route path="/my-events" element={<MyEvents />} />
                        </Route>
                    </Routes>
                </div>
                <AIChat />
                <Footer />
            </div>
        </ToastProvider>
    );
}

export default App;
