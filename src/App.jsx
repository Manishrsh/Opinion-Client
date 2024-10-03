import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbars from './components/Navbar';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import PerAns from './pages/PerAns.jsx';
import AddpostPage from './pages/AddpostPage.jsx';
import Response from './pages/Response.jsx';
import Signup from './pages/Signuppage.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('beforeinstallprompt event fired');
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return; 
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setDeferredPrompt(null);
    });
  };

  return (
    <Router>
      <Navbars />
      <button
        id="installButton"
        onClick={handleInstallClick}
        style={{ display: deferredPrompt ? 'block' : 'none', margin: '20px' }}
      >
        Install App
      </button>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/response" element={<Response />} />
        <Route path="/response/:que" element={<PerAns />} />
        <Route path="/createpost" element={<AddpostPage />} />
        <Route path="/account" element={<h1>Account</h1>} />
        <Route path="/news" element={<h1>News</h1>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
