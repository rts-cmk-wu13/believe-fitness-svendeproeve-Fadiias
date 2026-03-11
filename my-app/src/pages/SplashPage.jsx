import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashPage.css';
import bgImage1 from '../assets/Rectangle 1655.png';

const bgImages = [bgImage1, '/welcome%20-%20center.png'];
const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];

function SplashPage() {
const navigate = useNavigate();
const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBtnVisible(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-page" style={{ backgroundImage: `url(${randomBg})` }}>
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
