import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const DrawingScreen = ({ navigation }) => {
    const { darkMode } = useContext(ThemeContext);
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleMenuOption = (option) => {
        console.log('Selected option:', option);
        toggleMenu();
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
            <View style={[styles.bottomBar, darkMode && styles.darkBottomBar]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Ionicons name="arrow-back" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <View style={styles.actionIcons}>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="arrow-undo" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer}>
                        <Ionicons name="arrow-redo" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
                        <Ionicons name="ellipsis-horizontal" size={24} color={darkMode ? 'white' : 'black'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.drawingArea}>
                <Text style={styles.drawingText}>Drawing Area</Text>
            </View>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="crop" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="brush" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="create" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="save" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
            </View>

            <Modal visible={isMenuVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={[styles.menuContainer, darkMode && styles.darkMenuContainer]}>
                    <FlatList
                        data={[
                            { id: '1', icon: 'share', label: 'Send' },
                            { id: '2', icon: 'trash', label: 'Delete' },
                            { id: '3', icon: 'grid', label: 'Show Grid' },
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.menuOption}
                                onPress={() => handleMenuOption(item.label)}
                            >
                                <Ionicons name={item.icon} size={24} color={darkMode ? 'white' : 'black'} />
                                <Text style={[styles.menuText, { color: darkMode ? 'white' : 'black' }]}>{item.label}</Text>
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
        paddingVertical: 18,
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
    actionIcons: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    iconContainer: {
        marginHorizontal: 10,
    },
    drawingArea: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawingText: {
        color: 'grey',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    menuContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
    },
    darkMenuContainer: {
        backgroundColor: '#1e1e1e',
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default DrawingScreen;