import { useLayoutEffect, useState } from "react";

import s from "./Theme.module.css";

const THEME_KEY = "theme";
const Theme = () => {
  const [theme, setTheme] = useState("light dark");

  useLayoutEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      setTheme(saved);
      const meta = document.querySelector("meta[name=color-scheme]");
      meta?.setAttribute("content", saved);
    }
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    setTheme(selected);
    localStorage.setItem(THEME_KEY, selected);

    const meta = document.querySelector("meta[name=color-scheme]");
    meta?.setAttribute("content", selected);
  };

  return (
    <div className={s.theme}>
      <span>Theme:</span>
      <select defaultValue="light dark" onChange={handleChange} value={theme}>
        <option value="light dark">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default Theme;
