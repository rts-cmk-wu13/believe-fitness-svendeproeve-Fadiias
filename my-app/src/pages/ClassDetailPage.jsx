import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClass, getAsset } from '../services/api';
import NavMenu from '../components/NavMenu';
import './ClassDetailPage.css';

function ClassDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cls, setCls] = useState(null);
  const [trainerImg, setTrainerImg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getClass(id).then(data => {
      setCls(data);
      if (data.trainer?.assetId) {
        getAsset(data.trainer.assetId).then(a => setTrainerImg(a.url));
      }
    }).catch(() => {});
  }, [id]);

  if (!cls) return null;

  return (
    <div className="detail-page">

      <div className="detail-hero">
        <img src={cls.asset?.url} alt={cls.className} className="detail-hero__img" />
        <div className="detail-hero__overlay" />

        <button className="detail-back" onClick={() => navigate('/classes')}>←</button>

        <div className="detail-menu" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <h1 className="detail-title">{cls.className}</h1>

        <div className="detail-rating-row">
          <span className="detail-stars">★ ★ ★ ★ ★</span>
          <span className="detail-score">5/5</span>
          <button className="detail-rate-btn">RATE</button>
        </div>
      </div>

      <p className="detail-day">{cls.classDay} - {cls.classTime}</p>
      <p className="detail-desc">{cls.classDescription}</p>

      <h2 className="detail-trainer-title">Trainer</h2>

      <div className="detail-trainer">
        {trainerImg && <img src={trainerImg} alt={cls.trainer?.trainerName} className="detail-trainer__img" />}
        <p className="detail-trainer__name">{cls.trainer?.trainerName}</p>
      </div>

      <button className="detail-signup">SIGN UP</button>

      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

export default ClassDetailPage;
