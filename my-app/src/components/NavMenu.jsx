import { useNavigate } from 'react-router-dom';
import './NavMenu.css';

function NavMenu({ open, onClose }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  function go(path) {
    onClose();
    navigate(path);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    onClose();
    navigate('/home');
  }

  if (!open) return null;

  return (
    <div className="nav-overlay">
      <div className="nav-overlay__close" onClick={onClose}>✕</div>
      <nav className="nav-overlay__links">
        <a onClick={() => go('/home')}>Home</a>
        <a onClick={() => go('/classes')}>Classes</a>
        <a onClick={() => go('/search')}>Search</a>
        {isLoggedIn && <a onClick={() => go('/profile')}>My Profile</a>}
        {isLoggedIn
          ? <a onClick={handleLogout}>Log out</a>
          : <a onClick={() => go('/login')}>Log in</a>
        }
      </nav>
    </div>
  );
}

export default NavMenu;
