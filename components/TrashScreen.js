import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const TrashScreen = ({ navigation, toggleSidebar }) => {
    const { darkMode } = useContext(ThemeContext);

    const emptyTrash = () => {
        alert('Trash emptied');
    };

    return (
        <SafeAreaView style={styles.container(darkMode)}>
            <View style={styles.topBar(darkMode)}>
                <TouchableOpacity onPress={toggleSidebar} style={styles.iconContainer}>
                    <Ionicons name="menu" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <Text style={styles.title(darkMode)}>Trash</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconContainer}>
                    <Ionicons name="search" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>

            <View style={styles.separator(darkMode)} />

            <View style={styles.infoContainer}>
                <Text style={styles.infoText(darkMode)}>
                    Any notes in Trash will be deleted forever after 7 days.
                </Text>
                <TouchableOpacity onPress={emptyTrash} style={styles.emptyTrashButton(darkMode)}>
                    <Text style={styles.emptyTrashText(darkMode)}>Empty Trash</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Ionicons name="trash" size={50} color={darkMode ? 'lightgray' : 'gray'} />
                <Text style={styles.message(darkMode)}>No notes in Trash</Text>
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
    separator: (darkMode) => ({
        height: 1,
        backgroundColor: darkMode ? '#333' : '#ccc',
    }),
    infoContainer: {
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
    },
    infoText: (darkMode) => ({
        fontSize: 14,
        color: darkMode ? 'lightgray' : 'gray',
        textAlign: 'center',
        marginBottom: 5,
    }),
    emptyTrashButton: (darkMode) => ({
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: darkMode ? '#424242' : '#e0e0e0',
        borderRadius: 5,
    }),
    emptyTrashText: (darkMode) => ({
        color: darkMode ? 'white' : 'black',
        fontSize: 16,
    }),
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

export default TrashScreen;