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

export async function getClasses() {
  const res = await fetch(`${BASE_URL}/api/v1/classes`);
  return res.json();
}

export async function getTrainers() {
  const res = await fetch(`${BASE_URL}/api/v1/trainers`);
  return res.json();
}

export async function getClass(id) {
  const res = await fetch(`${BASE_URL}/api/v1/classes/${id}`);
  return res.json();
}

export async function getAsset(id) {
  const res = await fetch(`${BASE_URL}/api/v1/assets/${id}`);
  return res.json();
}

export async function login(username, password) {
  const body = new URLSearchParams({ username, password });
  const res = await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    body,
  });
  return res.json();
}

export async function signup(username, password) {
  const body = new URLSearchParams({ username, password });
  const res = await fetch(`${BASE_URL}/api/v1/users`, {
    method: 'POST',
    body,
  });
  return res.json();
}

export async function getUser(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/api/v1/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function enrollInClass(userId, classId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/api/v1/users/${userId}/classes/${classId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function leaveClass(userId, classId) {
  const token = localStorage.getItem('token');
  await fetch(`${BASE_URL}/api/v1/users/${userId}/classes/${classId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function sendMessage(name, email, message) {
  const res = await fetch(`${BASE_URL}/api/v1/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });
  return res.json();
}
