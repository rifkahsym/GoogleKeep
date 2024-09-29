import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const ArchiveScreen = ({ navigation, toggleSidebar }) => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <SafeAreaView style={styles.container(darkMode)}>
            <View style={styles.topBar(darkMode)}>
                <TouchableOpacity onPress={toggleSidebar} style={styles.iconContainer}>
                    <Ionicons name="menu" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <Text style={styles.title(darkMode)}>Archive</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconContainer}>
                    <Ionicons name="search" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Ionicons name="archive" size={50} color={darkMode ? 'lightgray' : 'gray'} />
                <Text style={styles.message(darkMode)}>Your archived notes appear here.</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: (darkMode) => ({
        flex: 1,
        backgroundColor: darkMode ? '#121212' : 'white',
    }),
    topBar: (darkMode) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 9,
        backgroundColor: darkMode ? '#1E1E1E' : 'white',
        elevation: 2,
    }),
    title: (darkMode) => ({
        fontSize: 20,
        color: darkMode ? 'white' : 'black',
    }),
    iconContainer: {
        padding: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: (darkMode) => ({
        marginTop: 10,
        fontSize: 16,
        color: darkMode ? 'lightgray' : 'gray',
    }),
});

export default ArchiveScreen;