import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const NoteDetailScreen = ({ navigation }) => {
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isColorPopupVisible, setColorPopupVisible] = useState(false);
    const [isActionPopupVisible, setActionPopupVisible] = useState(false);
    const { darkMode } = useContext(ThemeContext);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const toggleColorPopup = () => {
        setColorPopupVisible(!isColorPopupVisible);
    };

    const toggleActionPopup = () => {
        setActionPopupVisible(!isActionPopupVisible);
    };

    const handleColorSelection = (color) => {
        console.log('Selected color:', color);
        toggleColorPopup();
    };

    const handleActionMenu = (action) => {
        console.log('Selected action:', action);
        toggleActionPopup();
    };

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5'];

    return (
        <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
            <View style={[styles.bottomBar, darkMode && styles.darkBottomBar]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Ionicons name="arrow-back" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <View style={styles.actionIcons}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="pin" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="notifications" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="archive" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
            </View>

            <TextInput
                style={[styles.titleInput, { color: darkMode ? 'white' : 'black' }]}
                placeholder="Note"
                placeholderTextColor={darkMode ? 'grey' : 'lightgrey'}
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.noteInput, { color: darkMode ? 'white' : 'black' }]}
                placeholder="Take a note..."
                placeholderTextColor={darkMode ? 'grey' : 'lightgrey'}
                value={note}
                onChangeText={setNote}
                multiline
            />

            <View style={styles.bottomBar}>
                <TouchableOpacity onPress={togglePopup} style={styles.iconContainer}>
                    <Ionicons name="add" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer} onPress={toggleColorPopup}>
                    <Ionicons name="color-palette" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer} onPress={toggleActionPopup}>
                    <Ionicons name="ellipsis-horizontal" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>

            <Modal visible={isPopupVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={[styles.popupContainer, darkMode && styles.darkPopupContainer]}>
                    <FlatList
                        data={[
                            { id: '1', icon: 'camera', label: 'Take photo' },
                            { id: '2', icon: 'image', label: 'Choose image' },
                            { id: '3', icon: 'brush', label: 'Drawing' },
                            { id: '4', icon: 'mic', label: 'Recording' },
                            { id: '5', icon: 'checkmark', label: 'Checkbox' },
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.popupOption} onPress={() => handleActionMenu(item.label)}>
                                <Ionicons name={item.icon} size={24} color={darkMode ? 'white' : 'black'} />
                                <Text style={[styles.popupText, { color: darkMode ? 'white' : 'black' }]}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            </Modal>

            <Modal visible={isColorPopupVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={() => setColorPopupVisible(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={[styles.colorPopupContainer, darkMode && styles.darkPopupContainer]}>
                    <FlatList
                        data={colors}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.colorCircle, { backgroundColor: item }]}
                                onPress={() => handleColorSelection(item)}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </Modal>

            <Modal visible={isActionPopupVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={() => setActionPopupVisible(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={[styles.popupContainer, darkMode && styles.darkPopupContainer]}>
                    <FlatList
                        data={[
                            { id: '1', icon: 'trash', label: 'Delete' },
                            { id: '2', icon: 'document', label: 'Make a copy' },
                            { id: '3', icon: 'share', label: 'Send' },
                            { id: '4', icon: 'person-add', label: 'Collaborations' },
                            { id: '5', icon: 'pricetag', label: 'Labels' },
                            { id: '6', icon: 'chatbubbles', label: 'Send app feedback' },
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.popupOption} onPress={() => handleActionMenu(item.label)}>
                                <Ionicons name={item.icon} size={24} color={darkMode ? 'white' : 'black'} />
                                <Text style={[styles.popupText, { color: darkMode ? 'white' : 'black' }]}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    darkContainer: {
        backgroundColor: '#121212',
        padding: 16,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    darkTopBar: {
        backgroundColor: '#1e1e1e',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 16,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    actionIcons: {
        flexDirection: 'row',
    },
    iconContainer: {
        marginHorizontal: 10,
    },
    titleInput: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 10,
        fontSize: 18,
        padding: 5,
    },
    noteInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'transparent',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
    },
    darkPopupContainer: {
        backgroundColor: '#1e1e1e',
    },
    popupOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    popupText: {
        marginLeft: 10,
        fontSize: 16,
    },
    colorPopupContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
    },
    darkColorPopupContainer: {
        backgroundColor: '#1e1e1e',
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10,
    },
});

export default NoteDetailScreen;