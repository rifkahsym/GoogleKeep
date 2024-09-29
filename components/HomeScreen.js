import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';
import Sidebar from './Sidebar';

const HomeScreen = ({ navigation }) => {
    const [gridView, setGridView] = useState(true);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isListening, setListening] = useState(false);
    const { darkMode } = useContext(ThemeContext);
    const [isPopupVisible, setPopupVisible] = useState(false);


    const notes = [
        { id: '1', text: 'Note 1' },
        { id: '2', text: 'Note 2' },
        { id: '3', text: 'Note 3' },
        { id: '4', text: 'Note 4' },
    ];

    const toggleView = () => {
        setGridView(prevState => !prevState);
        setRefreshKey(prevKey => prevKey + 1);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const openListening = () => {
        setListening(true);
    };

    const closeListening = () => {
        setListening(false);
    };

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };    

    const handleMenuOption = (option) => {
        console.log('Selected option:', option);
        setPopupVisible(false);
    };
    
    const renderNote = ({ item }) => (
        <TouchableOpacity 
            style={[gridView ? styles.noteGrid : styles.noteList, { backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5' }]} 
            onPress={() => navigation.navigate('NoteDetailScreen', { noteId: item.id })}
        >
            <Text style={{ color: darkMode ? 'white' : 'black' }}>{item.text}</Text>
        </TouchableOpacity>
    );    

    return (
        <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
            <Sidebar 
                isVisible={isSidebarVisible} 
                toggleSidebar={toggleSidebar} 
                navigation={navigation}
            />

            <View style={[styles.topBar, darkMode && styles.darkTopBar]}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity onPress={toggleSidebar} style={styles.iconContainer}>
                        <Ionicons name="menu" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconContainer}>
                        <Text style={[styles.searchText, { color: darkMode ? 'white' : 'black' }]}>
                            Search your notes
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={toggleView} style={styles.iconContainer}>
                        <Ionicons name={gridView ? "grid" : "list-outline"} size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openModal} style={styles.iconContainer}>
                        <Ionicons name="person-circle" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                key={refreshKey}
                data={notes}
                renderItem={renderNote}
                keyExtractor={item => item.id}
                numColumns={gridView ? 2 : 1}
                style={styles.notesContainer}
            />

            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigation.navigate('CreateNote')}
            >
                <Ionicons name="add" size={50} color="white" />
            </TouchableOpacity>

            <View style={[styles.bottomBar, darkMode && styles.darkBottomBar]}>
                <TouchableOpacity onPress={() => navigation.navigate('CreateChecklist')} style={styles.iconContainer}>
                    <Ionicons name="checkmark" size={30} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Drawing')} style={styles.iconContainer}>
                    <Ionicons name="brush" size={30} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openListening} style={styles.iconContainer}>
                    <Ionicons name="mic" size={30} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePopup} style={styles.iconContainer}>
                    <Ionicons name="image" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                animationType="fade"
                visible={isListening}
                onRequestClose={closeListening}
            >
                <View style={[styles.listeningOverlay, { backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)' }]}>
                    <View style={[styles.listeningContent, { backgroundColor: darkMode ? '#1e1e1e' : 'white' }]}>
                        <TouchableOpacity onPress={closeListening} style={styles.closeButton}>
                            <Ionicons name="close" size={30} color={darkMode ? 'white' : 'black'} />
                        </TouchableOpacity>
                        <Ionicons name="mic" size={40} color={darkMode ? 'black' : 'white'} style={styles.micIcon} />
                        <Text style={[styles.listeningText, { color: darkMode ? 'white' : 'black' }]}>Listening...</Text>
                        <View style={styles.nodesContainer}>
                            <View style={[styles.node, { backgroundColor: '#FF7043', height: 50, width: 40 }]} />
                            <View style={[styles.node, { backgroundColor: '#42A5F5', height: 50, width: 40 }]} />
                            <View style={[styles.node, { backgroundColor: '#66BB6A', height: 50, width: 40 }]} />
                            <View style={[styles.node, { backgroundColor: '#FFA726', height: 50, width: 40 }]} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                animationType="none"
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={[styles.modalOverlay, darkMode && styles.darkModalOverlay]}>
                    <View style={[styles.modalContent, darkMode && styles.darkModalContent]}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                                <Ionicons name="close" size={24} color={darkMode ? 'white' : 'black'} />
                            </TouchableOpacity>
                        </View>
                        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Google_Logo.svg' }} style={styles.googleLogo} />
                        <TouchableOpacity style={styles.profileIcon}>
                            <Ionicons name="person-circle" size={60} color={darkMode ? 'white' : 'black'} />
                        </TouchableOpacity>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Rifkah Syam</Text>
                        <Text style={{ color: darkMode ? 'grey' : 'black' }}>rifkah@gmail.com</Text>
                        <TouchableOpacity style={styles.manageAccountButton} onPress={() => alert('Manage Account clicked')}>
                            <Text style={{ color: darkMode ? 'white' : 'black' }}>Manage your Google Account</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <View style={styles.policyContainer}>
                            <TouchableOpacity onPress={() => alert('Privacy Policy clicked')}>
                                <Text style={styles.policyText}>Privacy Policy</Text>
                            </TouchableOpacity>
                            <View style={styles.policySeparator} />
                            <TouchableOpacity onPress={() => alert('Terms of Service clicked')}>
                                <Text style={styles.policyText}>Terms of Service</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={isPopupVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={[styles.popupContainer, darkMode && styles.darkPopupContainer]}>
                    <FlatList
                        data={[
                            { id: '1', icon: 'camera', label: 'Take photo' },
                            { id: '2', icon: 'image', label: 'Choose image' },
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.popupOption} onPress={() => handleMenuOption(item.label)}>
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
    },
    darkContainer: {
        backgroundColor: '#121212',
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
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginHorizontal: 10,
    },
    searchText: {
        fontSize: 16,
        color: 'black',
    },
    notesContainer: {
        padding: 10,
    },
    noteGrid: {
        flex: 1,
        margin: 5,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    noteList: {
        marginVertical: 5,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    addButton: {
        position: 'absolute',
        bottom: 80,
        right: 30,
        backgroundColor: '#3B82F6',
        borderRadius: 50,
        padding: 15,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    darkBottomBar: {
        backgroundColor: '#1e1e1e',
    },
    listeningOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listeningContent: {
        width: '80%',
        backgroundColor: '#1e1e1e',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    micIcon: {
        marginBottom: 10,
    },
    listeningText: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white',
    },
    nodesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'wrap',
    },
    node: {
        borderRadius: 10,
        margin: 5,
        height: 50,
        width: 40,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    darkModalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
    },
    darkModalContent: {
        width: '80%',
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 10,
    },
    closeIcon: {
        marginLeft: 0,
    },
    profileIcon: {
        marginVertical: 20,
    },
    manageAccountButton: {
        marginVertical: 15,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#3B82F6',
    },
    darkManageAccountButton: {
        marginVertical: 15,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#3B82F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginVertical: 15,
    },
    darkSeparator: {
        height: 1,
        backgroundColor: '#444',
        width: '100%',
        marginVertical: 15,
    },
    policyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
    },
    policyText: {
        color: '#3B82F6',
    },
    policySeparator: {
        width: 10,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    darkPopupContainer: {
        backgroundColor: '#1E1E1E',
    },
    popupOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    popupText: {
        marginLeft: 10,
    },       
});

export default HomeScreen;