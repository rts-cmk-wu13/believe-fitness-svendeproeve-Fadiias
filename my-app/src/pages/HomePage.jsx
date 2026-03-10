import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews, getTestimonials, subscribeNewsletter, sendMessage } from '../services/api';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactMsg, setContactMsg] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getNews().then(setNews).catch(() => {});
    getTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  async function handleNewsletter(e) {
    e.preventDefault();
    if (!newsletterEmail) { setNewsletterMsg('Please enter a valid email.'); return; }
    try {
      await subscribeNewsletter(newsletterEmail);
      setNewsletterMsg('You are now subscribed!');
      setNewsletterEmail('');
    } catch { setNewsletterMsg('Something went wrong. Try again.'); }
  }

  async function handleContact(e) {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.message) {
      setContactMsg('Please fill in all fields.');
      return;
    }
    try {
      await sendMessage(contact.name, contact.email, contact.message);
      setContactMsg('Your message has been sent!');
      setContact({ name: '', email: '', message: '' });
    } catch { setContactMsg('Something went wrong. Try again.'); }
  }

  const prevTestimonial = () => {
    setTestimonialIndex(prev => prev > 0 ? prev - 1 : testimonials.length - 1);
  };

  const nextTestimonial = () => {
    setTestimonialIndex(prev => prev < testimonials.length - 1 ? prev + 1 : 0);
  };

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="homepage-new">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__overlay" />
        <div className="home-hero__content">
          <h1 className="home-hero__title">Classes for you</h1>
          <div className="home-hero__buttons">
            <button className="home-btn" onClick={() => navigate('/classes')}>CLASSES</button>
            <button className="home-btn" onClick={() => navigate('/login')}>LOG IN</button>
          </div>
        </div>
        {/* Hamburger menu - top right */}
        <div className="home-menu" onClick={() => setMenuOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      {/* Navigation Overlay */}
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

      {/* News Section Title */}
      <section className="home-section">
        <h2 className="home-section__bigtitle">News</h2>
      </section>

      {/* News Articles */}
      {news.map((item, index) => {
        const localImages = ['/juice.jpg', '/bootcamp.jpg', '/thirtydaychallenge.jpg', '/qrcode.jpg'];
        const imgSrc = item.Asset?.url || localImages[index] || null;
        return (
          <section key={item.id} className="home-news-item">
            <h3 className="home-news-item__title">{item.title}</h3>
            {imgSrc && (
              <img src={imgSrc} alt={item.title} className="home-news-item__img" />
            )}
            <p className="home-news-item__text">{item.text}</p>
          </section>
        );
      })}

      {/* Newsletter Section */}
      <section className="home-section">
        <div className="home-divider" />
        <h3 className="home-section__title">Newsletter</h3>
        <p className="home-section__desc">Sign up to receive the latest news and announcements from Believe Fitness</p>
        <form className="home-newsletter-form" onSubmit={handleNewsletter}>
          <input
            type="email"
            placeholder="Enter your email..."
            className="home-input"
            value={newsletterEmail}
            onChange={e => setNewsletterEmail(e.target.value)}
          />
          <button type="submit" className="home-btn">SIGN UP</button>
        </form>
        {newsletterMsg && <p className="home-feedback">{newsletterMsg}</p>}
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && currentTestimonial && (
        <section className="home-testimonials">
          <h3 className="home-testimonials__title">What our members say</h3>
          <p className="home-testimonials__text">{currentTestimonial.text}</p>
          <p className="home-testimonials__author">{currentTestimonial.name}</p>
          <div className="home-testimonials__nav">
            <button className="home-testimonials__arrow" onClick={prevTestimonial}>
              ‹
            </button>
            <button className="home-testimonials__arrow home-testimonials__arrow--right" onClick={nextTestimonial}>
              ›
            </button>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="home-section">
        <h3 className="home-section__title">Contact us</h3>
        <p className="home-section__desc">Ask us anything about Believe Fitness!</p>
        <form className="home-contact-form" onSubmit={handleContact}>
          <input
            type="text"
            placeholder="Enter your name..."
            className="home-input"
            value={contact.name}
            onChange={e => setContact({ ...contact, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Enter your email..."
            className="home-input"
            value={contact.email}
            onChange={e => setContact({ ...contact, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Enter your message..."
            className="home-textarea"
            value={contact.message}
            onChange={e => setContact({ ...contact, message: e.target.value })}
            required
          />
          <button type="submit" className="home-btn home-btn--full">SEND MESSAGE</button>
        </form>
        {contactMsg && <p className="home-feedback">{contactMsg}</p>}
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer__divider" />
        <h2 className="home-footer__title">Believe<br />Yourself</h2>
        <p className="home-footer__subtitle">Train like a pro</p>
        <p className="home-footer__address">Rabalderstræde 48 ‧ 4000 Roskilde<br />hello@believe-fitness.com</p>
      </footer>
    </div>
  );
}

export default HomePage;
