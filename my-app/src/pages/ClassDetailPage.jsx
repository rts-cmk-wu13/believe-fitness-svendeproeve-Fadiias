import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClass, getAsset, getUser, enrollInClass, leaveClass } from '../services/api';
import NavMenu from '../components/NavMenu';
import './ClassDetailPage.css';

function ClassDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cls, setCls] = useState(null);
  const [trainerImg, setTrainerImg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userClasses, setUserClasses] = useState([]);
  const [signupError, setSignupError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getClass(id).then(data => {
      setCls(data);
      if (data.trainer?.assetId) {
        getAsset(data.trainer.assetId).then(a => setTrainerImg(a.url));
      }
    }).catch(() => {});

    if (userId) {
      getUser(userId).then(user => {
        const already = user.classes?.some(c => String(c.id) === String(id));
        setEnrolled(already);
        setUserClasses(user.classes || []);
      }).catch(() => {});
    }
  }, [id]);

  async function handleSignup() {
    if (loading) return;
    setSignupError('');
    setLoading(true);
    if (enrolled) {
      await leaveClass(userId, id);
      setEnrolled(false);
    } else {
      const sameDayClass = userClasses.find(c => c.classDay === cls.classDay && String(c.id) !== String(id));
      if (sameDayClass) {
        setSignupError(`You already have a class on ${cls.classDay}.`);
        setLoading(false);
        return;
      }
      if (cls.users && cls.users.length >= cls.maxParticipants) {
        setSignupError('This class is full.');
        setLoading(false);
        return;
      }
      await enrollInClass(userId, id);
      setEnrolled(true);
    }
    setLoading(false);
  }

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

      {userId && (
        <button className="detail-signup" onClick={handleSignup} disabled={loading}>
          {enrolled ? 'LEAVE' : 'SIGN UP'}
        </button>
      )}
      {signupError && <p className="detail-error">{signupError}</p>}

      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

export default ClassDetailPage;
