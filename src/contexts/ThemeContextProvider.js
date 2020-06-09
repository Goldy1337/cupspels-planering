import React, { useState, createContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {

  const [colorTheme, setColorTheme] = useState(getStoredColorTheme);

  useEffect(() => {
    localStorage.setItem('colorTheme', JSON.stringify(colorTheme))
  }, [colorTheme])

  function getStoredColorTheme() {
    const storedColorTheme = JSON.parse(localStorage.getItem('colorTheme'))
    if (storedColorTheme === 'dark') {
      document.querySelector('body').classList.toggle('darkMode', true);
    }
    if (storedColorTheme === 'info') {
      document.querySelector('body').classList.toggle('darkMode', false);
    }
    return storedColorTheme || 'info'
  }

  return (
    <ThemeContext.Provider value={[colorTheme, setColorTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
}