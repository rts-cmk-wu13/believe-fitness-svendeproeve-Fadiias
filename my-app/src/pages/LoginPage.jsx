import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './AuthPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) { setError('Please fill in all fields.'); return; }
    try {
      const data = await login(username, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);
        navigate('/home');
      } else {
        setError('Wrong username or password.');
      }
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

      <p className="auth-heading">Log in with your credentials</p>

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
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-btn">LOG IN</button>
        <p className="auth-signup-text">
          Are You not yet a Believer?<br />
          <span className="auth-link" onClick={() => navigate('/signup')}>Sign up here</span> to start training like a pro.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
