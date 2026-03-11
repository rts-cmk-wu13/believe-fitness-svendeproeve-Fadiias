import { useNavigate } from 'react-router-dom';
import './NavMenu.css';

function NavMenu({ open, onClose }) {
  const navigate = useNavigate();

  function go(path) {
    onClose();
    navigate(path);
  }

  if (!open) return null;

  return (
    <div className="nav-overlay">
      <div className="nav-overlay__close" onClick={onClose}>✕</div>
      <nav className="nav-overlay__links">
        <a onClick={() => go('/home')}>Home</a>
        <a onClick={() => go('/classes')}>Classes</a>
        <a onClick={() => go('/search')}>Search</a>
        <a onClick={() => go('/profile')}>My Schedule</a>
        <a onClick={() => go('/login')}>Log in</a>
      </nav>
    </div>
  );
}

export default NavMenu;
