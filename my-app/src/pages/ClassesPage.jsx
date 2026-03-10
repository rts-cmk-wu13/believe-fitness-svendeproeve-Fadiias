import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClasses } from '../services/api';
import './ClassesPage.css';

function ClassesPage() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getClasses().then(setClasses).catch(() => {});
  }, []);

  const featured = classes.find(c => c.className === 'Lower Abs Workout') || classes[0];
  const rest = classes.filter(c => c.id !== featured?.id).slice(0, 3);

  return (
    <div className="classes-page">

      <h1 className="classes-title">Popular classes</h1>

      <div className="classes-menu" onClick={() => setMenuOpen(true)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {featured && (
        <div className="classes-featured" onClick={() => navigate(`/classes/${featured.id}`)}>
          <img src={featured.asset?.url} alt={featured.className} className="classes-featured__img" />
          <div className="classes-featured__label">
            <p className="classes-featured__name">{featured.className}</p>
            <div className="classes-featured__stars">★ ★ ★ ★ ★</div>
          </div>
        </div>
      )}

      <h2 className="classes-subtitle">Classes for You</h2>

      <div className="classes-grid">
        {rest.map(c => (
          <div key={c.id} className="classes-card" onClick={() => navigate(`/classes/${c.id}`)}>
            <img src={c.asset?.url} alt={c.className} className="classes-card__img" />
            <div className="classes-card__label">
              <p className="classes-card__name">{c.className}</p>
              <div className="classes-card__stars">★ ★ ★ ★ ★</div>
            </div>
          </div>
        ))}
      </div>

      {menuOpen && (
        <div className="nav-overlay">
          <div className="nav-overlay__close" onClick={() => setMenuOpen(false)}>✕</div>
          <nav className="nav-overlay__links">
            <a onClick={() => { setMenuOpen(false); navigate('/home'); }}>Home</a>
            <a onClick={() => { setMenuOpen(false); navigate('/classes'); }}>Classes</a>
            <a onClick={() => { setMenuOpen(false); navigate('/trainers'); }}>Trainers</a>
            <a onClick={() => { setMenuOpen(false); navigate('/contact'); }}>Contact us</a>
            <a onClick={() => { setMenuOpen(false); navigate('/login'); }}>Log in</a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default ClassesPage;
