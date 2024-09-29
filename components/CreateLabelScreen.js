import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

const CreateLabelScreen = ({ navigation }) => {
    const { darkMode } = useContext(ThemeContext);
    const [labelName, setLabelName] = useState('');
    const [labels, setLabels] = useState([]);

    const addLabel = () => {
        if (labelName.trim()) {
            setLabels([...labels, labelName.trim()]);
            setLabelName('');
        }
    };

    const deleteLabel = (index) => {
        const newLabels = labels.filter((_, i) => i !== index);
        setLabels(newLabels);
    };

    return (
        <SafeAreaView style={styles.container(darkMode)}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Ionicons name="close" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <Text style={styles.title(darkMode)}>Edit labels</Text>
            </View>

            <View style={styles.separator(darkMode)} />

            <View style={styles.inputContainer(darkMode)}>
                <TextInput
                    style={styles.input(darkMode)}
                    placeholder="Create new label"
                    placeholderTextColor={darkMode ? 'lightgray' : 'gray'}
                    value={labelName}
                    onChangeText={setLabelName}
                    autoFocus
                />
                <TouchableOpacity onPress={addLabel} style={styles.iconContainer}>
                    <Ionicons name="checkmark" size={24} color="blue" />
                </TouchableOpacity>
            </View>

            <View style={styles.labelsContainer}>
                {labels.map((label, index) => (
                    <View key={index} style={styles.label(darkMode)}>
                        <Text style={styles.labelText(darkMode)}>{label}</Text>
                        <TouchableOpacity onPress={() => deleteLabel(index)}>
                            <Ionicons name="trash" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: (darkMode) => ({
        flex: 1,
        padding: 16,
        backgroundColor: darkMode ? '#121212' : 'white',
    }),
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        padding: 8,
        marginRight: 8,
    },
    title: (darkMode) => ({
        fontSize: 20,
        textAlign: 'center',
        flex: 0.85,
        color: darkMode ? 'white' : 'black',
    }),
    separator: (darkMode) => ({
        height: 1,
        backgroundColor: darkMode ? '#333' : '#ccc',
        marginBottom: 16,
    }),
    inputContainer: (darkMode) => ({
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? '#555' : '#ccc',
        paddingBottom: 8,
        marginBottom: 16,
    }),
    input: (darkMode) => ({
        flex: 1,
        height: 40,
        fontSize: 16,
        marginRight: 8,
        color: darkMode ? 'white' : 'black',
    }),
    labelsContainer: {
        marginTop: 16,
    },
    label: (darkMode) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? '#333' : '#ccc',
    }),
    labelText: (darkMode) => ({
        fontSize: 16,
        color: darkMode ? 'lightgray' : 'black',
    }),
});

export default CreateLabelScreen;