import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const notes = [
    { id: '1', text: 'Note 1' },
    { id: '2', text: 'Note 2' },
    { id: '3', text: 'Note 3' },
    { id: '4', text: 'Note 4' },
];

const SearchScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { darkMode } = useContext(ThemeContext);

    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container(darkMode)}>
            <View style={styles.searchBar(darkMode)}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput(darkMode)}
                    placeholder="Search Google Keep"
                    placeholderTextColor={darkMode ? 'lightgray' : 'grey'}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                )}
            </View>

            {searchQuery.length === 0 ? (
                <View style={styles.noResult}>
                    <Text style={styles.noResultText(darkMode)}>Search for your notes...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredNotes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.noteItem(darkMode)}>
                            <Text style={styles.noteText(darkMode)}>{item.text}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="search" size={50} color="grey" />
                            <Text style={styles.noResultText(darkMode)}>No matching notes</Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: (darkMode) => ({
        flex: 1,
        padding: 10,
        backgroundColor: darkMode ? '#121212' : 'white',
    }),
    searchBar: (darkMode) => ({
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? '#444' : '#ccc',
        padding: 11,
    }),
    searchInput: (darkMode) => ({
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: darkMode ? 'white' : 'black',
    }),
    noResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '80%',
    },
    noResultText: (darkMode) => ({
        marginTop: 10,
        fontSize: 18,
        color: darkMode ? 'lightgray' : 'grey',
    }),
    noteItem: (darkMode) => ({
        backgroundColor: darkMode ? '#1E1E1E' : '#f5f5f5',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        width: '100%',
    }),
    noteText: (darkMode) => ({
        fontSize: 16,
        color: darkMode ? 'white' : 'black',
    }),
});

export default SearchScreen;