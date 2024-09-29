import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setDarkMode(colorScheme === 'dark');
        });

        return () => subscription.remove();
    }, []);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};