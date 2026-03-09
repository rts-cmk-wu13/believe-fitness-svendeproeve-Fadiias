import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';
import bgImage from '../assets/Rectangle 1655.png';

function SplashPage() {
const navigate = useNavigate();
const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBtnVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="splash-overlay" />
      <div className="splash-content">
        <h1 className="splash-logo">Believe<br />Yourself</h1>
        <p className="splash-subtitle">Train like a pro</p>
      </div>
      <button
        className={`splash-btn ${btnVisible ? 'splash-btn--visible' : ''}`}
        onClick={() => navigate('/home')}
      >
        Start training
      </button>
    </div>
  );
}

export default SplashPage;
