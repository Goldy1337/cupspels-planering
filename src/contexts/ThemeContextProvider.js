import React, { useState, createContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {

  const [colorTheme, setColorTheme] = useState(getStoredColorTheme);

  useEffect(() => {
    localStorage.setItem('colorTheme', JSON.stringify(colorTheme))
  }, [colorTheme])

  function getStoredColorTheme() {
    const storedColorTheme = JSON.parse(localStorage.getItem('colorTheme'))
    return storedColorTheme || false
  }

  return (
    <ThemeContext.Provider value={[colorTheme, setColorTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
}