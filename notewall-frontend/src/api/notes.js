const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// `getToken` is the function returned by Clerk's useAuth() hook —
// each call fetches a fresh, valid session token to attach to the request.

export async function fetchNotes(getToken) {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Could not load the board.");
  const data = await res.json();
  return data.notes ?? [];
}

export async function createNote(getToken, { text, color }) {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text, color }),
  });
  if (!res.ok) throw new Error("Could not pin that note.");
  const data = await res.json();
  return data.note;
}

export async function deleteNote(getToken, id) {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Could not remove that note.");
  return res.json();
}
