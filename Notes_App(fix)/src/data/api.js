// api.js
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

export async function getNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  const result = await response.json();
  return result.data;
}

export async function addNote(title, body) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body })
  });
  const result = await response.json();
  return result.data;
}

export async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}
