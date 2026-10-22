import { useEffect, useRef, useState } from "react";

// Copies `text` to the clipboard. Useful next to mailto: links, which do
// nothing on computers without a default email app.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers or blocked clipboard access
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  }
}

export default function CopyButton({ text, label = "Copy", className = "" }) {
  const [state, setState] = useState("idle"); // idle | copied | failed
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleClick() {
    const ok = await copyText(text);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${label}: ${text}`}
      className={`font-mono text-xs tracking-widest uppercase border px-2 py-1 transition-colors duration-200 ${
        state === "copied"
          ? "border-blue-500 text-blue-500"
          : "border-zinc-700 text-zinc-400 hover:border-blue-500 hover:text-white"
      } ${className}`}
    >
      <span aria-live="polite">
        {state === "copied" ? "Copied!" : state === "failed" ? "Couldn't copy" : label}
      </span>
    </button>
  );
}
