const COLOR_MAP = {
  yellow: "var(--note-yellow)",
  pink: "var(--note-pink)",
  blue: "var(--note-blue)",
  green: "var(--note-green)",
};

export default function StickyNote({ note, onDelete, deleting, tilt }) {
  const bg = COLOR_MAP[note.color] || COLOR_MAP.yellow;

  return (
    <div
      className="sticky-note"
      style={{ background: bg, "--tilt": `${tilt}deg` }}
    >
      <span className="sticky-note__pin" aria-hidden>📌</span>
      <p className="sticky-note__text">{note.text}</p>
      <button
        className="sticky-note__delete"
        onClick={() => onDelete(note._id)}
        disabled={deleting}
        aria-label="Remove note"
        title="Remove note"
      >
        {deleting ? "…" : "✕"}
      </button>
    </div>
  );
}
