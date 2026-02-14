import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";
import Page from "./Page";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("appTheme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("appTheme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <button onClick={changeTheme}>Toggle Theme</button>
      <Page />
    </ThemeContext.Provider>
  );
}

export default App;
