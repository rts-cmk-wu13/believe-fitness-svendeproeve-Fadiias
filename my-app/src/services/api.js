const BASE_URL = 'http://localhost:4000';

export async function getNews() {
  const res = await fetch(`${BASE_URL}/api/v1/news`);
  return res.json();
}

export async function getTestimonials() {
  const res = await fetch(`${BASE_URL}/api/v1/testimonials`);
  return res.json();
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${BASE_URL}/api/v1/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function sendMessage(name, email, message) {
  const res = await fetch(`${BASE_URL}/api/v1/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });
  return res.json();
}
