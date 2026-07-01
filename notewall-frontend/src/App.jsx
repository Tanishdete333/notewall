import { useEffect, useState, useCallback } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import Composer from "./components/Composer";
import Board from "./components/Board";
import { fetchNotes, createNote, deleteNote } from "./api/notes";
import "./app.css";

function SignedOutView() {
  return (
    <div className="gate">
      <div className="gate__card">
        <span className="gate__pin" aria-hidden>📍</span>
        <h1 className="gate__title">Notewall</h1>
        <p className="gate__tag">pin a thought, leave it on the board</p>
        <p className="gate__copy">Sign in to see your own board — every note here is private to you.</p>
        <SignInButton mode="modal">
          <button className="gate__button">Sign in to continue</button>
        </SignInButton>
      </div>
    </div>
  );
}

function Wall() {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNotes(getToken);
      setNotes(data);
    } catch (err) {
      setError(err.message || "Unknown error.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd({ text, color }) {
    setAdding(true);
    try {
      const note = await createNote(getToken, { text, color });
      if (note) {
        setNotes((prev) => [note, ...prev]);
      } else {
        await load();
      }
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await deleteNote(getToken, id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message || "Could not remove that note.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="page">
      <header className="masthead">
        <span className="masthead__pin" aria-hidden>📍</span>
        <div className="masthead__text">
          <h1>Notewall</h1>
          <p className="masthead__tag">
            {user?.firstName ? `${user.firstName}'s board` : "pin a thought, leave it on the board"}
          </p>
        </div>
        <div className="masthead__user">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <Composer onAdd={handleAdd} adding={adding} />

      <Board
        notes={notes}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        deletingId={deletingId}
      />

      <footer className="footer">
        <span>{notes.length} note{notes.length === 1 ? "" : "s"} on the wall</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <>
      <SignedOut>
        <SignedOutView />
      </SignedOut>
      <SignedIn>
        <Wall />
      </SignedIn>
    </>
  );
}
