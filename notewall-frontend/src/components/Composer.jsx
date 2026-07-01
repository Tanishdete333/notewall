import { useState } from "react";

const COLORS = [
  { key: "yellow", label: "Yellow" },
  { key: "pink", label: "Pink" },
  { key: "blue", label: "Blue" },
  { key: "green", label: "Green" },
];

export default function Composer({ onAdd, adding }) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("yellow");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) {
      setError("Write something before pinning it.");
      return;
    }
    setError("");
    try {
      await onAdd({ text: text.trim(), color });
      setText("");
      setColor("yellow");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <textarea
        className="composer__input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pin a thought to the wall…"
        rows={3}
        maxLength={240}
      />

      <div className="composer__row">
        <div className="composer__swatches" role="radiogroup" aria-label="Note color">
          {COLORS.map((c) => (
            <button
              key={c.key}
              type="button"
              role="radio"
              aria-checked={color === c.key}
              aria-label={c.label}
              title={c.label}
              className={`swatch swatch--${c.key} ${color === c.key ? "swatch--active" : ""}`}
              onClick={() => setColor(c.key)}
            />
          ))}
        </div>

        <button className="composer__submit" type="submit" disabled={adding}>
          {adding ? "Pinning…" : "Pin it"}
        </button>
      </div>

      {error && <p className="composer__error">{error}</p>}
    </form>
  );
}
