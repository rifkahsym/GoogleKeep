import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
            <View style={[styles.topBar, darkMode && styles.darkTopBar]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Ionicons name="close" size={24} color={darkMode ? 'white' : 'black'} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: darkMode ? 'white' : 'black' }]}>Settings</Text>
                </View>
            </View>

            <ScrollView>
                {/* Theme Section */}
                <View style={[styles.section, darkMode && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, { color: darkMode ? '#BB86FC' : 'blue' }]}>Theme</Text>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Dark Mode</Text>
                        <Switch
                            value={darkMode}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#767577', true: '#3b82f6'}} 
                            thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <View style={[styles.section, darkMode && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, { color: darkMode ? '#BB86FC' : 'blue' }]}>Display Options</Text>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Add new items to the bottom</Text>
                        <Switch
                            value={true}
                            trackColor={{ false: '#767577', true: '#3b82f6'}} 
                            thumbColor={'#ffffff'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Move checked items to the bottom</Text>
                        <Switch
                            value={true}
                            trackColor={{ false: '#767577', true: '#3b82f6'}} 
                            thumbColor={'#ffffff'}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Display rich link previews</Text>
                        <Switch
                            value={true}
                            trackColor={{ false: '#767577', true: '#3b82f6'}} 
                            thumbColor={'#ffffff'}
                        />
                    </View>
                </View>

                <View style={[styles.section, darkMode && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, { color: darkMode ? '#BB86FC' : 'blue' }]}>Reminder Settings</Text>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Morning</Text>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>08:00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Afternoon</Text>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>13:00</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Evening</Text>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>18:00</Text>
                    </View>
                </View>

                <View style={[styles.section, darkMode && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, { color: darkMode ? '#BB86FC' : 'blue' }]}>Sharing</Text>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Enable sharing</Text>
                        <Switch
                            value={true}
                            trackColor={{ false: '#767577', true: '#3b82f6'}} 
                            thumbColor={'#ffffff'}
                        />
                    </View>
                </View>

                <View style={[styles.section, darkMode && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, { color: darkMode ? '#BB86FC' : 'blue' }]}>Google</Text>
                    <Text style={{ color: darkMode ? 'white' : 'black' }}>Google app settings</Text>
                </View>

                <View style={[styles.section, darkMode && styles.darkSection]}>
                    <Text style={[styles.sectionTitle, { color: darkMode ? '#BB86FC' : 'blue' }]}>About</Text>
                    <View style={styles.row}>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>Application version</Text>
                        <Text style={{ color: darkMode ? 'white' : 'black' }}>2.2024.38200</Text>
                    </View>
                    <Text style={{ color: darkMode ? 'white' : 'black' }}>Licenses</Text>
                </View>
            </ScrollView>
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
        justifyContent: 'flex-start',
        padding: 12,
        backgroundColor: 'white',
        elevation: 2,
    },
    darkTopBar: {
        backgroundColor: '#1E1E1E',
    },
    titleContainer: {
        alignItems: 'center', 
        marginLeft: 100, 
    },
    title: {
        fontSize: 20,
    },
    section: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    darkSection: {
        backgroundColor: '#1E1E1E',
        borderBottomColor: '#424242',
    },
    sectionTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    iconContainer: {
        padding: 10,
    },
});

export default SettingsScreen;