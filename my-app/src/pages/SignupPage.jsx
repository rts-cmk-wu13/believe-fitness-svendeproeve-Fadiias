import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import './AuthPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password || !repeat) { setError('Please fill in all fields.'); return; }
    if (password !== repeat) { setError('Passwords do not match.'); return; }
    try {
      await signup(username, password);
      navigate('/login');
    } catch {
      setError('Something went wrong. Try again.');
    }
  }

  return (
    <div className="auth-page">
      <h1 className="auth-title">Believe<br />Fitness</h1>
      <div className="auth-line-row">
        <div className="auth-line" />
        <p className="auth-subtitle">Train like a pro</p>
      </div>

      <p className="auth-heading">Sign up as a new user</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username..."
          className="auth-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          className="auth-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat your password..."
          className="auth-input"
          value={repeat}
          onChange={e => setRepeat(e.target.value)}
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-btn">SIGN UP</button>
      </form>
    </div>
  );
}

export default SignupPage;
