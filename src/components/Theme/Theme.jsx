import s from "./Theme.module.css";

const Theme = () => {
  const handleChange = (event) => {
    const meta = document.querySelector("meta[name=color-scheme]");
    meta.setAttribute("content", event.target.value);
  };
  return (
    <div className={s.theme}>
      <span>Theme:</span>
      <select name="" id="" defaultValue="light dark" onChange={handleChange}>
        <option value="light dark">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default Theme;
