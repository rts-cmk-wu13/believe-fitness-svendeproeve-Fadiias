import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, leaveClass, getClasses, getClass } from '../services/api';
import NavMenu from '../components/NavMenu';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [allClasses, setAllClasses] = useState([]);
  const [participants, setParticipants] = useState({});

  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!userId) { navigate('/login'); return; }
    getUser(userId).then(setUser).catch(() => {});
    if (role === 'admin') {
      getClasses().then(setAllClasses).catch(() => {});
    }
  }, [userId]);

  async function handleShowParticipants(classId) {
    if (participants[classId]) {
      setParticipants(prev => { const next = { ...prev }; delete next[classId]; return next; });
    } else {
      const cls = await getClass(classId);
      setParticipants(prev => ({ ...prev, [classId]: cls.users || [] }));
    }
  }

  async function handleLeave(classId) {
    await leaveClass(userId, classId);
    setUser(prev => ({
      ...prev,
      classes: prev.classes.filter(c => c.id !== classId),
    }));
  }

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-menu" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="profile-user">
        <div className="profile-avatar">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="black">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
        <div className="profile-user-info">
          <p className="profile-username">{user.username}</p>
          <p className="profile-role">Member</p>
        </div>
      </div>

      <div className="profile-classes">
        {role === 'admin' ? (
          allClasses.map(cls => (
            <div key={cls.id} className="profile-card">
              <p className="profile-card__name">{cls.className}</p>
              <p className="profile-card__time">{cls.classDay} - {cls.classTime}</p>
              <div className="profile-card__actions">
                <button className="profile-btn" onClick={() => navigate(`/classes/${cls.id}`)}>SHOW CLASS</button>
                <button className="profile-btn" onClick={() => handleShowParticipants(cls.id)}>
                  {participants[cls.id] ? 'HIDE' : 'PARTICIPANTS'}
                </button>
              </div>
              {participants[cls.id] && (
                <ul className="profile-participants">
                  {participants[cls.id].length === 0
                    ? <li>No participants</li>
                    : participants[cls.id].map(u => <li key={u.id}>{u.username}</li>)
                  }
                </ul>
              )}
            </div>
          ))
        ) : (
          user.classes && user.classes.length > 0 ? (
            user.classes.map(cls => (
              <div key={cls.id} className="profile-card">
                <p className="profile-card__name">{cls.className}</p>
                <p className="profile-card__time">{cls.classDay} - {cls.classTime}</p>
                <div className="profile-card__actions">
                  <button className="profile-btn" onClick={() => navigate(`/classes/${cls.id}`)}>SHOW CLASS</button>
                  <button className="profile-btn" onClick={() => handleLeave(cls.id)}>LEAVE</button>
                </div>
              </div>
            ))
          ) : (
            <p className="profile-empty">You are not signed up for any classes.</p>
          )
        )}
      </div>

      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

export default ProfilePage;
