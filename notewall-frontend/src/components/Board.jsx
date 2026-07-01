import StickyNote from "./StickyNote";

// Deterministic pseudo-random tilt per note so re-renders don't jitter
function tiltFor(id, index) {
  const seed = (id || String(index))
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return ((seed % 9) - 4) * 0.7;
}

export default function Board({ notes, loading, error, onDelete, deletingId }) {
  if (error) {
    return (
      <div className="board-state board-state--error">
        <p>The board didn't come back. {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="corkboard">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="sticky-note sticky-note--skeleton" />
        ))}
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="board-state">
        <p>The wall is empty. Pin your first note above.</p>
      </div>
    );
  }

  return (
    <div className="corkboard">
      {notes.map((note, i) => (
        <StickyNote
          key={note._id || i}
          note={note}
          tilt={tiltFor(note._id, i)}
          onDelete={onDelete}
          deleting={deletingId === note._id}
        />
      ))}
    </div>
  );
}
