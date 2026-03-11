import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClasses, getTrainers } from '../services/api';
import NavMenu from '../components/NavMenu';
import './SearchPage.css';

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getClasses().then(setClasses).catch(() => {});
    getTrainers().then(setTrainers).catch(() => {});
  }, []);

  const q = query.toLowerCase();

  const filteredClasses = classes.filter(c =>
    c.className.toLowerCase().includes(q) ||
    c.classDescription?.toLowerCase().includes(q) ||
    c.classDay?.toLowerCase().includes(q) ||
    c.trainer?.trainerName?.toLowerCase().includes(q)
  );

  const filteredTrainers = trainers.filter(t =>
    t.trainerName.toLowerCase().includes(q)
  );

  const noResults = query && filteredClasses.length === 0 && filteredTrainers.length === 0;
  const showClasses = !noResults && (query ? filteredClasses : classes);
  const showTrainers = !noResults && (query ? filteredTrainers : trainers);

  return (
    <div className="search-page">

      <div className="search-header">
        <button className="search-back" onClick={() => navigate('/home')}>←</button>
        <h1 className="search-title">Search</h1>
        <div className="search-menu" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="search-content">
        {noResults && (
          <p className="search-no-results">Your search did not give any results. Try to search for something else.</p>
        )}

        {showClasses && showClasses.length > 0 && (
          <>
            <h2 className="search-section-title">Popular classes</h2>
            <div className="search-classes">
              {showClasses.map(c => (
                <div key={c.id} className="search-card" onClick={() => navigate(`/classes/${c.id}`)}>
                  <img src={c.asset?.url} alt={c.className} className="search-card__img" />
                  <div className="search-card__label">
                    <p className="search-card__name">{c.className}</p>
                    <div className="search-card__stars">★ ★ ★ ★ ★</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {showTrainers && showTrainers.length > 0 && (
          <>
            <h2 className="search-trainers-title">Popular Trainers</h2>
            <div className="search-trainers">
              {showTrainers.map(t => (
                <div key={t.id} className="search-trainer">
                  <img src={t.asset?.url} alt={t.trainerName} className="search-trainer__img" />
                  <p className="search-trainer__name">{t.trainerName}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

export default SearchPage;
