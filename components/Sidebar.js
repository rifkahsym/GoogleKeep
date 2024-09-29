import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = ({ isVisible, toggleSidebar, navigation }) => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <SafeAreaView style={[styles.sidebar(darkMode), { left: isVisible ? 0 : -250 }]}>
            <View style={styles.header}>
                <Text style={styles.title(darkMode)}>Google Keep</Text>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Home'); }}>
                    <Ionicons name="bulb" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Notes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Reminders'); }}>
                    <Ionicons name="notifications" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Reminders</Text>
                </TouchableOpacity>
                <View style={styles.separator(darkMode)} />
                <Text style={styles.label(darkMode)}>LABELS</Text>
                <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('CreateLabel'); }}>
                    <Ionicons name="add" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Create new label</Text>
                </TouchableOpacity>
                <View style={styles.separator(darkMode)} />
                <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Archive'); }}>
                    <Ionicons name="archive" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Archive</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Trash'); }}>
                    <Ionicons name="trash" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Trash</Text>
                </TouchableOpacity>
                <View style={styles.separator(darkMode)} />
                <TouchableOpacity style={styles.menuItem} onPress={() => { toggleSidebar(); navigation.navigate('Settings'); }}>
                    <Ionicons name="settings" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => alert('Send app feedback clicked')}>
                    <Ionicons name="chatbubbles" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Send app feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => alert('Help clicked')}>
                    <Ionicons name="help-circle" size={20} color={darkMode ? 'white' : 'black'} />
                    <Text style={styles.menuText(darkMode)}>Help</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sidebar: (darkMode) => ({
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 250,
        backgroundColor: darkMode ? '#1E1E1E' : 'white',
        elevation: 5,
        borderRightWidth: 1,
        borderColor: darkMode ? '#444' : '#ccc',
        zIndex: 10,
    }),
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    title: (darkMode) => ({
        fontSize: 24,
        color: darkMode ? 'white' : 'black',
    }),
    menu: {
        flex: 1,
        paddingHorizontal: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    menuText: (darkMode) => ({
        marginLeft: 10,
        fontSize: 16,
        color: darkMode ? 'white' : 'black',
    }),
    separator: (darkMode) => ({
        height: 1,
        backgroundColor: darkMode ? '#555' : '#ccc',
        marginVertical: 10,
    }),
    label: (darkMode) => ({
        fontSize: 14,
        fontWeight: 'bold',
        color: darkMode ? 'white' : 'black',
        marginVertical: 10,
    }),
});

export default Sidebar;